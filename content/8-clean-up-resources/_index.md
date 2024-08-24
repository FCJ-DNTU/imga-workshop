+++
title = "Clean up resources"
date = 2024
weight = 8
chapter = false
pre = "8. "
+++

After completing this exercise, we need to clean up all resources to avoid incurring unnecessary charges.

#### Delete the Distribution

Go to the distribution list, select the distribution we created, and click **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-1-delete-distribution.png)

#### Delete API Gateway and VPC Link

Next, in the **API Gateway** APIs list, select `imga-api` and click **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-2-delete-api-gw.png)

Go to **VPC links**, select the VPC link we created, and click **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-3-delete-vpc-link.png)

#### Delete Network Load Balancer and Target Group

In the EC2 interface, scroll down to **Load Balancer**, select the NLB we created earlier

- Click **Actions**.
- Select **Delete load balacner**.

![8-clean-up-resources](/images/8-clean-up-resources/8-4-delete-nlb.png)

Next, in the target groups list, select `prod-ec2`

- Click **Actions**.
- Select **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-5-delete-target-group.png)

#### Delete EC2 Instances

Also, in the EC2 interface, go to the EC2 instance list. We will terminate both EC2 instances we created.

![8-clean-up-resources](/images/8-clean-up-resources/8-6-delete-ec2.png)
![8-clean-up-resources](/images/8-clean-up-resources/8-7-delete-imga-server.png)

#### Delete NAT Gateway and Elastic IP

In the NAT Gateway section, select the NAT Gateway we created

- Click **Actions**.
- Select **Delete NAT gateway**.

![8-clean-up-resources](/images/8-clean-up-resources/8-8-delete-nat-gw.png)

Once the NAT Gateway is fully deleted, go to the Elastic IP list, select the Elastic IP created with the NAT Gateway

- Click **Actions**.
- Select **Release Elastic IP address**.

![8-clean-up-resources](/images/8-clean-up-resources/8-9-delete-elastic-ip.png)

{{% notice note %}}
The VPC Link created an ENI, which uses an Elastic IP. However, since we have deleted the VPC Link, the Elastic IP has also been deleted.
{{% /notice %}}

#### Delete VPC Peering and VPC Resources

In the VPC interface's peering connection list, select the peering connection we created at the beginning.

- Click **Actions**.
- Select **Delete peering connection**.

![8-clean-up-resources](/images/8-clean-up-resources/8-10-delete-vpc-peering.png)

Next, in the VPC list, delete the two VPCs we created initially.

- Click **Actions**.
- Select **Delete VPC**.

![8-clean-up-resources](/images/8-clean-up-resources/8-11-delete-vpc.png)
![8-clean-up-resources](/images/8-clean-up-resources/8-12-delete-vpc.png)

#### Delete Repository on ECR

In the ECR interface, go to the repository we created and delete the Docker image first. Select the image and click **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-13-delete-image.png)

Now, we can delete the repository.

![8-clean-up-resources](/images/8-clean-up-resources/8-14-delete-repository.png)

#### Delete S3 Buckets

In the S3 Bucket list, we will delete the Buckets we created. First, the S3 Bucket for the website.

- Select **Empty**.

![8-clean-up-resources](/images/8-clean-up-resources/8-15-empty-bucket.png)

Confirm that you want to delete the objects in the bucket.

![8-clean-up-resources](/images/8-clean-up-resources/8-16-confirm-empty-bucket.png)

Select the bucket again and click **Delete**.

![8-clean-up-resources](/images/8-clean-up-resources/8-17-delete-bucket.png)

Confirm the deletion.

![8-clean-up-resources](/images/8-clean-up-resources/8-18-confirm-delete-bucket.png)

Similarly, for the remaining bucket, follow the same steps to delete it. We have now cleaned up all the resources from this workshop.
