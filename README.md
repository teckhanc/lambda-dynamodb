# Lambda-DynamoDB Service Deployment

This project demonstrates the deployment of an AWS Lambda service integrated with DynamoDB using the Serverless Framework, GitHub Actions for CI/CD, and AWS resources such as IAM, S3, and CloudFormation. The service includes Lambda functions for creating and retrieving users from a DynamoDB table.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Permissions](#permissions)
- [License](#license)

## Prerequisites

Before deploying this project, ensure you have the following prerequisites set up:

1. **AWS Account**: An active AWS account with access to IAM, S3, Lambda, DynamoDB, and CloudFormation services.
2. **IAM Role**: Create an IAM role (`github-actions-deployer-role`) with the necessary permissions as outlined in the [Permissions](#permissions) section below.
3. **S3 Bucket**: If specifying a custom deployment bucket in the `serverless.yml`, ensure the bucket is created manually in the AWS S3 console.
4. **Serverless Framework**: Install the Serverless Framework on your local machine:
   ```bash
   npm install -g serverless@3
5. **GitHub Repository**: Set up a GitHub repository for the project with GitHub Actions enabled.

## Project Structure

```plaintext
.
├── README.md
├── serverless.yml               # Serverless configuration file
├── handler.js                   # Lambda function handlers
├── package.json                 # Project dependencies
└── .github
    └── workflows
        └── deploy.yml           # GitHub Actions workflow for CI/CD
```

## Setup

1. **Clone the Repository**:
   - Clone the project repository from GitHub to your local machine:
     ```bash
     git clone https://github.com/your-username/lambda-dynamodb.git
     cd lambda-dynamodb
     ```

2. **Install Dependencies**:
   - Install the required dependencies using npm:
     ```bash
     npm install
     ```

3. **Configure `serverless.yml`**:
   - Update the `serverless.yml` file with the appropriate configurations:
     - Set the AWS `region` where the resources will be deployed (e.g., `ap-southeast-2` for Sydney).
     - Specify the `deploymentBucket` if using a custom S3 bucket. Ensure that the bucket exists in the specified region.
     - Adjust other configurations, such as environment variables, resource names, or parameters, as necessary for your setup.

4. **Set Up AWS Credentials for GitHub Actions**:
   - Go to your GitHub repository settings:
     - Navigate to **Settings > Secrets and variables > Actions**.
     - Add the following secrets:
       - `AWS_ROLE_ARN`: The ARN of your deployer role (`github-actions-deployer-role`).
       - Ensure the IAM role has the necessary permissions as described in the [Permissions](#permissions) section.

5. **Verify GitHub Actions Workflow**:
   - Check the `.github/workflows/deploy.yml` file to ensure it is set up correctly to deploy your service on pushes to the `master` branch or through manual triggers.
   - The workflow should include steps to:
     - Check out the code.
     - Set up Node.js.
     - Install dependencies.
     - Configure AWS credentials using the provided secrets.
     - Deploy the service using the Serverless Framework.

6. **Run Initial Deployment**:
   - Deploy the service either manually from your local environment using the Serverless Framework:
     ```bash
     serverless deploy --verbose
     ```
   - Or, trigger the deployment via GitHub Actions by pushing changes to the repository or manually running the workflow from the Actions tab.

## Deployment

Deploying the service can be done via GitHub Actions or manually using the Serverless Framework CLI.

### Deploy via GitHub Actions

1. **Configure AWS Credentials**: Set up AWS credentials using OpenID Connect (OIDC) in your GitHub repository settings:
   - Go to **Settings > Secrets and variables > Actions**.
   - Add `AWS_ROLE_ARN` with the ARN of your deployer role (`github-actions-deployer-role`).

2. **Trigger Deployment**:
   - Push changes to the `master` branch, or manually trigger the workflow via the GitHub Actions tab in your repository.

### Deploy Manually

1. **Deploy Using Serverless Framework**:
   - From your local environment, run the following command to deploy the service:
     ```bash
     serverless deploy --verbose
     ```
   - The `--verbose` flag provides detailed output during the deployment, which can help with troubleshooting any issues that arise.

## Troubleshooting

- **`ROLLBACK_COMPLETE` Stack State**: If the stack is in the `ROLLBACK_COMPLETE` state, delete the stack via the AWS CloudFormation console and re-deploy using the Serverless Framework. This state usually occurs when a deployment fails and AWS CloudFormation rolls back all changes.
  
- **Permissions Errors**: If you encounter permissions-related errors (e.g., `Access Denied`), ensure that the IAM role (`github-actions-deployer-role`) used by GitHub Actions has the necessary permissions as outlined in the [Permissions](#permissions) section below.

- **S3 Bucket Issues**: If using a custom S3 bucket for deployment, verify that the bucket exists and that the name and region match the configuration in your `serverless.yml` file. Ensure that your IAM role has the necessary S3 permissions to interact with the bucket.

- **IAM Role Errors**: If errors occur related to IAM role creation, such as `iam:CreateRole` not being permitted, check that the role has the correct permissions to create and manage IAM resources.

## Permissions

To deploy this service, the IAM role (`github-actions-deployer-role`) used by GitHub Actions must have the following AWS managed policies attached:

1. **`AmazonAPIGatewayAdministrator`**: Provides full access to manage API Gateway resources, necessary for deploying and managing REST APIs.
   
2. **`AmazonDynamoDBFullAccess`**: Grants full access to DynamoDB, including creating, reading, writing, and managing tables and items, which are essential for this service.

3. **`AmazonS3FullAccess`**: Provides full access to S3, including creating and managing buckets and objects, which are required if using S3 for deployment or data storage.

4. **`AWSCloudFormationFullAccess`**: Grants full access to manage CloudFormation stacks, enabling the creation, update, and deletion of resources defined in your `serverless.yml`.

5. **`AWSLambda_FullAccess`**: Allows full access to AWS Lambda, including creating, updating, and managing Lambda functions and related resources such as triggers and execution roles.

6. **`CloudWatchFullAccessV2`**: Provides full access to CloudWatch services, including Logs, Metrics, and Alarms, which are used for monitoring and logging Lambda function executions.

7. **`IAMFullAccess`**: Grants full access to manage IAM resources, necessary for creating and managing Lambda execution roles and permissions.

8. **`ResourceGroupsandTagEditorFullAccess`**: Provides full access to manage tags on AWS resources, enabling tagging operations on IAM roles, Lambda functions, and other AWS resources.

### Attaching Managed Policies

1. Go to the [AWS IAM Console](https://console.aws.amazon.com/iam/).
2. Select **Roles** from the sidebar.
3. Find and click on the `github-actions-deployer-role`.
4. Click **Attach policies**.
5. Search for and attach the required managed policies listed above:
   - `AmazonAPIGatewayAdministrator`
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
   - `AWSCloudFormationFullAccess`
   - `AWSLambda_FullAccess`
   - `CloudWatchFullAccessV2`
   - `IAMFullAccess`
   - `ResourceGroupsandTagEditorFullAccess`
6. Confirm by clicking **Attach policy**.

Ensure that the role has these permissions to perform all necessary actions required by the Serverless Framework during deployment. Regularly review and audit these permissions to maintain security best practices.
