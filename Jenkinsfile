pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
    /* stage('Install Node Modules') {
            steps {
                sh 'npm install'
            }
        }*/
        stage('Notify'){
            steps{
               slackSend channel: '#devops', message: "${env.JOB_NAME}, #${env.BUILD_NUMBER} started"
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
                   timeout(time: 1, unit: 'MINUTE'){
                    waitForQualityGate abortPipeline:false
                }
            }
        }
        stage('Artifact Upload'){
            steps{
               sh 'cd /var/lib/jenkins/workspace/React_Pipeline/'
               sh 'zip -r $BUILD_NUMBER.zip build/'
               withCredentials([usernamePassword(credentialsId:'Nexus_Credentials',usernameVariable:'username',passwordVariable:'password')]){
               sh 'curl -v -u $username:$password --upload-file $BUILD_NUMBER.zip http://18.224.155.110:8081/nexus/content/repositories/devopstraining/hexagon6/'
                }
            }
        }  
       stage('Deploy to Ansible'){
            steps{
                sh 'scp -i /var/lib/jenkins/.ssh/id_rsa -r /var/lib/jenkins/workspace/react-pipeline/build/ ansadmin@172.31.47.165:/react'
                sh 'ssh -t -t -i /var/lib/jenkins/.ssh/id_rsa ansadmin@172.31.47.165 "ansible-playbook /opt/playbooks/playfile.yml"'
            }
        }
    }
        post{
            success{
                slackSend channel: '#devops', message: "BUILD SUCCESS"
            }
            failure{
                slackSend channel: '#devops', message: "BUILD FAILURE"
            }
        }
}
