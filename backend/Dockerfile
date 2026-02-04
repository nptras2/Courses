FROM node:18-alpine

WORKDIR /app

# copy package files and install only production deps
COPY package*.json ./
RUN npm ci --only=production

# copy rest
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
