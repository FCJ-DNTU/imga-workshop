+++
title = "Create private intergration with VPC Link"
date = 2024
weight = 3
chapter = false
pre = "5.3. "
+++

#### Create VPC Link

In this step, select **VPC Link** from the left-hand menu. Click **Create** to start a new one.

**INSERT IMAGE HERE**

This VPC will have the following information:

- Choose a VPC link version: select **VPC link for HTTP APIs**
- Name: `private-nlb`
- VPC: **production-vpc**

**INSERT IMAGE HERE**

Next:

- Subnet: select the subnet where the NLB is located.
- Security group: select `imga-nlb`
- Click **Create** to create the VPC link.

**INSERT IMAGE HERE**

{{% notice note %}}
Here, we can freely configure how user requests (or packets) are sent by choosing the subnet to which the requests are routed. In practice, when adding targets to the target group and selecting subnets in the VPC Link, the system helps us configure routing to the subnets and targets for the routers and devices.
{{% /notice %}}

After creation, we will have to wait for the ENI (Elastic Network Interface) to be initialized.

**INSERT IMAGE HERE**

{{% notice note %}}
The VPC Link must complete ENI initialization before integrations can be created.
{{% /notice %}}

#### Create Routes

Once the ENI for the VPC Link is created, we proceed to create a route:

- Select **Routes**
- Click **Create**

**INSERT IMAGE HERE**

Next, the route will have the following information:

- Method: **ANY**
- Path: `/{proxy+}`

**INSERT IMAGE HERE**

{{% notice note %}}
To create a route, we need to know the method and path corresponding to the resources our system allows. In this guide, we will configure the method as **ANY**, meaning it accepts all HTTP methods, and the path as `/{proxy+}`, which means it accepts all paths after the base URL.
{{% /notice %}}

#### Combine VPC Link and Route

Select **Integration**, then click **Create and attach an integration**.

**INSERT IMAGE HERE**

In the creation screen, we will enter the following information:

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

After creation, we will have the integration information as shown below:

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Configure CORS (Cross-origin Resource Sharing)

To allow the web application to send requests to the API Gateway, we need to configure CORS.

- In the **imga-api** interface, on the left-hand menu, select **CORS** under **Develop**.
- Click **Configure** to start the setup.

**INSERT IMAGE HERE**

Here, we need to configure two settings:

- Access-Control-Allow-Origin: \*
- Access-Control-Allow-Methods: \*

And save the changes.

**INSERT IMAGE HERE**

{{% notice note %}}
The **Access-Control-Allow-Origin** will be set to **\*** for quick configuration. When deploying the web application with CloudFront, you should return here and change it to the URL of the Distribution.
{{% /notice %}}
