# 🚀 Jenkins Installation Guide (Ubuntu/Debian)

This guide shows how to install and run Jenkins CI/CD server using apt.

Jenkins is an automation tool used for:
- CI/CD pipelines
- Terraform deployments
- Docker builds
- AWS automation

---

# 📌 Prerequisites

- Ubuntu/Debian server
- sudo access
- Internet connection
- Git installed

Install git (if missing):
sudo apt install -y git

---

# Step 1 – Update System

sudo apt update

---

# Step 2 – Install Java (Required for Jenkins)

Jenkins requires Java.

sudo apt install -y fontconfig openjdk-21-jre

Verify:
java -version

---

# Step 3 – Add Jenkins Repository Key

sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

---

# Step 4 – Add Jenkins Repository

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list

---

# Step 5 – Update Again

sudo apt update

---

# Step 6 – Install Jenkins

sudo apt install -y jenkins

---

# Step 7 – Start Jenkins Service

Enable on boot:
sudo systemctl enable jenkins

Start now:
sudo systemctl start jenkins

Check status:
sudo systemctl status jenkins

If running → you will see:
active (running)

---

# Step 8 – Get Initial Admin Password

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

Copy this password.

---

# Step 9 – Open Jenkins in Browser

Open:

http://localhost:8080

OR

http://<your-server-ip>:8080

Paste the password → Install suggested plugins → Create admin user.

---

# Step 10 – Clone Your Backend Branch Code

Clone only backend-code branch:

git clone -b backend-code --single-branch https://github.com/techwithburhan/React-e-commerce-website-.git

Your project will be located at:

~/React-e-commerce-website-

---

# Step 11 – Install Terraform (Optional for DevOps)

sudo apt install -y unzip
wget https://releases.hashicorp.com/terraform/1.6.6/terraform_1.6.6_linux_amd64.zip
unzip terraform_1.6.6_linux_amd64.zip
sudo mv terraform /usr/local/bin/

Verify:
terraform version

---

# Step 12 – Install AWS CLI (Optional)

sudo apt install -y awscli

Verify:
aws --version

---

# ✅ Jenkins Pipeline Ready

Now you can:
- Create Pipeline job
- Add Jenkinsfile
- Run terraform init/plan/apply
- Automate AWS deployments

---

# ✅ Useful Commands

Restart Jenkins:
sudo systemctl restart jenkins

Stop Jenkins:
sudo systemctl stop jenkins

Logs:
sudo journalctl -u jenkins -f

---

# 🎯 Done!

Jenkins is installed and re

