+++
title = "Setup NAT Gateway"
date = 2024
weight = 6
chapter = false
pre = "2.6. "
+++

To allow an EC2 instance in the production environment to download packages, libraries, software, and Docker images stored in ECR, the VPC of the production environment must have a NAT Gateway. This allows EC2 instances in that network to access the internet and download the necessary resources via the NAT Gateway.

#### Setting up the NAT Gateway

In the VPC interface:

- Select **NAT gateways**
- Click **Create NAT gateway**

**INSERT IMAGE HERE**

We will configure the VPC with the following details:

- Name: `nat-gw`
- Subnet: select the public subnet that was set up earlier
- Connectivity type: **Public**
- Elastic IP allocation ID: click **Allocate Elastic IP** to quickly create one
- Click **Create NAT gateway**

**INSERT IMAGE HERE**

Now we will add a new route in the routing table that is connected to the private subnet where the EC2 instance is located. This route will go to the NAT Gateway.

- Select the private subnet
- Add a route with the following details:
  - Destination: `0.0.0.0/0`
  - Target: the **NAT Gateway** we just created
- Save changes

**INSERT IMAGE HERE**

Now, this private subnet can access the internet through the NAT Gateway and Internet Gateway. We can verify this in the **Resource map** tab under **Your VPCs**.

**INSERT IMAGE HERE**

#### Verifying the connection

In theory, with the configuration we’ve done so far, the EC2 instance in the development environment should be able to SSH into the EC2 instance in the production environment. Let's test this.

First:

- Select **dev-ec2**
- Copy the public IPv4

**INSERT IMAGE HERE**

Open MobaXterm or VSCode. In this guide, we are using MobaXterm.

- Start a new session
- Enter the following details:
  - Remote host: public IPv4
  - Specify username: `ec2-user`
  - In **Advanced SSH settings**, check **Use private key** and select the key-pair we downloaded in the previous step.
- Click **Ok**

**INSERT IMAGE HERE**

Next, we will upload the `.pem` file to the EC2 instance using MobaXterm to establish an SSH connection to the EC2 instance in the production environment (both EC2 instances are using the same key-pair).

In the Instances interface:

- Select `imga-server`
- Copy the internal IPv4 address of this EC2 instance

**INSERT IMAGE HERE**

Enter the following command in the command line:

```bash
chmod 400 <your-key>.pem
ssh -i <your-key>.pem ec2-user@<private ipv4>
```

And we get the following result:

**INSERT IMAGE HERE**

With this, the configuration steps we have completed are correct. In the next section, we will explore how our system is deployed.
