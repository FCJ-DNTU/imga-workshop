# FCJ Workshop - imga

The workshop of @NguyenAnhTuan1912, around a "extract content of table in image to excel" application.

## Architecture

![architecture](/static/images/1-introduction/architecture.png)

## Deployment Strategy

![deployment_strategy](/static/images/2-preparation/deployment_strategy.png)

## Outline

- Introduction
  - What is API Gateway?
  - What is Network Load Balancer?
  - What is CloudFront and S3?
- Preparation
  - Setup VPC
  - Setup VPC Peering
  - Setup security groups
  - Create IAM Role
  - Launch 2 EC2 instances
  - Attac IAM Roles and configure EC2 Metadata Access
  - Setup NAT Gateway
  - Auto installation
- Setup project
  - Folk example repository
  - Install Docker and Git
- Create S3 Buckets
  - Store static files
  - Store images from users
- Host Web server
  - Create Network Load Balancer
  - Create API Gateway
  - Create Private Integration
  - Create ECR Repository
  - Push docker image to ECR
  - Deploy web server
- Host Web Application
  - Create CloudFront and Distribution
  - Create resource-based policy
  - Deploy web application
- Test result
- Clean up resources
