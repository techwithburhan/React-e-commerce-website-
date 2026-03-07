# KIND + Docker - Complete Setup Guide

<div align="center">

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

**A comprehensive guide to setting up Kubernetes clusters locally using KIND (Kubernetes IN Docker)**

[Installation](#-installation) • [Quick Start](#-quick-start) • [Cluster Management](#-cluster-management) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [What is KIND?](#-what-is-kind)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Docker Installation](#1-install-docker)
  - [KIND Installation](#2-install-kind)
  - [kubectl Installation](#3-install-kubectl-optional)
- [Quick Start](#-quick-start)
- [Cluster Management](#-cluster-management)
- [Multi-Node Cluster Setup](#-multi-node-cluster-setup)
- [Useful Commands](#-useful-commands)
- [Troubleshooting](#-troubleshooting)
- [Cleanup](#-cleanup)

---

## 🤔 What is KIND?

**KIND** (Kubernetes IN Docker) is a tool for running local Kubernetes clusters using Docker containers as nodes. It's perfect for:

- 🧪 Testing Kubernetes deployments locally
- 🎓 Learning Kubernetes without cloud costs
- 🚀 CI/CD pipeline testing
- 💻 Development environments

---

## 📌 Prerequisites

Before you begin, ensure you have:

- **Operating System**: Linux (Ubuntu/Debian) or macOS
- **Tools**: `curl` installed
- **Permissions**: sudo/admin access
- **Resources**: At least 4GB RAM and 2 CPU cores recommended

---

## 🔧 Installation

### 1. Install Docker

<details>
<summary><b>🐧 Linux (Ubuntu/Debian)</b></summary>

#### Update System Packages

```bash
sudo apt-get update -y
```

#### Install Docker

```bash
sudo apt-get install -y docker.io
```

#### Enable and Start Docker Service

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

#### Add Current User to Docker Group

This allows running Docker commands without `sudo`:

```bash
sudo usermod -aG docker "$USER"
```

> ⚠️ **Important**: Log out and log back in (or restart your system) for group changes to take effect.

#### Verify Docker Installation

```bash
docker --version
docker run hello-world
```

**Expected Output:**
```
Docker version 24.x.x, build xxxxx
Hello from Docker!
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

#### Install Docker Desktop

1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
2. Install the downloaded `.dmg` file
3. Launch Docker Desktop from Applications
4. Wait for Docker to start (whale icon in menu bar)

#### Verify Docker Installation

```bash
docker --version
docker run hello-world
```

**Alternative: Using Homebrew**

```bash
brew install --cask docker
```

</details>

---

### 2. Install KIND

<details>
<summary><b>🐧 Linux</b></summary>

#### Download KIND Binary

For **AMD64 / x86_64**:
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-amd64
```

For **ARM64**:
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-arm64
```

#### Make Executable and Move to PATH

```bash
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

#### Verify Installation

```bash
kind --version
```

**Expected Output:**
```
kind version 0.31.0
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

#### Download KIND Binary

For **Intel Macs**:
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-amd64
```

For **Apple Silicon (M1/M2/M3)**:
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-arm64
```

#### Make Executable and Move to PATH

```bash
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

#### Verify Installation

```bash
kind --version
```

**Alternative: Using Homebrew**

```bash
brew install kind
```

</details>

---

### 3. Install kubectl (Optional)

<details>
<summary><b>🐧 Linux</b></summary>

```bash
sudo apt-get install -y kubectl
```

Verify:
```bash
kubectl version --client
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
brew install kubectl
```

Verify:
```bash
kubectl version --client
```

</details>

---

## 🚀 Quick Start

### Create Your First Cluster

```bash
kind create cluster
```

This creates a single-node cluster named `kind` (default).

### Verify Cluster is Running

```bash
kubectl cluster-info --context kind-techwithburhan
```

**Expected Output:**
```
burhan@Burhans-MacBook-Air kubernetes % kubectl cluster-info --context kind-techwithburhan
Kubernetes control plane is running at https://127.0.0.1:61970
CoreDNS is running at https://127.0.0.1:61970/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

### Check Nodes

```bash
kubectl get nodes
```

**Expected Output:**
```
NAME                 STATUS   ROLES           AGE   VERSION
kind-control-plane   Ready    control-plane   1m    v1.31.2
```

---

## 🎯 Cluster Management

### Create Cluster with Custom Name

```bash
kind create cluster --name techwithburhan --config kind-config.yaml
```

### List All Clusters

```bash
kind get clusters
```

### Get Cluster Info

```bash
kubectl cluster-info --context kind-my-cluster
```

### Switch Between Clusters

```bash
kubectl config use-context kind-my-cluster
```

---

## 🏗️ Multi-Node Cluster Setup

For production-like environments, create a multi-node cluster with a configuration file.

### Step 1: Create Configuration File

Create a file named `kind-config.yaml`:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
  # Control Plane Node
  - role: control-plane
    image: kindest/node:v1.31.2
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP

  # Worker Nodes
  - role: worker
    image: kindest/node:v1.31.2

  - role: worker
    image: kindest/node:v1.31.2

  - role: worker
    image: kindest/node:v1.31.2
```

### Step 2: Create Cluster with Configuration

```bash
kind create cluster --config kind-config.yaml --name production-cluster
```

This creates:
- ✅ 1 Control Plane Node
- ✅ 3 Worker Nodes
- ✅ Port forwarding for HTTP (80) and HTTPS (443)

### Step 3: Verify Multi-Node Cluster

```bash
kubectl get nodes
```

**Expected Output:**
```
NAME                           STATUS   ROLES           AGE   VERSION
production-cluster-control-plane   Ready    control-plane   2m    v1.31.2
production-cluster-worker          Ready    <none>          2m    v1.31.2
production-cluster-worker2         Ready    <none>          2m    v1.31.2
production-cluster-worker3         Ready    <none>          2m    v1.31.2
```

---

## 📝 Useful Commands

### Cluster Operations

| Command | Description |
|---------|-------------|
| `kind create cluster` | Create a new cluster with default settings |
| `kind create cluster --name <name>` | Create cluster with custom name |
| `kind create cluster --config <file>` | Create cluster from config file |
| `kind get clusters` | List all KIND clusters |
| `kind delete cluster` | Delete the default cluster |
| `kind delete cluster --name <name>` | Delete specific cluster |
| `kind export kubeconfig --name <name>` | Export kubeconfig for cluster |

### Kubernetes Commands

| Command | Description |
|---------|-------------|
| `kubectl get nodes` | List all nodes in cluster |
| `kubectl get pods -A` | List all pods in all namespaces |
| `kubectl get services -A` | List all services |
| `kubectl cluster-info` | Display cluster information |
| `kubectl config get-contexts` | List all available contexts |
| `kubectl config use-context <context>` | Switch to different context |

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker ps` | List running containers (KIND nodes) |
| `docker exec -it <container> bash` | Access KIND node shell |
| `docker logs <container>` | View logs of KIND node |

---

## 🔍 Troubleshooting

### Port Already in Use

If ports 80 or 443 are already in use on Linux:

**Check what's using the port:**
```bash
sudo lsof -i :80
sudo lsof -i :443
```

**Stop conflicting service (example):**
```bash
sudo systemctl stop apache2
# or
sudo systemctl stop nginx
```

**Or modify your `kind-config.yaml` to use different ports:**
```yaml
extraPortMappings:
  - containerPort: 80
    hostPort: 8080  # Changed from 80
    protocol: TCP
```

### Docker Permission Denied

If you get permission errors running Docker:

```bash
# Add user to docker group
sudo usermod -aG docker "$USER"

# Log out and log back in, then verify
docker run hello-world
```

### Cluster Creation Hangs

If cluster creation hangs or times out:

```bash
# Delete the problematic cluster
kind delete cluster

# Restart Docker
sudo systemctl restart docker  # Linux
# or restart Docker Desktop on macOS

# Try creating cluster again
kind create cluster
```

### kubectl Command Not Found

KIND automatically configures kubectl, but if it's not working:

```bash
# Export kubeconfig manually
kind export kubeconfig --name kind

# Or specify the config path
export KUBECONFIG=~/.kube/config
```

---

## 🧹 Cleanup

### Delete Specific Cluster

```bash
kind delete cluster --name production-cluster
```

### Delete Default Cluster

```bash
kind delete cluster
```

### Delete All Clusters

```bash
kind get clusters | xargs -I {} kind delete cluster --name {}
```

### Remove Docker Containers (if needed)

```bash
docker ps -a | grep kindest | awk '{print $1}' | xargs docker rm -f
```

---

## 📚 Additional Resources

- [KIND Official Documentation](https://kind.sigs.k8s.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🤝 Contributing

Found an issue or want to improve this guide? Contributions are welcome!

---

## 📄 License

This guide is open source and available under the MIT License.

---

<div align="center">

**Made with ❤️ for the Kubernetes Community**

⭐ Star this repo if you found it helpful!

</div>
