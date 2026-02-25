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

Here is your clean and professional **README.md** file 👇 (GitHub ready)

---

```markdown
# 2️⃣ Setting Up the KIND Cluster

This guide explains how to create a multi-node Kubernetes cluster using **KIND (Kubernetes IN Docker)**.

---

## 📄 Step 1: Create `kind-config.yaml`

Create a file named:

```

kind-config.yaml

````

Add the following configuration:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
  - role: control-plane
    image: kindest/node:v1.31.2
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP

  - role: worker
    image: kindest/node:v1.31.2

  - role: worker
    image: kindest/node:v1.31.2

  - role: worker
    image: kindest/node:v1.31.2
````

---

## 🚀 Step 2: Create the Cluster

Run the following command:

```bash
kind create cluster --config kind-config.yaml
```

This will create:

* 1 Control Plane Node
* 3 Worker Nodes

---

## 🔍 Step 3: Verify the Cluster

```bash
kubectl get nodes
```

### ✅ Expected Output

You should see:

* 1 control-plane
* 3 worker nodes

Example:

```
NAME                 STATUS   ROLES           AGE   VERSION
kind-control-plane   Ready    control-plane   1m    v1.31.2
kind-worker          Ready    <none>          1m    v1.31.2
kind-worker2         Ready    <none>          1m    v1.31.2
kind-worker3         Ready    <none>          1m    v1.31.2
```

---

## 💡 Important Note (Port Conflict Warning)

If you are using Linux and port **80 or 443** is already in use (for example by Apache or Nginx), you may get a port binding error.

To check if port 80 is already in use:

```bash
sudo lsof -i :80
```

If it is in use, either:

* Stop the running service
* Or change `hostPort` in the configuration file

Example alternative:

```yaml
hostPort: 8080
```

---

## 🎯 Cluster Details

* Kubernetes Version: `v1.31.2`
* Control Plane: 1
* Worker Nodes: 3
* Ports Exposed: 80 (HTTP), 443 (HTTPS)

---

## 🧹 Delete Cluster (Optional)

If you want to remove the cluster:

```bash
kind delete cluster
```

---

You now have a fully functional multi-node Kubernetes cluster running locally using KIND 🚀

```

---

If you want, I can also:

- 🔥 Add NGINX Ingress setup steps  
- 🔥 Add sample 3-tier app deployment  
- 🔥 Convert this into a complete project-level README for GitHub  
- 🔥 Add architecture diagram section  

Tell me what you want next, Burhan 😎
```

