<img width="964" height="677" alt="Screenshot 2026-02-22 at 1 28 17 AM" src="https://github.com/user-attachments/assets/ef332d4b-2137-4035-a866-2bb6bcddd005" /># 🚀 Jenkins Installation Guide (Ubuntu/Debian)

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

## Enable for CICD GitHub hook trigger for GITScm polling
<img width="1208" height="314" alt="Screenshot 2026-02-02 at 11 24 35 PM" src="https://github.com/user-attachments/assets/e3b7bfac-6a37-4428-ba78-45c20bc57f53" />

## Pipeline Code Groovy
<img width="1597" height="669" alt="Screenshot 2026-02-21 at 12 57 12 PM" src="https://github.com/user-attachments/assets/96a4e872-4917-4fcf-8596-7fca94ee31a5" />

## Need to added docker credentials create from docker hub 
<img width="1440" height="669" alt="Screenshot 2026-02-21 at 1 00 16 PM" src="https://github.com/user-attachments/assets/634aeb3e-5fb0-4720-8c62-f0347f8e3f06" />
<img width="1440" height="669" alt="Screenshot 2026-02-21 at 1 01 38 PM" src="https://github.com/user-attachments/assets/1c57f976-c718-4e45-bbe8-94a853c827ce" />


## Code Groovy
```shell
pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        FRONTEND_IMAGE = "burhan503/furnistyle-frontend"
        BACKEND_IMAGE  = "burhan503/furnistyle-backend"
        VERSION        = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git url: "https://github.com/techwithburhan/React-e-commerce-website-.git",
                    branch: "backend-code"
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('FurniStyle-FrontEnd') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${VERSION} ."
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('furnistyle-backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${VERSION} ."
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerCred',
                    passwordVariable: 'dockerHubPass',
                    usernameVariable: 'dockerHubUser')]) {

                    sh '''
                        echo $dockerHubPass | docker login -u $dockerHubUser --password-stdin
                    '''

                    sh "docker push ${FRONTEND_IMAGE}:${VERSION}"
                    sh "docker push ${BACKEND_IMAGE}:${VERSION}"
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    export VERSION=${VERSION}
                    docker compose down
                    docker compose up -d
                '''
            }
        }

        // ✅ WAIT FOR MONGO TO BE READY
        stage('Wait for MongoDB') {
            steps {
                sh '''
                    echo "Waiting for MongoDB..."

                    until docker exec furnistyle-mongo mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
                        echo "Mongo not ready..."
                        sleep 5
                    done

                    echo "MongoDB Ready!"
                '''
            }
        }

        // ✅ YOUR EXACT COMMAND IMPLEMENTED
        stage('Import Mongo Data') {
            steps {
                dir('mongo-init') {
                    sh '''
                        echo "Importing Products Data..."

                        docker exec -i furnistyle-mongo mongoimport \
                          --db furnistyle \
                          --collection products \
                          --jsonArray \
                          --drop < furnistyle.products.json

                        echo "Import Completed!"
                    '''
                }
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment + Mongo Import Successful!"
        }
        failure {
            echo "❌ Pipeline Failed!"
        }
    }
}
```
# 🎯 Done!

## Jenkins is successfully installed and ready to use.

<img width="1705" height="832" alt="Jenkins Setup Screenshot" src="https://github.com/user-attachments/assets/7eb9513c-4c0c-4941-9f76-5d44a97ff62b" />

---

## 📚 Implementing Shared Libraries

### 🔹 Step 1: Create a New Repository

- Create a new Git repository (e.g., `jenkins-shared-library`)
- Create a folder named `vars`

<img width="941" height="677" alt="Create Vars Folder" src="https://github.com/user-attachments/assets/f9d49354-0186-4109-a4bf-3106f23bc5b4" />

Repository Structure:

```
jenkins-shared-library/
│
├── vars/
│   └── demo.groovy
│
└── README.md
```

---

### 🔹 Step 2: Create a Demo File

Create a file inside `vars` folder:

**File:** `vars/demo.groovy`

```groovy
def call() {
    echo "Hello from Shared Library!"
}
```

<img width="964" height="677" alt="Demo File Screenshot" src="https://github.com/user-attachments/assets/bfedfc7b-47ae-424e-8388-f4e8e3792443" />

🔗 How to Connect with Jenkins
1. Open Jenkins
2. Go to **Manage Jenkins**
3. Click on **System**
4. Scroll down to **Global Trusted Pipeline Libraries**

Add the following details:

- **Name:** shared-library
- **Default Version:** main
- ✔️ Allow default version to be overridden
- ✔️ Load implicitly
- **Retrieval Method:** Modern SCM
- **SCM:** Git
- **Repository URL:**  
  `https://github.com/your-username/jenkins-shared-library.git`

Click **Save**.

<img width="1089" height="772" alt="image" src="https://github.com/user-attachments/assets/dce6a4c9-0ae1-4a22-9308-8b654b017721" />

---

## 🧪 Using Shared Library in Jenkinsfile

```groovy
@Library('Shared') _

pipeline {
    agent any

    stages {
        stage('Test Shared Library') {
            steps {
                script{
                    hello()
                }
            }
        }
    }
}

```
<img width="1543" height="772" alt="image" src="https://github.com/user-attachments/assets/c5957518-dd54-47fc-8cd9-8e3427fe4edb" />

---

# ✅ Output

When pipeline runs, it will print:

```
Hello from Shared Library!
```
