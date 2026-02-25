# KIND + Docker Installation Guide (Linux & macOS)

This guide explains how to install:

- Docker
- KIND (Kubernetes IN Docker)
- Configure Docker for non-root user
- Create a Kubernetes cluster

---

# 📌 Prerequisites

- Linux or macOS system
- curl installed
- sudo access (Linux)

---

# 🐳 Install Docker (Linux - Ubuntu/Debian)

## Step 1: Update System

```bash
sudo apt-get update -y
```

## Step 2: Install Docker

```bash
sudo apt-get install -y docker.io
```

## Step 3: Enable & Start Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

## Step 4: Add Current User to Docker Group

```bash
echo "👤 Adding current user to docker group..."
sudo usermod -aG docker "$USER"
```

⚠️ Important:  
Logout and login again (or restart system) to apply group changes.

## Step 5: Verify Docker Installation

```bash
docker --version
docker run hello-world
```

---

# ☸️ Install KIND (Linux)

## Step 1: Download Binary

```bash
# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-amd64

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-arm64
```

## Step 2: Make Executable

```bash
chmod +x ./kind
```

## Step 3: Move to PATH

```bash
sudo mv ./kind /usr/local/bin/kind
```

## Step 4: Verify Installation

```bash
kind --version
```

---

# 🍏 Install KIND (macOS)

## Step 1: Download Binary

```bash
# For Intel Macs
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-amd64

# For Apple Silicon (M1 / ARM)
[ $(uname -m) = arm64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-arm64
```

## Step 2: Make Executable

```bash
chmod +x ./kind
```

## Step 3: Move to PATH

```bash
mv ./kind /usr/local/bin/kind
```

## Step 4: Verify

```bash
kind --version
```

---

# 🚀 Create Kubernetes Cluster

```bash
kind create cluster
```

Check cluster info:

```bash
kubectl cluster-info --context kind-kind
```

---

# 📌 Optional: Install kubectl (Linux)

```bash
sudo apt-get install -y kubectl
```

Verify:

```bash
kubectl version --client
```

---

# ✅ Expected Output Example

```
kind version 0.31.0
Docker version 24.x.x
```

---

# 🎯 You're Ready!

You now have:

- Docker Installed
- KIND Installed
- Kubernetes Cluster Running

Happy Kubernetes Learning 🚀
