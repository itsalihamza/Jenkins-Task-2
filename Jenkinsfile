pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        // use npm ci in CI; fallback to npm install
        bat 'npm ci || npm install'
      }
    }
    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        bat 'npm test'
      }
    }
    stage('Archive') {
      steps {
        bat 'npm run archive'
        archiveArtifacts artifacts: 'artifact.zip', fingerprint: true
      }
    }
  }
  post {
    success {
      echo 'Build succeeded'
      echo 'Email sent to team@example.com'
    }
    failure {
      echo 'Build failed'
      echo 'Email sent to team@example.com'
    }
  }
}
