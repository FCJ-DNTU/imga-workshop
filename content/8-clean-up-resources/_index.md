+++
title = "Clean up resources"
date = 2024
weight = 8
chapter = false
pre = "8. "
+++

+++
title = "Clean Up Resources"
date = 2024
weight = 8
chapter = false
pre = "8. "
+++

After completing this exercise, we need to clean up all resources to avoid incurring unnecessary charges.

#### Delete the Distribution

Go to the distribution list, select the distribution we created, and click **Delete**.

**INSERT IMAGE HERE**

#### Delete API Gateway and VPC Link

Next, in the **API Gateway** APIs list, select `imga-api` and click **Delete**.

**INSERT IMAGE HERE**

Go to **VPC links**, select the VPC link we created, and click **Delete**.

**INSERT IMAGE HERE**

#### Delete Network Load Balancer and Target Group

In the EC2 interface, scroll down to **Load Balancer**, select the NLB we created earlier

- Click **Actions**.
- Select **Delete load balacner**.

**INSERT IMAGE HERE**

Next, in the target groups list, select `prod-ec2`

- Click **Actions**.
- Select **Delete**.

**INSERT IMAGE HERE**

#### Delete EC2 Instances

Also, in the EC2 interface, go to the EC2 instance list. We will terminate both EC2 instances we created.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Delete NAT Gateway and Elastic IP

In the NAT Gateway section, select the NAT Gateway we created

- Click **Actions**.
- Select **Delete NAT gateway**.

**INSERT IMAGE HERE**

Once the NAT Gateway is fully deleted, go to the Elastic IP list, select the Elastic IP created with the NAT Gateway

- Click **Actions**.
- Select **Release Elastic IP address**.

**INSERT IMAGE HERE**

{{% notice note %}}
The VPC Link created an ENI, which uses an Elastic IP. However, since we have deleted the VPC Link, the Elastic IP has also been deleted.
{{% /notice %}}

#### Delete VPC Peering and VPC Resources

In the VPC interface's peering connection list, select the peering connection we created at the beginning.

- Click **Actions**.
- Select **Delete peering connection**.

**INSERT IMAGE HERE**

Next, in the VPC list, delete the two VPCs we created initially.

- Click **Actions**.
- Select **Delete VPC**.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Delete Repository on ECR

In the ECR interface, go to the repository we created and delete the Docker image first. Select the image and click **Delete**.

**INSERT IMAGE HERE**

Now, we can delete the repository.

**INSERT IMAGE HERE**

#### Delete Repository on ECR

In the ECR interface, go to the repository we created and delete the Docker image first. Select the image and click **Delete**.

**INSERT IMAGE HERE**

Now, we can delete the repository.

**INSERT IMAGE HERE**

#### Delete S3 Buckets

In the S3 Bucket list, we will delete the Buckets we created. First, the S3 Bucket for the website.

- Select **Empty**.

**INSERT IMAGE HERE**

Confirm that you want to delete the objects in the bucket.

**INSERT IMAGE HERE**

Select the bucket again and click **Delete**.

**INSERT IMAGE HERE**

Confirm the deletion.

**INSERT IMAGE HERE**

Similarly, for the remaining bucket, follow the same steps to delete it. We have now cleaned up all the resources from this workshop.
