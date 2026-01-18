# Stage 1: Build Stage
# Using official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project source code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Runtime Stage
# Using lightweight Nginx image to serve the built app
FROM nginx:alpine

# Copy nginx configuration (optional - for SPA routing)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
