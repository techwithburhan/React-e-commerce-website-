# KIND Installation Guide (Using Release Binaries)

This guide explains how to install **KIND (Kubernetes IN Docker)** using pre-built release binaries.

---

## 📌 Prerequisites

- Docker installed
- curl installed
- sudo access (for Linux)

---

## 🔹 Install KIND on Linux

### Step 1: Download Binary

```bash
# For AMD64 / x86_64
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-amd64

# For ARM64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-linux-arm64
```

### Step 2: Make Binary Executable

```bash
chmod +x ./kind
```

### Step 3: Move Binary to PATH

```bash
sudo mv ./kind /usr/local/bin/kind
```

### Step 4: Verify Installation

```bash
kind --version
```

---

## 🔹 Install KIND on macOS

### Step 1: Download Binary

```bash
# For Intel Macs (AMD64)
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-amd64

# For Apple Silicon (M1 / ARM64)
[ $(uname -m) = arm64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.31.0/kind-darwin-arm64
```

### Step 2: Make Binary Executable

```bash
chmod +x ./kind
```

### Step 3: Move Binary to PATH

```bash
mv ./kind /usr/local/bin/kind
```

### Step 4: Verify Installation

```bash
kind --version
```

---

## ✅ Successful Installation Output Example

```
kind version 0.31.0
```

---

## 🚀 Next Steps

Create a cluster:

```bash
kind create cluster
```

Check cluster:

```bash
kubectl cluster-info --context kind-kind
```

---

## 📌 Official Release Page

Download binaries from the official KIND release page:
https://kind.sigs.k8s.io/

---

💡 Now you're ready to create local Kubernetes clusters using Docker!
