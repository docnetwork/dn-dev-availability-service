#!groovy
@Library('scruffy-pipeline-library@master')_

node {
    // Setup
    // Checkout
    // Tests
    // Build packages
    // Push packages
    // Cleanup

    // Universal Defs
    def environment
    def version_date
    def version_full
    def npm_tag

    // Set Up Environment Based on branch name
    stage('Set Up') {
        try {
            version_date = new Date().format('YYYY.MMdd.HHmm')
            env.CODEARTIFACT_AUTH_TOKEN = sh(script: 'aws codeartifact get-authorization-token --domain dn --query authorizationToken --output text', returnStdout: true)
            switch(env.BRANCH_NAME) {
                case 'main':
                    environment = 'production'
                    npm_tag = 'latest'
                    version_full = version_date
                    break
                case ~/staging-test-.*/:
                case ~/release-.*/:
                case ~/hotfix-.*/:
                    environment = 'staging'
                    npm_tag = 'staging'
                    version_full = "${version_date}-${npm_tag}"
                    break
                default:
                    environment = 'development'
                    npm_tag = 'development'
                    version_full = "${version_date}-${npm_tag}"
                    break
            }
        } catch (e) {
            echo "Failed while setting the environment"
            throw e
        }
    }

    // Checkout package
    stage('Checkout') {
        try {
            sh 'mkdir -p package'
            dir("${env.WORKSPACE}/package") {
                checkout scm
            }
        } catch (e) {
            echo "Failed while cloning the repo"
            throw e
        }
    }

    // Restore package
    stage('Restore') {
        echo "Restoring package Version: ${version_full}"
        try {
            dir("${env.WORKSPACE}/package") {
                sh 'npm install'
            }
        } catch (e) {
            echo "Unable to restore package dependencies"
            throw e
        }
    }

    // Testing package
    stage('Testing') {
        echo "Testing package Version: ${version_full}"
        try {
            dir("${env.WORKSPACE}/package") {
                sh 'npm run test'
            }
        } catch (e) {
            echo "Testing package(s) failed"
            throw e
        }
    }

    // Publishing package
    stage('Publish') {
        echo "Publishing package Version: ${version_full}"
        try {
            dir("${env.WORKSPACE}/package") {
                // rename the .npmrc file
                sh "mv npmrc.package .npmrc"
                sh "npm version ${version_full} --no-git-tag-version"
                sh "npm publish --tag ${npm_tag}"
            }
        } catch (e) {
            echo "Publishing package(s) failed"
            throw e
        }
    }

    // Cleanup
    stage('Janitorial') {
        try {
            sh 'rm -Rf package'
        } catch (e) {
            echo "Error cleaning up the Jenkins workspace"
            throw e
        }
    }
}

