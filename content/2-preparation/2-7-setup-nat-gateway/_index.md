+++
title = "Setup NAT Gateway"
date = 2024
weight = 7
chapter = false
pre = "2.7. "
+++

To allow an EC2 instance in the production environment to download packages, libraries, software, and Docker images stored in ECR, the VPC of the production environment must have a NAT Gateway. This allows EC2 instances in that network to access the internet and download the necessary resources via the NAT Gateway.

#### Setting up the NAT Gateway

In the VPC interface:

- Select **NAT gateways**
- Click **Create NAT gateway**

![2-image](/images/2-preparation/2-7-1-nat-gw-page.png)

We will configure the VPC with the following details:

- Name: `nat-gw`
- Subnet: select the public subnet that was set up earlier
- Connectivity type: **Public**
- Elastic IP allocation ID: click **Allocate Elastic IP** to quickly create one
- Click **Create NAT gateway**

![2-image](/images/2-preparation/2-7-2-setup-nat-gw.png)

Now we will add a new route in the routing table that is connected to the private subnet where the EC2 instance is located. This route will go to the NAT Gateway.

- Select the private subnet
- Add a route with the following details:
  - Destination: `0.0.0.0/0`
  - Target: the **NAT Gateway** we just created
- Save changes

![2-image](/images/2-preparation/2-7-3-edit-prod-private-rtb.png)
![2-image](/images/2-preparation/2-7-4-add-route-to-prod-private-rtb.png)

Now, this private subnet can access the internet through the NAT Gateway and Internet Gateway. We can verify this in the **Resource map** tab under **Your VPCs**.

![2-image](/images/2-preparation/2-7-5-check-resource-map.png)

#### Verifying the connection

In theory, with the configuration we’ve done so far, the EC2 instance in the development environment should be able to SSH into the EC2 instance in the production environment. Let's test this.

First:

- Select **dev-ec2**
- Copy the public IPv4

![2-image](/images/2-preparation/2-7-6-copy-dev-ec2-public-ip.png)

Open MobaXterm or VSCode. In this guide, we are using MobaXterm.

- Start a new session
- Enter the following details:
  - Remote host: public IPv4
  - Specify username: `ec2-user`
  - In **Advanced SSH settings**, check **Use private key** and select the key-pair we downloaded in the previous step.
- Click **Ok**

![2-image](/images/2-preparation/2-7-7-setup-in-mobaxterm.png)
![2-image](/images/2-preparation/2-7-8-connection-result.png)

Next, we will upload the `.pem` file to the EC2 instance using MobaXterm to establish an SSH connection to the EC2 instance in the production environment (both EC2 instances are using the same key-pair).

In the Instances interface:

- Select `imga-server`
- Copy the internal IPv4 address of this EC2 instance

![2-image](/images/2-preparation/2-7-9-upload-key.png)
![2-image](/images/2-preparation/2-7-10-upload-key.png)
![2-image](/images/2-preparation/2-7-11-copy-prod-ec2-private-ip.png)

Enter the following command in the command line:

```bash
chmod 400 <your-key>.pem
ssh -i <your-key>.pem ec2-user@<private ipv4>
```

![2-image](/images/2-preparation/2-7-12-connect-to-private-ec2.png)

And we get the following result:

![2-image](/images/2-preparation/2-7-13-ping-from-private-ec2-to-amazon.png)

With this, the configuration steps we have completed are correct. In the next section, we will explore how our system is deployed.
