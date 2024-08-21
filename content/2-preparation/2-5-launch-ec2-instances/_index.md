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

**INSERT IMAGE HERE**

On the EC2 page, click **Launch instance**

**INSERT IMAGE HERE**

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

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

In the **Network settings** section, click **Edit**:
  - VPC: **development-vpc**
  - Subnet: choose the public subnet
  - Auto-assign public IP: Enable
  - Firewall:
    - Select **Select existing security group**
    - Choose the SG **dev-ec2-sg** we created earlier
  - Finally, click **Launch instance**

**INSERT IMAGE HERE**

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

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

In the **Network settings** section, click **Edit**:
  - VPC: **production-vpc**
  - Subnet: choose the private subnet
  - Auto-assign public IP: Disable
  - Firewall:
    - Select **Select existing security group**
    - Choose the SG **prod-ec2-sg** we created earlier
  - Finally, click **Launch instance**

**INSERT IMAGE HERE**

Lastly, I will check if both EC2 instances are running.

**INSERT IMAGE HERE**

#### Test the connection
In theory, with the configurations we've set up, the EC2 in the development environment should be able to SSH into the EC2 in the production environment. Let’s test this.

First:
  - Select **dev-ec2**
  - Copy the public IPv4

**INSERT IMAGE HERE**

Open MobaXterm or VSCode (we are using MobaXterm for this tutorial):
  - Start a new session
  - With the following details:
    - Remote host: public IPv4
    - Specify username: `ec2-user`
    - In **Advanced SSH settings**, check **Use private key**, and select the key-pair we downloaded earlier.
  - Click **Ok**

**INSERT IMAGE HERE**

Next, I will upload the `.pem` file to the EC2 instance using MobaXterm to SSH into the production EC2 instance (we are using the same key-pair for both EC2s in this tutorial).

In the **Instances** view:
  - Select `prod-ec2`
  - Copy the private IPv4 address of this EC2

**INSERT IMAGE HERE**

Enter the following command in the terminal:

```
chmod 400 <your-key>.pem
ssh -i <your-key>.pem ec2-user@<private ipv4>
```

And we got the result:

**INSERT IMAGE HERE**

This confirms that the setup steps we followed were correct. In the next section, we will explore how our system is deployed.