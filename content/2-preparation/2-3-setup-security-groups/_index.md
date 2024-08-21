+++
title = "Setup security groups"
date = 2024
weight = 3
chapter = false
pre = "2.3. "
+++

#### Security Setup
Next, we need to secure the EC2 instances in both environments. First, let's create security groups for the EC2 instance in the development environment.
  - In the `Security` section of the **VPC** console
  - Select **Security groups**
  - Click **Create security group**

**INSERT IMAGE HERE**

We will enter the following settings for the security group of the EC2 instance in the development environment:
  - Name: `dev-ec2-s`
  - Description: `Allow SSH and other private connections`
  - VPC: select `development-vpc`
  - In this example, we will restrict SSH access to the EC2 instance in the development environment. In Inbound Rules, add a rule:
    - Type: **SSH**
    - Source: **My IP**

**INSERT IMAGE HERE**

Next, create a security group for the EC2 instance in the production environment:
  - Name: `prod-ec2-s`
  - Description: `Allow SSH and other private connections`
  - VPC: select `production-vpc`
  - For now, only allow SSH access from devices in the `10.1.0.0/16` network (which is the **development-vpc** network):
    - Type: **SSH**
    - Source: **My IP**

**INSERT IMAGE HERE**

Once created, we now have the two desired security groups.

**INSERT IMAGE HERE**