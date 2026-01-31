# ---------- Stage 1: Install dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

# Install only production dependencies (NEW way)
RUN npm install --omit=dev

# ---------- Stage 2: Run application ----------
FROM node:20-alpine

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

EXPOSE 5001

CMD ["node", "server.js"]
