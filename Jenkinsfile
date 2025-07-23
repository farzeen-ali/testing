pipeline {
    agent any

    environment {
        CONTAINER_NAME = "nestjs-app"
        IMAGE_NAME = "nestjs-image"
        EMAIL = "techzeen10@gmail.com"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/farzeen-ali/testing'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop & Remove Previous Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }

        stage('Send Email Notification') {
            steps {
                emailext (
                    subject: "✅ NestJS App Deployed Successfully on EC2",
                    body: "NestJS app is running on EC2 at: http://<your-ec2-ip>:3000",
                    to: "${EMAIL}"
                )
            }
        }
    }
}
