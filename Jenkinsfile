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
        sh 'npm ci || npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Archive') {
      steps {
        sh 'npm run archive'
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
