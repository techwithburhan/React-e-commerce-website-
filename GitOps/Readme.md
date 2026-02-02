# Jenkins Installation Guide (Ubuntu/Debian)

This guide explains how to install and start Jenkins on Ubuntu/Debian Linux.

---

## 📌 Prerequisites
- Ubuntu/Debian server
- sudo access
- Internet connection

---

## Step 1 – Update packages
sudo apt update

---

## Step 2 – Install Java (Required for Jenkins)
sudo apt install fontconfig openjdk-21-jre

Check version:
java -version

---

## Step 3 – Add Jenkins Repository Key
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

---

## Step 4 – Add Jenkins Repository
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

---

## Step 5 – Update again
sudo apt update

---

## Step 6 – Install Jenkins
sudo apt install jenkins

---

## Step 7 – Enable & Start Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

Check status:
sudo systemctl status jenkins

---

## Step 8 – Get Initial Admin Password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

Copy this password and paste it into the browser during first login.

---

## Step 9 – Access Jenkins in Browser
Open:
http://<your-server-ip>:8080

Example:
http://localhost:8080

---

## ✅ Done!
Jenkins is now installed and running successfully.
