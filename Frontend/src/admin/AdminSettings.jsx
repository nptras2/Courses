import React, { useEffect, useState } from "react";
import api from "@/services/api";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: { city: "", state: "", country: "India" },
    profilePicture: ""
  });
  const [userMeta, setUserMeta] = useState({ authProvider: "", hasPassword: true });
  const [profileStatus, setProfileStatus] = useState(null);
  const [changePasswordStatus, setChangePasswordStatus] = useState(null);
  const [googlePasswordStatus, setGooglePasswordStatus] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [settingPassword, setSettingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [googlePasswordForm, setGooglePasswordForm] = useState({
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/protected/me");
        if (isMounted) {
          const user = response?.data?.user || {};
          setProfile({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            bio: user.bio || "",
            location: {
              city: user.location?.city || "",
              state: user.location?.state || "",
              country: user.location?.country || "India"
            },
            profilePicture: user.profilePicture || ""
          });
          setUserMeta({
            authProvider: user.authProvider || "local",
            hasPassword: Boolean(user.hasPassword)
          });
        }
      } catch (error) {
        if (isMounted) {
          setProfileStatus({
            type: "error",
            text:
              error?.response?.data?.message ||
              "Unable to load profile information."
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value }
      }));
      return;
    }

    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileStatus(null);

    try {
      const response = await api.put("/api/users/me", profile);
      setProfileStatus({
        type: "success",
        text: response?.data?.message || "Profile updated successfully."
      });
    } catch (error) {
      setProfileStatus({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Unable to update profile. Please try again."
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    setChangingPassword(true);
    setChangePasswordStatus(null);

    try {
      const response = await api.post("/api/auth/change-password", passwordForm);
      setChangePasswordStatus({
        type: "success",
        text: response?.data?.message || "Password updated successfully."
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setChangePasswordStatus({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Unable to update password. Please try again."
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSetPasswordChange = (event) => {
    const { name, value } = event.target;
    setGooglePasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetPasswordSubmit = async (event) => {
    event.preventDefault();
    setSettingPassword(true);
    setGooglePasswordStatus(null);

    try {
      const response = await api.post("/api/auth/set-password", googlePasswordForm);
      setGooglePasswordStatus({
        type: "success",
        text: response?.data?.message || "Password set successfully."
      });
      setUserMeta((prev) => ({ ...prev, hasPassword: true }));
      setGooglePasswordForm({ password: "", confirmPassword: "" });
    } catch (error) {
      setGooglePasswordStatus({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Unable to set password. Please try again."
      });
    } finally {
      setSettingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;
    setDeleting(true);
    setDeleteStatus(null);

    try {
      const response = await api.delete("/api/users/me");
      setDeleteStatus({
        type: "success",
        text: response?.data?.message || "Account deleted."
      });
    } catch (error) {
      setDeleteStatus({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Unable to delete account. Please try again."
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Settings</h2>
      <p className="text-sm text-gray-500 mb-6">
        Configure platform preferences and integrations.
      </p>
      <div className="space-y-6">
        <div className="bg-white p-4 md:p-5 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Account Profile</h3>

          {isLoading && (
            <p className="text-sm text-gray-600">Loading profile...</p>
          )}

          {!isLoading && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Profile Picture URL
                  </label>
                  <input
                    name="profilePicture"
                    value={profile.profilePicture}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    name="location.city"
                    value={profile.location.city}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    name="location.state"
                    value={profile.location.state}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    name="location.country"
                    value={profile.location.country}
                    onChange={handleProfileChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              {profileStatus && (
                <p
                  className={`text-sm ${
                    profileStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {profileStatus.text}
                </p>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
                disabled={savingProfile}
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}
        </div>

        {!userMeta.hasPassword && userMeta.authProvider === "google" && (
          <div className="bg-white p-4 md:p-5 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Set Password</h3>
            <p className="text-sm text-gray-500 mb-4">
              You signed up with Google. Set a password to enable email login.
            </p>
            <form onSubmit={handleSetPasswordSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={googlePasswordForm.password}
                    onChange={handleSetPasswordChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={googlePasswordForm.confirmPassword}
                    onChange={handleSetPasswordChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              {googlePasswordStatus && (
                <p
                  className={`text-sm ${
                    googlePasswordStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {googlePasswordStatus.text}
                </p>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
                disabled={settingPassword}
              >
                {settingPassword ? "Setting..." : "Set Password"}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-4 md:p-5 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <p className="text-sm text-gray-500 mb-4">
            Update your password regularly to keep your account secure.
          </p>
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            {changePasswordStatus && (
              <p
                className={`text-sm ${
                  changePasswordStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {changePasswordStatus.text}
              </p>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
              disabled={changingPassword}
            >
              {changingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2 text-red-600">
            Delete Account
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            This will permanently remove your account and revoke access.
          </p>
          {deleteStatus && (
            <p
              className={`text-sm mb-3 ${
                deleteStatus.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {deleteStatus.text}
            </p>
          )}
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="px-4 py-2 border border-red-300 text-red-600 rounded disabled:opacity-60"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
