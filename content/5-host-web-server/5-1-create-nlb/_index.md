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

![5-host-web-server](/images/5-host-web-server/5-1-1-lb-page.png)

Here, we will select Network Load Balancer.

![5-host-web-server](/images/5-host-web-server/5-1-2-choose-nlb.png)

Configure the following details:

- Name: `imga-nlb`
- Scheme: **Internal**
- Load balancer IP address type: **IPv4**

![5-host-web-server](/images/5-host-web-server/5-1-3-setup-nlb.png)

In the **Network mapping** section:

- VPC: select `production-vpc`
- Availability Zones: **ap-southeast-1a**
  - Subnet: select the private subnet
  - IPv4 Address: select **Assigned from CIDR 10.0.128.0/20**

![5-host-web-server](/images/5-host-web-server/5-1-4-setub-nlb-network-mapping.png)

For **Security groups**, select the SG we created in previous steps. Below that, in the **Listeners and routing** section, the Load Balancer needs to know where to forward the requests via a Target Group.

Now we will create a new Target Group:

- Protocol: TCP
- Port: 80

Click the **Create target group** link, which will take us to the target group creation interface.

- Choose a target type: Instances
- Name: `prod-ec2`

![5-host-web-server](/images/5-host-web-server/5-1-5-setup-target-group.png)

- Protocol: TCP
- Port: 80
- IP address type: IPv4
- VPC: **production-vpc**
- Health checks: configure as shown in the image

![5-host-web-server](/images/5-host-web-server/5-1-6-setup-target-group.png)

Next, click **Next**. At this point, we need to add the EC2 instance in the production environment to the newly created target group.

- Select the **imga-server** EC2 instance
- Click **Include as pending below**
- Click **Create target group**

![5-host-web-server](/images/5-host-web-server/5-1-7-add-prod-ec2-to-group.png)

The target group has been successfully created and the target added.

![5-host-web-server](/images/5-host-web-server/5-1-8-check-result.png)
![5-host-web-server](/images/5-host-web-server/5-1-9-setup-listener.png)

Review the configurations. Once confirmed, click **Create load balancer**.

![5-host-web-server](/images/5-host-web-server/5-1-10-check-and-create.png)
