pipeline {
    agent any

    tools {
        nodejs 'nodejs' 
    }

    environment {
        AWS_DEFAULT_REGION = 'ap-southeast-2'       // AWS 리전
        S3_BUCKET = 'kitchana-fe-bucket'            // S3 버킷 이름
        CLOUDFRONT_ID = 'E396PRZDBR70A6'            // CloudFront 배포 ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/InspireCampTeam3/Kitcha-FE.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials-id' // Jenkins에 등록된 AWS 자격증명 ID
                ]]) {
                    sh '''
                        echo "Uploading to S3..."
                        aws s3 sync dist/ s3://$S3_BUCKET --delete

                        echo "Invalidating CloudFront cache..."
                        aws cloudfront create-invalidation \
                          --distribution-id $CLOUDFRONT_ID \
                          --paths "/*"
                    '''
                }
            }
        }
    }
}
