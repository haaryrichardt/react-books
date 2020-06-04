pipeline {
    agent any
    tools {nodejs "nodejs"}
    
    stages {
    stage('Install Node Modules') {
            steps {
                sh 'npm install'
            }
        }
        stage('Notify'){
            steps{
               slackSend channel: '#react101', message: "${env.JOB_NAME}, #${env.BUILD_NUMBER} started"
            }
        }
          stage('Build') {
            steps {
                sh 'npm run build'  
            }
        }
        
        stage('Test'){
            steps{
                sh 'npm run test'
            }
        }
         stage('Sonar Analysis'){
            steps
            {
                script 
                {
             scannerHome = tool 'sonarScanner';
                }
                withSonarQubeEnv('SonarQube')
                {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
             }
         }
       stage('Quality Gate'){
            steps
            {
                   timeout(time: 5, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline:false
                }
            }
        }
       stage('Artifact Upload'){
            steps{
               sh 'zip -r build$BUILD_NUMBER.zip build/'
               withCredentials([usernamePassword(credentialsId:'Nexus_Credentials',usernameVariable:'username',passwordVariable:'password')]){
                   sh 'curl -v -u $username:$password --upload-file build$BUILD_NUMBER.zip http://18.224.155.110:8081/nexus/content/repositories/devopstraining/hexagon6/'
               }
                sh 'rm -r build$BUILD_NUMBER.zip'
            }
        }  
      stage('Deploy to Ansible'){
            steps{
                sh 'scp -i /var/lib/jenkins/.ssh/id_rsa -r /var/lib/jenkins/workspace/react-pipeline/build/ ansadmin@172.31.31.91:react'
                sh 'ssh -t -t -i /var/lib/jenkins/.ssh/id_rsa ansadmin@172.31.31.91 "ansible-playbook /opt/playbooks/playfile.yml"'
            }
        }
    }
        post{
            success{
                slackSend channel: '#react101', message: "BUILD SUCCESS"
            }
            failure{
                slackSend channel: '#react101', message: "BUILD FAILURE"
            }
        }
}
