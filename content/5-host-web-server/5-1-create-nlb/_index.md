+++
title = "Create Network Load Balancer"
date = 2024
weight = 1
chapter = false
pre = "5.1. "
+++

#### Creating an NLB

In the **EC2** interface, find **Load Balancer**.

- Click **Create load balancer**

**INSERT IMAGE HERE**

Here, we will select Network Load Balancer.

**INSERT IMAGE HERE**

Configure the following details:

- Name: `imga-nlb`
- Scheme: **Internal**
- Load balancer IP address type: **IPv4**

**INSERT IMAGE HERE**

In the **Network mapping** section:

- VPC: select `production-vpc`
- Availability Zones: **ap-southeast-1a**
  - Subnet: select the private subnet
  - IPv4 Address: select **Assigned from CIDR 10.0.128.0/20**

**INSERT IMAGE HERE**

For **Security groups**, select the SG we created in previous steps. Below that, in the **Listeners and routing** section, the Load Balancer needs to know where to forward the requests via a Target Group.

Now we will create a new Target Group:

- Protocol: TCP
- Port: 80

Click the **Create target group** link, which will take us to the target group creation interface.

- Choose a target type: Instances
- Name: `prod-ec2`

**INSERT IMAGE HERE**

- Protocol: TCP
- Port: 80
- IP address type: IPv4
- VPC: **production-vpc**
- Health checks: configure as shown in the image

**INSERT IMAGE HERE**

Next, click **Next**. At this point, we need to add the EC2 instance in the production environment to the newly created target group.

- Select the **imga-server** EC2 instance
- Click **Include as pending below**
- Click **Create target group**

**INSERT IMAGE HERE**

The target group has been successfully created and the target added.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Review the configurations. Once confirmed, click **Create load balancer**.

**INSERT IMAGE HERE**
