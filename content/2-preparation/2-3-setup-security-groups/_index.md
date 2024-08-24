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

![2-image](/images/2-preparation/2-3-1-sg-page.png)

We will enter the following settings for the security group of the EC2 instance in the development environment:

- Name: `dev-ec2-sg`
- Description: `Allow SSH and other private connections`
- VPC: select `development-vpc`
- In this example, we will restrict SSH access to the EC2 instance in the development environment. In Inbound Rules, add a rule:
  - Type: **SSH**
  - Source: **My IP**

![2-image](/images/2-preparation/2-3-2-edit-dev-ec2-inbound-rule.png)

Next, create a security group for the EC2 instance in the production environment:

- Name: `prod-ec2-sg`
- Description: `Allow SSH and other private connections`
- VPC: select `production-vpc`
- Inbound rules:
  - Protocol: **SSH**; Port range: **22**; Source: `10.1.0.0/16` (Dev VCP)
  - Protocol: **TCP**; Port range: **80**; Source: Anywhere IPv4 (0.0.0.0/0). Source should be from `imga-nlb-sg` in below

![2-image](/images/2-preparation/2-3-3-edit-prod-ec2-inbound-rule.png)

{{% notice note %}}
In image, I forget to add the second Inbound Rule :D
{{% /notice %}}

Once created, we now have the two desired security groups.

Finally, setup SG for Load Balancer and other resources

- Name: imga-nlb`
- Description: `Allow SSH and other private connections`
- VPC: select `production-vpc`
- Inbound rules:
  - Protocol: **TCP**; Port range: **80**; Source: **Anywhere IPv4** (0.0.0.0/0)
  - Protocol: **ALL**; Port range: **ALL**; Source: `prod-ec2-sg`

![2-image](/images/2-preparation/2-3-4-edit-nlb-inbound-rule.png)

Re-check
![2-image](/images/2-preparation/2-3-5-check-sgs.png)
