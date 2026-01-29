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

# 🔧 Complete Docker Commands Reference Guide
## 3-Tier Application (React + Node.js + MongoDB)

**Quick Navigation:**
1. [Volume Commands](#1-volume-commands)
2. [Network Commands](#2-network-commands)
3. [MongoDB Commands](#3-mongodb-commands)
4. [Backend Commands](#4-backend-commands)
5. [Frontend Commands](#5-frontend-commands)
6. [Troubleshooting Commands](#6-troubleshooting-commands)

---

# 1️⃣ VOLUME COMMANDS

## Create Volume

```bash
# Create a named volume for MongoDB data
docker volume create mongo-data

# Create multiple volumes
docker volume create mongo-data
docker volume create app-logs
docker volume create backup-data
```

## List Volumes

```bash
# List all volumes
docker volume ls

# List volumes with specific driver
docker volume ls --filter driver=local

# List volumes with custom format
docker volume ls --format "table {{.Name}}\t{{.Driver}}\t{{.Mountpoint}}"
```

## Inspect Volume

```bash
# Get complete volume information
docker volume inspect mongo-data

# Get volume mountpoint only
docker volume inspect mongo-data --format='{{.Mountpoint}}'

# Get volume driver
docker volume inspect mongo-data --format='{{.Driver}}'

# Get volume creation time
docker volume inspect mongo-data --format='{{.CreatedAt}}'

# Pretty print JSON output
docker volume inspect mongo-data --format='{{json .}}' | jq .
```

## Check Volume Size

```bash
# Check volume size (Linux/Mac)
docker run --rm -v mongo-data:/data alpine du -sh /data

# Check detailed size breakdown
docker run --rm -v mongo-data:/data alpine du -sh /data/*
```

## Backup Volume

```bash
# Backup volume to tar file
docker run --rm -v mongo-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mongo-backup.tar.gz -C /data .

# Backup with timestamp
docker run --rm -v mongo-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mongo-backup-$(date +%Y%m%d_%H%M%S).tar.gz -C /data .

# Windows PowerShell backup
docker run --rm -v mongo-data:/data -v ${PWD}:/backup `
  alpine tar czf /backup/mongo-backup.tar.gz -C /data .
```

## Restore Volume

```bash
# Restore volume from tar file
docker run --rm -v mongo-data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/mongo-backup.tar.gz -C /data

# Create new volume and restore
docker volume create mongo-data-restored
docker run --rm -v mongo-data-restored:/data -v $(pwd):/backup \
  alpine tar xzf /backup/mongo-backup.tar.gz -C /data
```

## Copy Volume Data

```bash
# Copy data from one volume to another
docker run --rm \
  -v mongo-data:/source \
  -v mongo-data-backup:/dest \
  alpine cp -r /source/* /dest/

# Copy volume to host
docker run --rm -v mongo-data:/data -v $(pwd):/host \
  alpine cp -r /data/* /host/mongo-data-backup/
```

## Remove Volume

```bash
# Remove a specific volume
docker volume rm mongo-data

# Remove all unused volumes
docker volume prune

# Remove all unused volumes without confirmation
docker volume prune -f

# Remove volume and its data (⚠️ DATA LOSS)
docker volume rm mongo-data
```

## Mount Volume in Container

```bash
# Run MongoDB with volume
docker run -d \
  -v mongo-data:/data/db \
  --name furnistyle-mongo \
  mongo:7

# Run with read-only volume
docker run -d \
  -v mongo-data:/data/db:ro \
  --name furnistyle-mongo \
  mongo:7

# Run with multiple volumes
docker run -d \
  -v mongo-data:/data/db \
  -v backup-data:/backup \
  --name furnistyle-mongo \
  mongo:7
```

---

# 2️⃣ NETWORK COMMANDS

## Create Network

```bash
# Create custom bridge network
docker network create furnistyle-network

# Create with specific subnet
docker network create \
  --subnet=172.20.0.0/16 \
  furnistyle-network

# Create overlay network (for Docker Swarm)
docker network create \
  --driver overlay \
  --attachable \
  furnistyle-overlay

# Create with custom options
docker network create \
  --driver bridge \
  --label app=furnistyle \
  furnistyle-network
```

## List Networks

```bash
# List all networks
docker network ls

# List networks with custom format
docker network ls --format "table {{.Name}}\t{{.Driver}}\t{{.Scope}}"

# Filter networks by name
docker network ls --filter name=furnistyle

# Filter networks by driver
docker network ls --filter driver=bridge
```

## Inspect Network

```bash
# Get complete network information
docker inspect furnistyle-network

# Pretty print network info
docker inspect furnistyle-network --format='{{json .}}' | jq .

# Get connected containers
docker network inspect furnistyle-network --format='{{json .Containers}}' | jq .

# Get network gateway
docker network inspect furnistyle-network --format='{{.IPAM.Config}}'

# Get network subnet
docker network inspect furnistyle-network --format='{{range .IPAM.Config}}{{.Subnet}}{{end}}'
```

## Connect/Disconnect Containers

```bash
# Connect a running container to network
docker network connect furnistyle-network furnistyle-backend-container

# Disconnect container from network
docker network disconnect furnistyle-network furnistyle-backend-container

# Force disconnect
docker network disconnect -f furnistyle-network furnistyle-backend-container

# Connect with specific IP
docker network connect \
  --ip=172.20.0.5 \
  furnistyle-network \
  furnistyle-backend-container
```

## Test Network Connectivity

```bash
# Ping between containers (DNS resolution)
docker exec furnistyle-backend-container ping furnistyle-mongo

# Check DNS resolution
docker exec furnistyle-backend-container nslookup furnistyle-mongo

# Test HTTP connectivity
docker exec furnistyle-backend-container curl http://furnistyle-mongo:27017

# Check open ports
docker exec furnistyle-mongo ss -tlnp

# Detailed network info from container
docker exec furnistyle-backend-container ip addr show
```

## Remove Network

```bash
# Remove a specific network
docker network rm furnistyle-network

# Remove all unused networks
docker network prune

# Remove unused networks without confirmation
docker network prune -f

# Remove network and all connected containers
docker network rm furnistyle-network
```

---

# 3️⃣ MONGODB COMMANDS

## Start MongoDB Container

```bash
# Basic MongoDB container
docker run -d \
  -p 27017:27017 \
  --name furnistyle-mongo \
  mongo:7

# MongoDB with network
docker run -d \
  -p 27017:27017 \
  --name furnistyle-mongo \
  --network furnistyle-network \
  mongo:7

# MongoDB with volume and network
docker run -d \
  -p 27017:27017 \
  --name furnistyle-mongo \
  --network furnistyle-network \
  -v mongo-data:/data/db \
  mongo:7

# MongoDB with memory limit
docker run -d \
  -p 27017:27017 \
  -m 1g \
  --name furnistyle-mongo \
  --network furnistyle-network \
  -v mongo-data:/data/db \
  mongo:7
```

## Stop/Start/Restart MongoDB

```bash
# Stop MongoDB container
docker stop furnistyle-mongo

# Start MongoDB container
docker start furnistyle-mongo

# Restart MongoDB container
docker restart furnistyle-mongo

# Pause MongoDB (freeze processes)
docker pause furnistyle-mongo

# Unpause MongoDB
docker unpause furnistyle-mongo
```

## MongoDB Shell Access

```bash
# Access MongoDB shell (mongosh)
docker exec -it furnistyle-mongo mongosh

# Access MongoDB shell with specific database
docker exec -it furnistyle-mongo mongosh furnistyle

# Run MongoDB command
docker exec furnistyle-mongo mongosh --eval "db.adminCommand('ping')"

# Check MongoDB version
docker exec furnistyle-mongo mongosh --version
```

## MongoDB Database Operations

```bash
# Inside mongosh shell:

# List all databases
show dbs

# Switch to database
use furnistyle

# Show collections in database
show collections

# Get database statistics
db.stats()

# Get collection statistics
db.products.stats()

# Check collection size
db.products.estimatedDocumentCount()

# Get document count
db.products.countDocuments()
```

## MongoDB Collection Operations

```bash
# Inside mongosh shell:

# View first document
db.products.findOne()

# View all documents
db.products.find()

# View with pretty formatting
db.products.find().pretty()

# View with limit
db.products.find().limit(5)

# View with specific fields
db.products.find({}, {name: 1, price: 1})

# Count total documents
db.products.countDocuments()

# Find with filter
db.products.find({status: "active"})

# Find with AND condition
db.products.find({status: "active", price: {$gt: 100}})

# Find with OR condition
db.products.find({$or: [{status: "active"}, {status: "featured"}]})
```

## MongoDB Insert Data

```bash
# Inside mongosh shell:

# Insert single document
db.products.insertOne({name: "Chair", price: 100})

# Insert multiple documents
db.products.insertMany([
  {name: "Chair", price: 100},
  {name: "Table", price: 200},
  {name: "Desk", price: 300}
])
```

## MongoDB Update Data

```bash
# Inside mongosh shell:

# Update single document
db.products.updateOne({_id: ObjectId("...")}, {$set: {price: 150}})

# Update multiple documents
db.products.updateMany({status: "old"}, {$set: {status: "archived"}})

# Replace entire document
db.products.replaceOne({_id: ObjectId("...")}, {name: "NewName", price: 200})
```

## MongoDB Delete Data

```bash
# Inside mongosh shell:

# Delete single document
db.products.deleteOne({_id: ObjectId("...")})

# Delete multiple documents
db.products.deleteMany({status: "archived"})

# Clear entire collection
db.products.deleteMany({})

# Drop entire collection
db.products.drop()

# Drop entire database
db.dropDatabase()
```

## MongoDB Import/Export

```bash
# Import JSON data
docker exec -i furnistyle-mongo mongoimport \
  --db furnistyle \
  --collection products \
  --jsonArray < furnistyle.products.json

# Import CSV
docker exec -i furnistyle-mongo mongoimport \
  --db furnistyle \
  --collection products \
  --type csv \
  --headerline < products.csv

# Import with upsert
docker exec -i furnistyle-mongo mongoimport \
  --db furnistyle \
  --collection products \
  --jsonArray \
  --upsert < furnistyle.products.json

# Export collection to JSON
docker exec furnistyle-mongo mongoexport \
  --db furnistyle \
  --collection products > products_export.json

# Export with query filter
docker exec furnistyle-mongo mongoexport \
  --db furnistyle \
  --collection products \
  --query '{status: "active"}' > active_products.json

# Export to specific file path
docker exec furnistyle-mongo mongoexport \
  --db furnistyle \
  --collection products \
  --out /tmp/products.json
```

## MongoDB Logs

```bash
# View MongoDB container logs
docker logs furnistyle-mongo

# Follow logs in real-time
docker logs -f furnistyle-mongo

# View last 50 lines
docker logs --tail 50 furnistyle-mongo

# View logs with timestamps
docker logs -t furnistyle-mongo

# View logs for specific time range
docker logs --since 2024-01-30 furnistyle-mongo
```

## MongoDB Backup & Restore

```bash
# Backup MongoDB database
docker exec furnistyle-mongo \
  mongodump --db furnistyle --out /tmp/backup

# Copy backup from container to host
docker cp furnistyle-mongo:/tmp/backup ./mongo-backup

# Restore MongoDB database
docker exec furnistyle-mongo \
  mongorestore --db furnistyle /tmp/backup/furnistyle

# Full backup with tar
docker run --rm -v mongo-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mongo-full-backup.tar.gz -C /data .
```

## Remove MongoDB Container

```bash
# Remove stopped container
docker rm furnistyle-mongo

# Remove running container (force)
docker rm -f furnistyle-mongo

# Remove container and its volume
docker rm -v furnistyle-mongo

# Remove MongoDB image
docker rmi mongo:7
```

---

# 4️⃣ BACKEND COMMANDS

## Build Backend Image

```bash
# Build backend image from Dockerfile
docker build -t furnistyle-backend:latest .

# Build with build arguments
docker build \
  --build-arg NODE_ENV=production \
  -t furnistyle-backend:latest .

# Build with custom Dockerfile path
docker build -f ./docker/Dockerfile -t furnistyle-backend:latest .

# Build without cache
docker build --no-cache -t furnistyle-backend:latest .

# Build with tags
docker build -t furnistyle-backend:1.0 -t furnistyle-backend:latest .
```

## Start Backend Container

```bash
# Start backend container (basic)
docker run -d \
  -p 5001:5001 \
  --name furnistyle-backend-container \
  furnistyle-backend:latest

# Start with network
docker run -d \
  -p 5001:5001 \
  --name furnistyle-backend-container \
  --network furnistyle-network \
  furnistyle-backend:latest

# Start with environment variables
docker run -d \
  -p 5001:5001 \
  --name furnistyle-backend-container \
  --network furnistyle-network \
  -e MONGO_URI="mongodb://furnistyle-mongo:27017/furnistyle" \
  -e NODE_ENV="production" \
  -e PORT=5001 \
  furnistyle-backend:latest

# Start with volume for logs
docker run -d \
  -p 5001:5001 \
  --name furnistyle-backend-container \
  --network furnistyle-network \
  -e MONGO_URI="mongodb://furnistyle-mongo:27017/furnistyle" \
  -v backend-logs:/app/logs \
  furnistyle-backend:latest

# Start with memory limit
docker run -d \
  -p 5001:5001 \
  -m 1g \
  --cpus="0.5" \
  --name furnistyle-backend-container \
  --network furnistyle-network \
  -e MONGO_URI="mongodb://furnistyle-mongo:27017/furnistyle" \
  furnistyle-backend:latest
```

## Backend Container Management

```bash
# Check if backend is running
docker ps | grep furnistyle-backend-container

# View backend container details
docker inspect furnistyle-backend-container

# View backend logs
docker logs furnistyle-backend-container

# Follow backend logs
docker logs -f furnistyle-backend-container

# View environment variables
docker inspect --format='{{json .Config.Env}}' furnistyle-backend-container

# View port mappings
docker inspect --format='{{json .NetworkSettings.Ports}}' furnistyle-backend-container
```

## Test Backend API

```bash
# Check health endpoint
curl http://localhost:5001/health

# Get API response
curl http://localhost:5001/api/products

# POST request to API
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Chair", "price":100}'

# Test from another container
docker exec furnistyle-frontend-container \
  curl http://furnistyle-backend-container:5001/api/products

# Test MongoDB connection
docker exec furnistyle-backend-container \
  curl http://furnistyle-mongo:27017
```

## Execute Commands in Backend

```bash
# Open interactive bash shell
docker exec -it furnistyle-backend-container /bin/bash

# Run npm commands
docker exec furnistyle-backend-container npm --version
docker exec furnistyle-backend-container npm list
docker exec furnistyle-backend-container npm start

# Run Node commands
docker exec furnistyle-backend-container node --version
docker exec furnistyle-backend-container node -e "console.log(process.version)"

# Install packages
docker exec furnistyle-backend-container npm install express

# View file in container
docker exec furnistyle-backend-container cat /app/package.json
```

## Backend Logs & Debugging

```bash
# View all logs
docker logs furnistyle-backend-container

# View last 100 lines
docker logs --tail 100 furnistyle-backend-container

# View logs with timestamps
docker logs -t furnistyle-backend-container

# Follow logs with tail
docker logs -f --tail 50 furnistyle-backend-container

# View logs since specific time
docker logs --since 2024-01-30T10:00:00 furnistyle-backend-container

# Check memory usage
docker stats furnistyle-backend-container

# Inspect container processes
docker top furnistyle-backend-container
```

## Backend Container Lifecycle

```bash
# Stop backend
docker stop furnistyle-backend-container

# Start backend
docker start furnistyle-backend-container

# Restart backend
docker restart furnistyle-backend-container

# Pause backend
docker pause furnistyle-backend-container

# Unpause backend
docker unpause furnistyle-backend-container

# Remove stopped container
docker rm furnistyle-backend-container

# Remove running container (force)
docker rm -f furnistyle-backend-container
```

## Backend Image Management

```bash
# List backend images
docker images | grep furnistyle-backend

# View image layers and history
docker history furnistyle-backend:latest

# Save image to tar file
docker save furnistyle-backend:latest > furnistyle-backend.tar

# Load image from tar file
docker load < furnistyle-backend.tar

# Tag image
docker tag furnistyle-backend:latest myregistry/furnistyle-backend:v1.0

# Push to registry
docker push myregistry/furnistyle-backend:v1.0

# Remove image
docker rmi furnistyle-backend:latest

# Remove unused images
docker image prune
```

---

# 5️⃣ FRONTEND COMMANDS

## Build Frontend Image

```bash
# Build frontend image from Dockerfile
docker build -t furnistyle-frontend:latest .

# Build with build arguments
docker build \
  --build-arg REACT_APP_API_URL=http://localhost:5001 \
  -t furnistyle-frontend:latest .

# Build with custom Dockerfile path
docker build -f ./docker/Dockerfile -t furnistyle-frontend:latest .

# Build without cache
docker build --no-cache -t furnistyle-frontend:latest .

# Build multi-stage for production
docker build \
  --target production \
  -t furnistyle-frontend:prod .
```

## Start Frontend Container

```bash
# Start frontend container (basic)
docker run -d \
  -p 3000:80 \
  --name furnistyle-frontend-container \
  furnistyle-frontend:latest

# Start with network
docker run -d \
  -p 3000:80 \
  --name furnistyle-frontend-container \
  --network furnistyle-network \
  furnistyle-frontend:latest

# Start with environment variables
docker run -d \
  -p 3000:80 \
  --name furnistyle-frontend-container \
  --network furnistyle-network \
  -e REACT_APP_API_URL="http://localhost:5001" \
  furnistyle-frontend:latest

# Start on different port
docker run -d \
  -p 3001:80 \
  --name furnistyle-frontend-container \
  --network furnistyle-network \
  furnistyle-frontend:latest

# Start with volume for development
docker run -d \
  -p 3000:80 \
  --name furnistyle-frontend-container \
  -v $(pwd)/src:/app/src \
  furnistyle-frontend:latest

# Start with memory limit
docker run -d \
  -p 3000:80 \
  -m 512m \
  --cpus="0.5" \
  --name furnistyle-frontend-container \
  --network furnistyle-network \
  furnistyle-frontend:latest
```

## Frontend Container Management

```bash
# Check if frontend is running
docker ps | grep furnistyle-frontend-container

# View frontend container details
docker inspect furnistyle-frontend-container

# View frontend logs
docker logs furnistyle-frontend-container

# Follow frontend logs
docker logs -f furnistyle-frontend-container

# View environment variables
docker inspect --format='{{json .Config.Env}}' furnistyle-frontend-container

# View port mappings
docker inspect --format='{{json .NetworkSettings.Ports}}' furnistyle-frontend-container
```

## Test Frontend Application

```bash
# Access frontend in browser
# http://localhost:3000

# Test frontend from curl
curl http://localhost:3000

# Test from another container
docker exec furnistyle-backend-container \
  curl http://furnistyle-frontend-container:80

# Check response headers
curl -I http://localhost:3000

# Verbose output
curl -v http://localhost:3000
```

## Execute Commands in Frontend

```bash
# Open interactive bash shell
docker exec -it furnistyle-frontend-container /bin/bash

# Open sh shell (Alpine)
docker exec -it furnistyle-frontend-container /bin/sh

# Run npm commands
docker exec furnistyle-frontend-container npm --version
docker exec furnistyle-frontend-container npm list

# Check Node version
docker exec furnistyle-frontend-container node --version

# View file in container
docker exec furnistyle-frontend-container cat /app/package.json

# View nginx config
docker exec furnistyle-frontend-container cat /etc/nginx/nginx.conf
```

## Frontend Logs & Debugging

```bash
# View all logs
docker logs furnistyle-frontend-container

# View last 100 lines
docker logs --tail 100 furnistyle-frontend-container

# View logs with timestamps
docker logs -t furnistyle-frontend-container

# Follow logs
docker logs -f furnistyle-frontend-container

# Check memory usage
docker stats furnistyle-frontend-container

# Inspect container processes
docker top furnistyle-frontend-container

# View network connections
docker exec furnistyle-frontend-container netstat -tlnp
```

## Frontend Container Lifecycle

```bash
# Stop frontend
docker stop furnistyle-frontend-container

# Start frontend
docker start furnistyle-frontend-container

# Restart frontend
docker restart furnistyle-frontend-container

# Pause frontend
docker pause furnistyle-frontend-container

# Unpause frontend
docker unpause furnistyle-frontend-container

# Remove stopped container
docker rm furnistyle-frontend-container

# Remove running container (force)
docker rm -f furnistyle-frontend-container
```

## Frontend Image Management

```bash
# List frontend images
docker images | grep furnistyle-frontend

# View image layers
docker history furnistyle-frontend:latest

# Save image to tar
docker save furnistyle-frontend:latest > furnistyle-frontend.tar

# Load image from tar
docker load < furnistyle-frontend.tar

# Tag image
docker tag furnistyle-frontend:latest myregistry/furnistyle-frontend:v1.0

# Push to registry
docker push myregistry/furnistyle-frontend:v1.0

# Remove image
docker rmi furnistyle-frontend:latest
```

---

# 6️⃣ TROUBLESHOOTING COMMANDS

## System Health Check

```bash
# Check Docker version
docker --version

# Check Docker info
docker info

# Check disk usage
docker system df

# Check running containers
docker ps

# Check all containers (including stopped)
docker ps -a

# Check system events
docker system events --since 10m
```

## Container Status Checks

```bash
# Check if container is running
docker ps | grep furnistyle-backend-container

# Get container state
docker inspect --format='{{.State.Running}}' furnistyle-backend-container

# Get container status
docker inspect --format='{{.State.Status}}' furnistyle-backend-container

# Get exit code (if stopped)
docker inspect --format='{{.State.ExitCode}}' furnistyle-backend-container

# Check restart count
docker inspect --format='{{.RestartCount}}' furnistyle-backend-container
```

## Network Troubleshooting

```bash
# List all networks
docker network ls

# Inspect furnistyle network
docker network inspect furnistyle-network

# Test DNS from backend container
docker exec furnistyle-backend-container nslookup furnistyle-mongo

# Test DNS from frontend container
docker exec furnistyle-frontend-container nslookup furnistyle-backend-container

# Ping MongoDB from backend
docker exec furnistyle-backend-container ping furnistyle-mongo

# Check network connectivity
docker exec furnistyle-backend-container ping 8.8.8.8

# View container IP address
docker inspect furnistyle-backend-container | grep IPAddress

# Check open ports in container
docker exec furnistyle-mongo ss -tlnp

# Check connection to MongoDB
docker exec furnistyle-backend-container nc -zv furnistyle-mongo 27017
```

## Port Troubleshooting

```bash
# Find what's using port 3000 (Mac/Linux)
lsof -i :3000

# Find what's using port 5001 (Mac/Linux)
lsof -i :5001

# Find what's using port 27017 (Mac/Linux)
lsof -i :27017

# Find what's using port 3000 (Windows)
netstat -ano | findstr :3000

# List all port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Check if port is open
nc -zv localhost 3000

# View port mappings of specific container
docker inspect furnistyle-frontend-container | grep -A 10 Ports

# Check listening ports (Linux)
netstat -tlnp | grep 3000
```

## Logs & Output Troubleshooting

```bash
# Get all container logs
docker logs furnistyle-backend-container

# Get container logs with error context
docker logs furnistyle-backend-container 2>&1

# Get last 50 lines
docker logs --tail 50 furnistyle-backend-container

# Get logs for last hour
docker logs --since 1h furnistyle-backend-container

# Get logs with timestamps
docker logs -t furnistyle-backend-container

# Stream logs in real-time
docker logs -f furnistyle-backend-container

# Check for error patterns
docker logs furnistyle-backend-container | grep -i error

# Check for connection issues
docker logs furnistyle-backend-container | grep -i connect

# Save logs to file
docker logs furnistyle-backend-container > backend-logs.txt 2>&1

# View stderr and stdout
docker logs furnistyle-backend-container > logs.txt 2>&1
```

## Volume Troubleshooting

```bash
# Check if volume exists
docker volume ls | grep mongo-data

# Inspect volume details
docker volume inspect mongo-data

# Get volume mount point
docker volume inspect mongo-data --format='{{.Mountpoint}}'

# Check volume size
docker run --rm -v mongo-data:/data alpine du -sh /data

# Check volume permissions
docker run --rm -v mongo-data:/data alpine ls -la /data

# Check if volume is mounted in container
docker inspect furnistyle-mongo | grep -A 10 Mounts

# Verify data in volume
docker run --rm -v mongo-data:/data alpine ls -la /data/db

# Check volume usage details
docker run --rm -v mongo-data:/data alpine du -sh /data/*
```

## Resource & Performance Troubleshooting

```bash
# Real-time resource usage
docker stats

# Resource usage of specific container
docker stats furnistyle-backend-container

# Check memory limit
docker inspect --format='{{.HostConfig.Memory}}' furnistyle-backend-container

# Check CPU limit
docker inspect --format='{{.HostConfig.CpuPeriod}}' furnistyle-backend-container

# Container processes and resource usage
docker top furnistyle-backend-container

# Check if container is out of memory
docker inspect furnistyle-backend-container | grep OOMKilled

# View container statistics
docker stats --no-stream furnistyle-backend-container

# Check system memory
docker system df

# Check disk usage
df -h /var/lib/docker
```

## Connection & API Troubleshooting

```bash
# Test backend health endpoint
curl http://localhost:5001/health

# Test backend API endpoint
curl http://localhost:5001/api/products

# Test with headers
curl -H "Content-Type: application/json" http://localhost:5001/api/products

# Test frontend
curl http://localhost:3000

# Test MongoDB connection from backend
docker exec furnistyle-backend-container \
  curl http://furnistyle-mongo:27017

# Test with verbose output
curl -v http://localhost:5001/api/products

# Test with verbose and headers
curl -v -H "Content-Type: application/json" http://localhost:5001/api/products

# Test connection between containers
docker exec furnistyle-backend-container \
  curl http://furnistyle-frontend-container:80

# Check DNS resolution between containers
docker exec furnistyle-backend-container \
  nslookup furnistyle-mongo
```

## MongoDB Connection Troubleshooting

```bash
# Check if MongoDB is running
docker ps | grep furnistyle-mongo

# Check MongoDB logs
docker logs furnistyle-mongo

# Connect to MongoDB shell
docker exec -it furnistyle-mongo mongosh

# Check MongoDB status (inside mongosh)
db.adminCommand('ping')

# Check MongoDB version (inside mongosh)
db.version()

# List databases (inside mongosh)
show dbs

# Check connection from backend container
docker exec furnistyle-backend-container \
  mongosh mongodb://furnistyle-mongo:27017 --eval "db.adminCommand('ping')"

# Test connectivity
docker exec furnistyle-backend-container \
  ping furnistyle-mongo

# Check if MongoDB port is open
docker exec furnistyle-mongo ss -tlnp | grep 27017

# Restart MongoDB
docker restart furnistyle-mongo
```

## Configuration & Environment Troubleshooting

```bash
# View all environment variables
docker inspect furnistyle-backend-container | grep -A 20 Env

# View specific environment variable
docker exec furnistyle-backend-container printenv MONGO_URI

# Check all env vars in container
docker exec furnistyle-backend-container env

# Verify MONGO_URI format
docker exec furnistyle-backend-container \
  echo $MONGO_URI

# Check Node environment
docker exec furnistyle-backend-container \
  echo $NODE_ENV

# View Dockerfile
docker inspect furnistyle-backend:latest | grep -A 100 Cmd
```

## Cleanup & Recovery Troubleshooting

```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all stopped containers
docker container prune -f

# Remove unused volumes
docker volume prune -f

# Remove unused networks
docker network prune -f

# Remove unused images
docker image prune -f

# Complete cleanup (careful!)
docker system prune -a --volumes -f

# Remove specific container
docker rm -f furnistyle-backend-container

# Remove specific image
docker rmi furnistyle-backend:latest

# Remove all images with pattern
docker rmi $(docker images | grep furnistyle | awk '{print $3}')
```

## Debugging Commands

```bash
# Open bash shell in container
docker exec -it furnistyle-backend-container /bin/bash

# Run single command
docker exec furnistyle-backend-container ls -la /app

# Check Node version
docker exec furnistyle-backend-container node --version

# Check npm version
docker exec furnistyle-backend-container npm --version

# Check installed packages
docker exec furnistyle-backend-container npm list

# Check MongoDB CLI tools
docker exec furnistyle-mongo mongosh --version

# View application logs from container
docker exec furnistyle-backend-container cat /app/logs/app.log

# Check if MongoDB data exists
docker exec furnistyle-mongo ls -la /data/db

# Check container network settings
docker exec furnistyle-backend-container ifconfig

# View routing table
docker exec furnistyle-backend-container route -n
```

## Advanced Debugging

```bash
# Get container process details
docker inspect furnistyle-backend-container --format='{{json .}}' | jq .

# Check what changed in container filesystem
docker diff furnistyle-backend-container

# Commit container changes to image
docker commit furnistyle-backend-container furnistyle-backend:debug

# Get detailed container resource limits
docker inspect furnistyle-backend-container | grep -A 20 HostConfig

# Check container security options
docker inspect furnistyle-backend-container | grep SecurityOpt

# View bind mounts
docker inspect furnistyle-backend-container | grep -A 20 Mounts

# Check DNS settings
docker inspect furnistyle-backend-container | grep -A 5 Dns

# View restart policy
docker inspect furnistyle-backend-container | grep RestartPolicy
```

---

## 🎯 Quick Reference Cheat Sheet

| Task | Command |
|------|---------|
| Create network | `docker network create furnistyle-network` |
| Create volume | `docker volume create mongo-data` |
| Start MongoDB | `docker run -d -v mongo-data:/data/db --name furnistyle-mongo --network furnistyle-network mongo:7` |
| Start Backend | `docker run -d -p 5001:5001 -e MONGO_URI="mongodb://furnistyle-mongo:27017/furnistyle" --name furnistyle-backend-container --network furnistyle-network furnistyle-backend:latest` |
| Start Frontend | `docker run -d -p 3000:80 --name furnistyle-frontend-container --network furnistyle-network furnistyle-frontend:latest` |
| View logs | `docker logs -f furnistyle-backend-container` |
| Check health | `curl http://localhost:5001/health` |
| MongoDB shell | `docker exec -it furnistyle-mongo mongosh` |
| Test network | `docker exec furnistyle-backend-container ping furnistyle-mongo` |
| Stop all | `docker stop $(docker ps -aq)` |
| Clean up all | `docker system prune -a` |

---

**Last Updated**: January 2025  
**Version**: 1.0.0
