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

sudo apt install -y fontconfig openjdk-21-jre

Verify installation:
java -version

---

# Step 3 – Add Jenkins Repository Key

sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

---

# Step 4 – Add Jenkins Repository

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list

---

# Step 5 – Update Packages Again

sudo apt update

---

# Step 6 – Install Jenkins

sudo apt install -y jenkins

---

# Step 7 – Start Jenkins Service

Enable auto-start:
sudo systemctl enable jenkins

Start service:
sudo systemctl start jenkins

Check status:
sudo systemctl status jenkins

If running, you should see:
active (running)

---

# Step 8 – Get Initial Admin Password

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

Copy this password.

---

# Step 9 – Access Jenkins in Browser

Open:

http://localhost:8080

OR

http://<server-ip>:8080

Paste password → Install suggested plugins → Create admin user.

---

# ✅ Useful Commands

Restart Jenkins:
sudo systemctl restart jenkins

Stop Jenkins:
sudo systemctl stop jenkins

Check status:
sudo systemctl status jenkins

View logs:
sudo journalctl -u jenkins -f

---

# 🎯 Done!

Jenkins is successfully installed and ready to use.
