# 🚀 Jenkins Installation Guide (Ubuntu/Debian)

This guide explains how to install and start Jenkins CI/CD server using apt.

Jenkins is used for:
- Build automation
- CI/CD pipelines
- Job scheduling

---

# 📌 Prerequisites

- Ubuntu/Debian server
- sudo access
- Internet connection

---

# Step 1 – Update System
```bash
sudo apt update
```
---

# Step 2 – Install Java (Required)

Jenkins requires Java to run.
```bash
sudo apt install -y fontconfig openjdk-21-jre
```
Verify installation: 
```bash 
java -version
```
---

# Step 3 – Add Jenkins Repository Key
```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
```
---

# Step 4 – Add Jenkins Repository
```bash
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list
```
---

# Step 5 – Update Packages Again
```bash
sudo apt update
```
---

# Step 6 – Install Jenkins
```bash
sudo apt install -y jenkins
```
---

# Step 7 – Start Jenkins Service

Enable auto-start:
```bash
sudo systemctl enable jenkins
```
Start service:
```bash
sudo systemctl start jenkins
```
Check status:
```bash
sudo systemctl status jenkins
```
If running, you should see:
active (running)

---

# Step 8 – Get Initial Admin Password
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
Copy this password.

---

# Step 9 – Access Jenkins in Browser

Open:
```bash
http://localhost:8080
```
OR
```bash
http://<server-ip>:8080
```
Paste password → Install suggested plugins → Create admin user.

---

# ✅ Useful Commands

Restart Jenkins:
```bash
sudo systemctl restart jenkins
```
Stop Jenkins:
```bash
sudo systemctl stop jenkins
```
Check status:
```bash
sudo systemctl status jenkins
```
View logs:
```bash
sudo journalctl -u jenkins -f
```
---
## Access from Here 
<img width="639" height="272" alt="Screenshot 2026-02-02 at 9 02 03 PM" src="https://github.com/user-attachments/assets/7733cee9-4048-4983-9167-0420b7aea26b" />

## Password 
<img width="918" height="272" alt="Screenshot 2026-02-02 at 9 02 34 PM" src="https://github.com/user-attachments/assets/def086f5-96d0-42a8-8488-443807397535" />

# 🎯 Done!

Jenkins is successfully installed and ready to use.
