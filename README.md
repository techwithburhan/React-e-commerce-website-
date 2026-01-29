<img width="1470" height="885" alt="Screenshot 2026-01-21 at 2 52 29 PM" src="https://github.com/user-attachments/assets/489fb28c-1156-4a57-ba81-770f20d7fc5e" />

# 🚀 3-Tier Web Application (React + Node.js + MongoDB)

## 📌 Project Overview

This project is a **3-Tier Web Application Architecture** built using industry best practices. It demonstrates a scalable, modular, and production-ready full-stack application with clear separation of concerns across three independent layers.

**Architecture**: Frontend (React) ⬇️ Backend (Node.js + Express) ⬇️ Database (MongoDB)

This separation makes the application easy to maintain, scale, and deploy in cloud environments like AWS, Azure, or Google Cloud.

---

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────┐
│         PRESENTATION LAYER (Frontend)            │
│  React.js - User Interface & Client-Side Logic   │
│  Port: 3000 (Exposed)                            │
└────────────────┬────────────────────────────────┘
                 │ HTTP/REST API
┌────────────────▼────────────────────────────────┐
│    BUSINESS LOGIC LAYER (Backend)                │
│  Node.js + Express.js - API & Business Logic     │
│  Port: 5001 (Exposed)                            │
└────────────────┬────────────────────────────────┘
                 │ MongoDB Driver
┌────────────────▼────────────────────────────────┐
│      DATA ACCESS LAYER (Database)                │
│  MongoDB - Data Storage & Persistence            │
│  Port: 27017 (Internal Network Only)             │
└─────────────────────────────────────────────────┘
```

---

## 🧩 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React.js | Latest |
| **Backend** | Node.js + Express.js | Node 14+ |
| **Database** | MongoDB | 7.x |
| **Containerization** | Docker & Docker Compose | Latest |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (Version 20.10+) - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (Version 1.29+) - [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git** - [Install Git](https://git-scm.com/)
- **Basic understanding of Docker, REST APIs, and web applications**

### Verify Installation

```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start Guide

### Step 1: Create Docker Network

Before running containers, create a Docker network to enable communication between services:

```bash
docker network create furnistyle-network
```

### Step 2: Start MongoDB Container

Run MongoDB with persistent storage using a volume:

```bash
docker run -d \
  -p 27017:27017 \
  --name furnistyle-mongo \
  --network furnistyle-network \
  -v mongo-data:/data/db \
  mongo:7
```

**What this does:**
- `-d` : Run in detached mode (background)
- `-p 27017:27017` : Map port 27017
- `--name furnistyle-mongo` : Container name
- `--network furnistyle-network` : Connect to custom network
- `-v mongo-data:/data/db` : Mount volume for data persistence
- `mongo:7` : MongoDB version 7

### Step 3: Start Backend Container

```bash
docker run -d \
  -p 5001:5001 \
  --name furnistyle-backend-container \
  --network furnistyle-network \
  -e MONGO_URI="mongodb://furnistyle-mongo:27017/furnistyle" \
  furnistyle-backend:latest
```

**What this does:**
- `-e MONGO_URI=...` : Set environment variable for MongoDB connection
- Uses internal DNS (`furnistyle-mongo`) within the network

### Step 4: Start Frontend Container

```bash
docker run -d \
  -p 3000:80 \
  --name furnistyle-frontend-container \
  --network furnistyle-network \
  furnistyle-frontend:latest
```

**Access the application:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

---

## 🐳 Docker Commands Reference

### View Running Containers

```bash
# List all running containers
docker ps

# List all containers (including stopped ones)
docker ps -a

# Show detailed information about running containers
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### View Container Logs

```bash
# View logs from a specific container
docker logs furnistyle-backend-container

# Follow logs in real-time
docker logs -f furnistyle-backend-container

# View last 100 lines
docker logs --tail 100 furnistyle-backend-container

# Show logs with timestamps
docker logs -t furnistyle-backend-container
```

### Container Management

```bash
# Start a stopped container
docker start furnistyle-backend-container

# Stop a running container
docker stop furnistyle-backend-container

# Restart a container
docker restart furnistyle-backend-container

# Remove a stopped container
docker rm furnistyle-backend-container

# Force remove a running container
docker rm -f furnistyle-backend-container

# Pause a container
docker pause furnistyle-backend-container

# Unpause a container
docker unpause furnistyle-backend-container
```

### Inspect Container Details

```bash
# Inspect container configuration and state
docker inspect furnistyle-backend-container

# Get specific information (e.g., IP address)
docker inspect --format='{{.NetworkSettings.Networks}}' furnistyle-backend-container

# Get container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' furnistyle-backend-container

# View environment variables
docker inspect --format='{{json .Config.Env}}' furnistyle-backend-container

# View port mappings
docker inspect --format='{{json .NetworkSettings.Ports}}' furnistyle-backend-container
```

### Access Container Shell

```bash
# Open interactive bash shell in container
docker exec -it furnistyle-backend-container /bin/bash

# Open sh shell (for Alpine-based images)
docker exec -it furnistyle-backend-container /bin/sh

# Run a single command
docker exec furnistyle-backend-container npm --version
```

### Image Management

```bash
# List all images
docker images

# Remove a Docker image
docker rmi furnistyle-backend:latest

# Remove unused images
docker image prune

# Build an image from Dockerfile
docker build -t furnistyle-backend:latest .

# View image history
docker history furnistyle-backend:latest

# Save image to file
docker save furnistyle-backend:latest > furnistyle-backend.tar

# Load image from file
docker load < furnistyle-backend.tar
```

---

## 🌐 Docker Network Management

### Network Commands

```bash
# Create a custom network
docker network create furnistyle-network

# List all networks
docker network ls

# Inspect network details
docker network inspect furnistyle-network

# View network configuration (IP allocation, containers)
docker network inspect furnistyle-network --format='{{json .Containers}}' | jq

# Connect a running container to a network
docker network connect furnistyle-network furnistyle-backend-container

# Disconnect a container from a network
docker network disconnect furnistyle-network furnistyle-backend-container

# Remove a network
docker network rm furnistyle-network

# Remove unused networks
docker network prune
```

### Network Debugging

```bash
# Test DNS resolution between containers
docker exec furnistyle-backend-container ping furnistyle-mongo

# Check network connectivity
docker exec furnistyle-backend-container curl http://furnistyle-mongo:27017

# View container's network settings
docker inspect furnistyle-backend-container | grep -A 20 NetworkSettings
```

---

## 💾 Docker Volume Management

### Volume Commands

```bash
# List all volumes
docker volume ls

# Inspect volume details
docker volume inspect mongo-data

# View volume mount point on host
docker volume inspect mongo-data --format='{{.Mountpoint}}'

# Create a named volume
docker volume create mongo-data

# Remove a volume
docker volume rm mongo-data

# Remove unused volumes
docker volume prune

# Backup volume data
docker run --rm -v mongo-data:/data -v $(pwd):/backup alpine tar czf /backup/mongo-backup.tar.gz -C /data .

# Restore volume from backup
docker run --rm -v mongo-data:/data -v $(pwd):/backup alpine tar xzf /backup/mongo-backup.tar.gz -C /data
```

### Volume Inspection Details

```bash
# Get complete volume information
docker volume inspect mongo-data

# Output format:
# [
#   {
#     "CreatedAt": "2024-01-30T10:15:30Z",
#     "Driver": "local",
#     "Labels": {},
#     "Mountpoint": "/var/lib/docker/volumes/mongo-data/_data",
#     "Name": "mongo-data",
#     "Options": {},
#     "Scope": "local"
#   }
# ]
```

---

## 🔧 Complete Application Teardown

To completely remove all containers, networks, and volumes:

```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove the network
docker network rm furnistyle-network

# Remove the volume (DATA WILL BE DELETED)
docker volume rm mongo-data

# Remove all images
docker rmi furnistyle-frontend:latest furnistyle-backend:latest mongo:7
```

**⚠️ WARNING**: The above commands will delete all data in MongoDB. Use with caution!

---

## 🐛 Troubleshooting Guide

### Issue 1: "Cannot connect to Docker daemon"

**Symptoms:**
```
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```

**Solution:**
```bash
# On Linux
sudo systemctl start docker

# On Mac
open /Applications/Docker.app

# On Windows
# Start Docker Desktop from Start menu

# Verify Docker is running
docker ps
```

---

### Issue 2: "Port already in use"

**Symptoms:**
```
Error response from daemon: driver failed programming external connectivity on endpoint furnistyle-frontend-container: Bind for 0.0.0.0:3000 failed: port is already allocated
```

**Solution:**

Find and stop the container using the port:
```bash
# Find what's using port 3000
lsof -i :3000  # On Mac/Linux
netstat -ano | findstr :3000  # On Windows

# Stop the container
docker stop <container_id>

# Or use a different port
docker run -d -p 3001:80 --name furnistyle-frontend-container furnistyle-frontend:latest
```

---

### Issue 3: "Network not found"

**Symptoms:**
```
Error response from daemon: network furnistyle-network not found
```

**Solution:**
```bash
# Create the network
docker network create furnistyle-network

# Verify network was created
docker network ls
```

---

### Issue 4: "Backend cannot connect to MongoDB"

**Symptoms:**
```
MongoError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

Check if MongoDB container is running:
```bash
# Check if container is running
docker ps | grep furnistyle-mongo

# If not running, start it
docker start furnistyle-mongo

# Test MongoDB connectivity from backend
docker exec furnistyle-backend-container ping furnistyle-mongo

# Check MongoDB logs
docker logs furnistyle-mongo

# Verify connection string in backend
# Should be: mongodb://furnistyle-mongo:27017/furnistyle
# NOT: mongodb://localhost:27017/furnistyle
```

---

### Issue 5: "Frontend cannot reach backend API"

**Symptoms:**
```
Failed to fetch from http://localhost:5001/api/...
CORS error or connection refused
```

**Solution:**

```bash
# Verify backend is running and accessible
docker ps | grep furnistyle-backend-container

# Check backend logs
docker logs furnistyle-backend-container

# Test backend connectivity
docker exec furnistyle-frontend-container curl http://furnistyle-backend-container:5001

# Verify API endpoint
curl http://localhost:5001/api/health  # or your health check endpoint

# Check backend CORS configuration (in your Express app)
# Should allow requests from http://localhost:3000
```

---

### Issue 6: "Container keeps restarting"

**Symptoms:**
```
Status: Restarting (1) 5 seconds ago
```

**Solution:**

```bash
# Check container logs for errors
docker logs furnistyle-backend-container

# Inspect the complete output
docker logs furnistyle-backend-container 2>&1 | tail -50

# Check container details
docker inspect furnistyle-backend-container | grep -A 10 "State"

# Verify environment variables are set correctly
docker inspect --format='{{json .Config.Env}}' furnistyle-backend-container

# Test the image locally
docker run -it furnistyle-backend:latest /bin/bash
```

---

### Issue 7: "MongoDB volume not persisting data"

**Symptoms:**
Data is lost after container restart

**Solution:**

```bash
# Verify volume exists and is mounted
docker volume ls | grep mongo-data

# Check volume mount point
docker volume inspect mongo-data

# Verify volume is properly mounted in container
docker inspect furnistyle-mongo | grep -A 5 Mounts

# Check volume permissions
docker exec furnistyle-mongo ls -la /data/db

# If volume is corrupted, backup and recreate
docker volume create mongo-data-backup
docker run --rm -v mongo-data:/old -v mongo-data-backup:/new alpine cp -r /old/* /new/
docker volume rm mongo-data
docker volume create mongo-data
```

---

### Issue 8: "Out of disk space"

**Symptoms:**
```
no space left on device
docker: Error response from daemon
```

**Solution:**

```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a

# Remove specific images
docker rmi furnistyle-backend:latest

# Check volume size
docker volume ls

# Remove unused volumes
docker volume prune

# Check MongoDB data volume size
du -sh /var/lib/docker/volumes/mongo-data/_data

# If necessary, backup and clear volume
docker volume create mongo-data-backup
docker run --rm -v mongo-data:/source -v mongo-data-backup:/backup alpine tar czf /backup/backup.tar.gz -C /source .
docker volume rm mongo-data
```

---

### Issue 9: "Docker daemon running out of memory"

**Symptoms:**
```
Cannot allocate memory
OOMKilled
```

**Solution:**

```bash
# Check running containers and their memory usage
docker stats

# Limit container memory in future runs
docker run -d -m 512m --name furnistyle-backend-container furnistyle-backend:latest

# Restart containers with memory limits
docker stop furnistyle-backend-container
docker rm furnistyle-backend-container
docker run -d -m 1g -p 5001:5001 --name furnistyle-backend-container furnistyle-backend:latest
```

---

### Issue 10: "Container logs are too large"

**Symptoms:**
Docker daemon becomes slow, disk fills up

**Solution:**

```bash
# Rotate container logs
docker inspect --format='{{.LogPath}}' furnistyle-backend-container

# Clear logs (be careful!)
docker logs --tail 0 -f furnistyle-backend-container

# Configure log rotation in Docker daemon (edit /etc/docker/daemon.json)
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}

# Restart Docker daemon
sudo systemctl restart docker
```

---

## 🔍 Debugging Tips & Tricks

### Interactive Debugging

```bash
# Execute command in running container
docker exec -it furnistyle-backend-container npm start

# Install additional tools in container
docker exec furnistyle-backend-container apt-get update && apt-get install -y curl

# Check environment inside container
docker exec furnistyle-backend-container env

# View process list in container
docker exec furnistyle-backend-container ps aux
```

### Network Debugging

```bash
# Test connectivity between containers
docker exec furnistyle-backend-container ping furnistyle-mongo

# Check DNS resolution
docker exec furnistyle-backend-container nslookup furnistyle-mongo

# Verify port is listening
docker exec furnistyle-mongo ss -tlnp

# Check MongoDB connection
docker exec furnistyle-mongo mongosh --eval "db.adminCommand('ping')"
```

### Database Debugging

```bash
# Connect to MongoDB from another container
docker exec -it furnistyle-mongo mongosh

# Inside MongoDB shell:
# show dbs                    # List databases
# use furnistyle              # Switch to database
# db.collection.find()        # View documents
# db.collection.stats()       # Collection statistics
```

---

## 📊 Useful Docker Monitoring Commands

```bash
# Real-time resource usage of running containers
docker stats

# View all container events
docker events

# Check Docker system information
docker system info

# Check disk usage by Docker
docker system df

# Prune everything (stopped containers, dangling images, unused networks)
docker system prune -a

# View container process list
docker top furnistyle-backend-container

# Get container configuration as JSON
docker inspect furnistyle-backend-container
```

---

## 🚨 Emergency Commands

```bash
# Kill all running containers
docker kill $(docker ps -q)

# Remove all stopped containers
docker container prune

# Remove all dangling images
docker image prune

# Remove all unused volumes
docker volume prune

# Remove all unused networks
docker network prune

# Complete Docker cleanup
docker system prune -a --volumes
```

---

## 🎯 Purpose of This Project

This 3-Tier Architecture demonstrates:

✅ Separation of concerns across frontend, backend, and database layers  
✅ Containerization of each layer for consistent deployments  
✅ Docker networking for secure inter-container communication  
✅ Data persistence using Docker volumes  
✅ Scalability and modularity for production environments  
✅ Cloud-ready architecture for AWS, Azure, and Google Cloud deployments  

---

## 📁 Project Structure

```
furnistyle-app/
├── frontend/               # React.js application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── backend/                # Node.js + Express application
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Optional: compose file
└── README.md              # This file
```

---

## 🔐 Security Best Practices

- Never expose MongoDB directly to the internet (no port mapping in production)
- Use environment variables for sensitive configuration
- Implement authentication in your Node.js backend
- Use HTTPS in production
- Set resource limits for containers
- Use private Docker registries for sensitive images
- Keep Docker and images updated

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Best Practices](https://nodejs.org/en/docs/)
- [React Documentation](https://react.dev/)

---

## 👨‍💻 Author

**Burhan**

- 🔗 GitHub: [https://github.com/techwithburhan](https://github.com/techwithburhan)
- 💼 LinkedIn: [https://linkedin.com/in/techwithburhan](https://linkedin.com/in/techwithburhan)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ❓ FAQ

**Q: How do I backup my MongoDB data?**  
A: Use `docker volume inspect mongo-data` to find the volume path, or use the backup commands mentioned in the troubleshooting section.

**Q: Can I use Docker Compose instead of manual commands?**  
A: Yes! Create a `docker-compose.yml` file and use `docker-compose up -d` to manage all containers at once.

**Q: How do I update my application?**  
A: Rebuild the image, stop the old container, remove it, and run the new image.

**Q: What's the difference between the network hostname and localhost?**  
A: Inside the Docker network, use the container name (`furnistyle-mongo`). From your host machine, use `localhost` or `127.0.0.1`.

---

**Last Updated**: January 2025  
**Version**: 1.0.0

---

⭐ If this project helped you, please consider giving it a star on GitHub!
