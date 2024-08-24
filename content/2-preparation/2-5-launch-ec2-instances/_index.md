+++
title = "Launch 2 EC2 Instances"
date = 2024
weight = 5
chapter = false
pre = "2.5. "
+++

#### Create and launch EC2 instances in the development environment

On the homepage:

- Search for `EC2`
- Select **EC2**

![2-image](/images/2-preparation/2-5-1-search-ec2.png)

On the EC2 page, click **Launch instance**

![2-image](/images/2-preparation/2-5-2-setup-to-launch-dev-ec2.png)

In the setup section, we will configure the following information as shown in the image:

- Name: `dev-ec2`
- Application and OS Images: **Amazon Linux 2023 AMI**
- Instance type: **t2.micro**
- Select a key pair if you already have one. If not, create one as follows:
  - Select **Create new key pair**
  - **Name**: `my-key`
  - **Type**: `RSA`
  - **Private key file**: `.pem`
  - Click **Create key pair**

![2-image](/images/2-preparation/2-5-3-setup-dev-ec2-info-1.png)
![2-image](/images/2-preparation/2-5-4-setup-dev-ec2-info-2.png)

In the **Network settings** section, click **Edit**:

- VPC: **development-vpc**
- Subnet: choose the public subnet
- Auto-assign public IP: Enable
- Firewall:
  - Select **Select existing security group**
  - Choose the SG **dev-ec2-sg** we created earlier
- Finally, click **Launch instance**

![2-image](/images/2-preparation/2-5-5-setup-and-launch-dev-ec2.png)

#### Create and launch EC2 instances in the production environment

In the setup section, configure the following details as shown in the image:

- Name: `prod-ec2`
- Application and OS Images: **Amazon Linux 2023 AMI**
- Instance type: **t3.small**
- Select a key pair if you already have one. If not, create one as follows:
  - Select **Create new key pair**
  - **Name**: `my-key`
  - **Type**: `RSA`
  - **Private key file**: `.pem`
  - Click **Create key pair**

![2-image](/images/2-preparation/2-5-6-setup-to-launch-imga-server.png)
![2-image](/images/2-preparation/2-5-7-setup-imga-server-info-1.png)

In the **Network settings** section, click **Edit**:

- VPC: **production-vpc**
- Subnet: choose the private subnet
- Auto-assign public IP: Disable
- Firewall:
  - Select **Select existing security group**
  - Choose the SG **prod-ec2-sg** we created earlier
- Finally, click **Launch instance**

![2-image](/images/2-preparation/2-5-8-setup-and-launch-imga-server.png)

Lastly, I will check if both EC2 instances are running.

![2-image](/images/2-preparation/2-5-9-check.png)
