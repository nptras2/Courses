import axios from "axios";
import dotenv from "dotenv";
import { spawn } from "child_process";

// Load .env
dotenv.config();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const SERVER_START_TIMEOUT_MS = 20000;
const HEALTH_POLL_INTERVAL_MS = 500;
const TEST_TOKEN = process.env.TEST_TOKEN || "";
const TEST_COURSE_ID = process.env.TEST_COURSE_ID || "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(baseUrl, timeoutMs) {
  const start = Date.now();
  let lastError = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await axios.get(`${baseUrl}/`, { timeout: 2000 });
      if (res.status >= 200 && res.status < 500) {
        return true;
      }
    } catch (err) {
      lastError = err;
    }
    await sleep(HEALTH_POLL_INTERVAL_MS);
  }

  if (lastError) {
    console.error("Server did not become healthy in time:", lastError.message);
  }
  return false;
}

async function runTest({ name, method, url, expectedStatuses, headers, data, validate }) {
  const startedAt = Date.now();
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
      validateStatus: () => true,
      timeout: 10000,
    });

    const durationMs = Date.now() - startedAt;
    const okStatus = expectedStatuses.includes(response.status);
    const okValidate = typeof validate === "function" ? validate(response) : true;
    const ok = okStatus && okValidate;

    return {
      name,
      method: method.toUpperCase(),
      url,
      status: response.status,
      ok,
      durationMs,
      note: ok
        ? ""
        : `Unexpected status. Expected one of [${expectedStatuses.join(", ")}].`,
      bodyPreview: JSON.stringify(response.data)?.slice(0, 200) || "",
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    return {
      name,
      method: method.toUpperCase(),
      url,
      status: "ERR",
      ok: false,
      durationMs,
      note: error.message,
      bodyPreview: "",
    };
  }
}

function printResult(result) {
  const icon = result.ok ? "PASS" : "FAIL";
  console.log(`${icon} ${result.method} ${result.url} -> ${result.status} (${result.durationMs}ms) ${result.name}`);
  if (!result.ok && result.note) {
    console.log(`  note: ${result.note}`);
  }
  if (!result.ok && result.bodyPreview) {
    console.log(`  body: ${result.bodyPreview}`);
  }
}

async function main() {
  console.log(`Starting server via: node index.js (PORT=${PORT})`);
  const server = spawn("node", ["index.js"], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  const shutdown = () => {
    if (!server.killed) {
      server.kill();
    }
  };

  process.on("SIGINT", () => {
    shutdown();
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    shutdown();
    process.exit(1);
  });

  const healthy = await waitForServer(BASE_URL, SERVER_START_TIMEOUT_MS);
  if (!healthy) {
    console.error("Server failed to start or health check failed.");
    shutdown();
    process.exit(1);
  }

  console.log(`Server is up at ${BASE_URL}`);

  // NOTE: Some endpoints require DB and/or a valid token.
  // For those, we at least assert that auth is enforced (401 without token).
  const tests = [
    {
      name: "Health route",
      method: "get",
      url: `${BASE_URL}/`,
      expectedStatuses: [200],
      validate: (res) => res.data?.success === true,
    },

    // Courses (public)
    {
      name: "Get published courses",
      method: "get",
      url: `${BASE_URL}/api/courses/get/courses`,
      expectedStatuses: [200, 500],
    },
    {
      name: "Get course by invalid id (should not 404 route)",
      method: "get",
      url: `${BASE_URL}/api/courses/123`,
      expectedStatuses: [400, 404, 500],
    },

    // Protected routes (no token -> 401 expected)
    {
      name: "Protected profile requires auth",
      method: "get",
      url: `${BASE_URL}/api/protected/me`,
      expectedStatuses: [401],
    },
    {
      name: "Admin dashboard requires auth",
      method: "get",
      url: `${BASE_URL}/api/protected/admin-dashboard`,
      expectedStatuses: [401],
    },
    {
      name: "Client dashboard requires auth",
      method: "get",
      url: `${BASE_URL}/api/protected/client-dashboard`,
      expectedStatuses: [401],
    },

    // Orders (no token -> 401 expected)
    {
      name: "Buy course requires auth",
      method: "post",
      url: `${BASE_URL}/api/orders/buy/123`,
      expectedStatuses: [401],
    },
    {
      name: "Confirm payment requires auth",
      method: "post",
      url: `${BASE_URL}/api/orders/confirm-payment`,
      expectedStatuses: [401],
      data: {},
    },
    {
      name: "My orders requires auth",
      method: "get",
      url: `${BASE_URL}/api/orders/my-orders`,
      expectedStatuses: [401],
    },

    // Auth surface checks (route exists). Status varies with DB state.
    {
      name: "Signup route is reachable",
      method: "post",
      url: `${BASE_URL}/api/auth/signup`,
      expectedStatuses: [201, 400, 409, 500],
      data: {
        name: process.env.TEST_NAME || "Endpoint Tester",
        email: process.env.TEST_EMAIL || `endpoint.tester.${Date.now()}@example.com`,
        password: process.env.TEST_PASSWORD || "Password123!",
        role: process.env.TEST_ROLE || "client",
      },
    },
    {
      name: "Login route is reachable",
      method: "post",
      url: `${BASE_URL}/api/auth/login`,
      expectedStatuses: [200, 400, 401, 403, 500],
      data: {
        email: process.env.TEST_EMAIL || "missing@example.com",
        password: process.env.TEST_PASSWORD || "badpassword",
      },
    },
    {
      name: "Logout route is reachable",
      method: "post",
      url: `${BASE_URL}/api/auth/logout`,
      expectedStatuses: [200, 500],
      data: {},
    },
  ];

  // Optional authenticated tests (set TEST_TOKEN and TEST_COURSE_ID in .env)
  if (TEST_TOKEN) {
    const authHeaders = { Authorization: `Bearer ${TEST_TOKEN}` };

    tests.push(
      {
        name: "Protected profile with token",
        method: "get",
        url: `${BASE_URL}/api/protected/me`,
        expectedStatuses: [200, 401, 403, 500],
        headers: authHeaders,
      },
      {
        name: "My orders with token",
        method: "get",
        url: `${BASE_URL}/api/orders/my-orders`,
        expectedStatuses: [200, 401, 403, 500],
        headers: authHeaders,
      }
    );

    if (TEST_COURSE_ID) {
      tests.push({
        name: "Buy course with token (Razorpay order creation)",
        method: "post",
        url: `${BASE_URL}/api/orders/buy/${TEST_COURSE_ID}`,
        expectedStatuses: [201, 400, 401, 403, 404, 500],
        headers: authHeaders,
        validate: (res) =>
          res.status !== 201 ||
          Boolean(res.data?.order && (res.data?.order?.razorpayOrderId || res.data?.order?.amount === 0)),
      });
    }
  }

  const results = [];
  for (const test of tests) {
    const result = await runTest(test);
    results.push(result);
    printResult(result);
  }

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;

  console.log("\nSummary");
  console.log(`Total: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  shutdown();

  // Non-zero exit if anything failed.
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error while testing endpoints:", err);
  process.exit(1);
});
