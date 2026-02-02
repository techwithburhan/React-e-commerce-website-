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

## Login Screen Enter your user ID Password 
<img width="1203" height="632" alt="Screenshot 2026-02-02 at 11 05 24 PM" src="https://github.com/user-attachments/assets/8b284d02-0510-4392-927e-1592264fdb4a" />

## Click on New Idem's
<img width="1203" height="632" alt="Screenshot 2026-02-02 at 11 07 36 PM" src="https://github.com/user-attachments/assets/5d3f435d-8c58-4bc0-9b2f-05e1a546a236" />

## Give a Name and select Pipeline
<img width="1203" height="632" alt="Screenshot 2026-02-02 at 11 11 33 PM" src="https://github.com/user-attachments/assets/0ea3b846-82a9-4c8b-ac34-6e1249360d19" />

## Give a discription about your project 
<img width="1271" height="632" alt="Screenshot 2026-02-02 at 11 18 24 PM" src="https://github.com/user-attachments/assets/5e71114b-41d3-4a52-9672-9ab2565b57a6" />

## Add Your GitHub Profile with Branch I Have use Here Backend-Code Branch for Testing 
<img width="1271" height="632" alt="Screenshot 2026-02-02 at 11 22 06 PM" src="https://github.com/user-attachments/assets/321e1ed1-fee2-4e0e-963c-6c24a974a25d" />

# 🎯 Done!

Jenkins is successfully installed and ready to use.
