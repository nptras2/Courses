# Use Node 18 Alpine as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy backend source code
COPY backend/ .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
