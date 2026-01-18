# E-Commerce Website - Complete Setup Guide

## Project Structure

```
furnistyle-ecommerce/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProductsPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   └── ContactPage.js
│   ├── data/
│   │   └── products.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

# Docker Setup Guide for FurniStyle E-Commerce App

## 📋 Prerequisites
- Docker installed on your machine ([Download Docker](https://www.docker.com/products/docker-desktop))
- Docker running in the background

---

## 🚀 Quick Start - Running Steps

### Step 1: Navigate to Your Project
```bash
cd /path/to/furnistyle-ecommerce
```

### Step 2: Create the Nginx Configuration File
Create a file named `nginx.conf` in your project root with the nginx configuration provided.

### Step 3: Build Docker Image
```bash
docker build -t furnistyle-ecommerce:1.0 .
```

**Explanation:**
- `docker build` - Builds a Docker image from Dockerfile
- `-t furnistyle-ecommerce:1.0` - Tags the image with name and version
- `.` - Uses Dockerfile from current directory

### Step 4: Run Docker Container
```bash
docker run -d -p 3000:80 --name furnistyle-app furnistyle-ecommerce:1.0
```

**Explanation:**
- `docker run` - Creates and starts a container
- `-d` - Runs in detached mode (background)
- `-p 3000:80` - Maps port 3000 (localhost) to port 80 (container)
- `--name furnistyle-app` - Names the container
- `furnistyle-ecommerce:1.0` - Image to use

### Step 5: Access Your App
Open your browser and go to:
```
http://localhost:3000
```

---

## 🛑 Useful Docker Commands

### View Running Containers
```bash
docker ps
```

### View All Containers (including stopped)
```bash
docker ps -a
```

### Stop Container
```bash
docker stop furnistyle-app
```

### Start Container Again
```bash
docker start furnistyle-app
```

### Remove Container
```bash
docker rm furnistyle-app
```

### View Container Logs
```bash
docker logs furnistyle-app
```

### View Real-time Logs
```bash
docker logs -f furnistyle-app
```

### Remove Image
```bash
docker rmi furnistyle-ecommerce:1.0
```

---

## 📊 Docker Explanation

### What is Docker?
Docker is a containerization platform that packages your entire application with all dependencies into a single unit called a "container". Think of it as a lightweight virtual machine.

### Why Use Docker?

| Benefit | Explanation |
|---------|-------------|
| **Consistency** | Works the same on laptop, server, or cloud |
| **Isolation** | App dependencies don't conflict with system |
| **Easy Deployment** | Just run the container anywhere |
| **Scalability** | Run multiple containers easily |
| **Lightweight** | Uses less resources than VMs |

### Our Dockerfile Breakdown

```dockerfile
FROM node:18-alpine AS builder
```
- Uses Node.js 18 with Alpine Linux (lightweight, ~150MB)
- `AS builder` creates a build stage name

```dockerfile
WORKDIR /app
```
- Sets working directory inside container to `/app`

```dockerfile
COPY package*.json ./
```
- Copies `package.json` and `package-lock.json` (if exists)
- `*` is a wildcard pattern

```dockerfile
RUN npm install
```
- Installs all npm dependencies inside container

```dockerfile
COPY . .
```
- Copies entire project source code

```dockerfile
RUN npm run build
```
- Creates optimized production build in `/app/build` folder

```dockerfile
FROM nginx:alpine
```
- **Second Stage**: Uses Nginx (web server) instead of Node
- This removes Node.js from final image (smaller size)

```dockerfile
COPY --from=builder /app/build /usr/share/nginx/html
```
- Copies only the built files from builder stage
- No source code or node_modules included

```dockerfile
EXPOSE 80
```
- Documents that container listens on port 80

```dockerfile
CMD ["nginx", "-g", "daemon off;"]
```
- Starts Nginx server when container runs

### Multi-Stage Build Benefits

| Stage | Size | Purpose |
|-------|------|---------|
| **Builder** | ~1GB | Builds React app (temporary) |
| **Runtime** | ~50MB | Runs built app with Nginx (final) |

Final image is **only 50MB** instead of 1GB+ because we discard builder stage!

---

## 📦 Docker Compose (Optional - Advanced)

Create `docker-compose.yml` for easier management:

```yaml
version: '3.8'

services:
  furnistyle-app:
    build: .
    ports:
      - "3000:80"
    container_name: furnistyle-app
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

Stop with:
```bash
docker-compose down
```

---

## 🔧 Production Deployment Checklist

- [ ] Build image: `docker build -t furnistyle-ecommerce:1.0 .`
- [ ] Test locally: `docker run -p 3000:80 furnistyle-ecommerce:1.0`
- [ ] Push to Docker Hub (optional)
- [ ] Deploy to cloud (AWS, Heroku, DigitalOcean, etc.)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
docker run -p 8080:80 furnistyle-ecommerce:1.0

# Or stop other container
docker stop <container-name>
```

### Container Exits Immediately
```bash
# Check logs
docker logs furnistyle-app
```

### Clear Everything (Fresh Start)
```bash
docker stop furnistyle-app
docker rm furnistyle-app
docker rmi furnistyle-ecommerce:1.0
```

---

## 📚 Key Takeaways

1. **Dockerfile** = Instructions to build image
2. **Image** = Blueprint (like a recipe)
3. **Container** = Running instance (like cooking from recipe)
4. **Multi-stage** = Optimizes final size
5. **Nginx** = Serves static React files efficiently
