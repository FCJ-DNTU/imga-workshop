+++
title = "Setup VPC"
date = 2024
weight = 1
chapter = false
pre = "2.1. "
+++

#### Set up VPC for the production environment

In this section, we will configure a VPC quickly for the infrastructure of this workshop using the automatic VPC setup.

- Search for `VPC`
- Select **VPC**
- On the **VPC** homepage, click **Create VPC**.

![2-image](/images/2-preparation/2-1-1-vpc-page.png)

In the **VPC Settings** section:

- Resources to create: **VPC and more**
- Name (auto-generation): production
- IPv4 CIDR Block: `10.0.0.0/16`, no CIDR Block for IPv6
- Tenancy: **Default**

![2-image](/images/2-preparation/2-1-2-create-prod-vpc.png)

Next:

- Number of AZs: 2
- First AZ: ap-southeast-1a
- Second AZ: ap-southeast-1b
- Number of public subnets: 2
- Number of private subnets: 2
- NAT Gateway: None, we will configure it later
- VPC Endpoints: S3 Gateway

{{% notice note %}}
In reality, it is better to configure manually to get the resources exactly how you want them. For this infrastructure, the production environment only has 2 subnets: private and public; while the development environment has only 1 public subnet.
{{% /notice %}}

![2-image](/images/2-preparation/2-1-3-create-prod-vpc.png)

We will also select **Enable DNS hostname** and **Enable DNS resolution** so EC2 in the private subnet can load content from the internet.

![2-image](/images/2-preparation/2-1-4-setup-prod-vpc-dns.png)

Wait for the VPC to be created.

![2-image](/images/2-preparation/2-1-5-creating-prod-vpc.png)

#### Set up VPC for the development environment

Similar to the VPC for the production environment, we will now automatically create a VPC for the development environment. Follow the configurations shown in the images step by step.

![2-image](/images/2-preparation/2-1-6-create-dev-vpc.png)
![2-image](/images/2-preparation/2-1-7-setup-dev-vpc-dns.png)
