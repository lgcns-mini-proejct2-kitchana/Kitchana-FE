pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-southeast-2'  // 너가 쓰는 리전
        S3_BUCKET = 'kitchana-fe-bucket'      // 실제 버킷 이름으로 교체
        CLOUDFRONT_ID = 'E396PRZDBR70A6'   // 실제 CloudFront 배포 ID로 교체
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
                    credentialsId: 'aws-credentials-id' // Jenkins에 등록한 AWS 키 ID
                ]]) {
                    sh '''
                        echo "Uploading to S3..."
                        aws s3 sync build/ s3://$S3_BUCKET --delete

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
