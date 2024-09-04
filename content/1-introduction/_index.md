+++
title = "Introduction"
date = 2024
weight = 1
chapter = false
pre = "1. "
+++

#### Overview

In this workshop, we will deploy an application with the goal of helping users convert table data from images into an Excel file. The application is divided into two main parts:

- **FrontEnd**: This is the user-facing application where users will submit their conversion requests.
- **BackEnd**: The backend consists of two smaller components:
  - **Web server**: The web server acts as a middleware, receiving user requests and executing scripts in the Python program to perform the target functionality. Once the Python program returns the result, the web server sends the response back to the user.
  - **Python program**: This component is responsible for executing the core functionality of the application. After processing, it returns the result to the web server, which then handles the rest.

That's a brief introduction to our application. In the next section, I will explain in more detail. In this workshop, we will use AWS services and deploy everything in the cloud, integrating with GitHub for source management.

Here’s the full architecture of our infrastructure:
![architecture](/images/1-introduction/architecture.png)

#### Infrastructure Explanation

In this workshop, you'll notice we have two separate VPCs: one for the production environment and another for the development environment. Each VPC has a distinct role.

- **Development VPC**: This VPC is where the development team will work on tasks such as training and testing new algorithms. It’s similar to an on-premise environment where the team works together in one physical space.
  - In theory, this VPC will also include a Python module to test new algorithms in the application. In this case, the VPC will need to connect to an S3 bucket responsible for storing images uploaded by users.
  - Although the development VPC is more "open" compared to the production VPC, it doesn't mean that everyone can access it. In this workshop, we will open it to the internet but restrict access using Security Groups. In practice, we would also need NACLs and a VPN connection to ensure security for the team's and system's communications.
- **Production VPC**: This VPC is only accessible by a limited number of people, mostly those handling deployment and operations. It’s where the backend of the application will process tasks.

In this workshop, we will deploy the infrastructure and services, which will allow us to learn:

- How to set up a basic infrastructure to deploy an application.
- How to use GitHub Actions along with Gitflow.
- How to integrate API Gateway with a VPC using VPC Link.
- How to deploy a private backend that the web application can communicate with through API Gateway.
- How to deploy a static website or even an SPA (Single Page Application) using S3 and CloudFront.
- Basic usage of ECR as a Docker Image Registry.
- Deploying an application with Docker.
- Understanding bash scripts as well as Docker (this requires careful reading in the following sections).

This will help us gain a deeper understanding of AWS services.
