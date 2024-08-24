+++
title = "Attach IAM Roles and configure EC2 metadata"
date = 2024
weight = 6
chapter = false
pre = "2.6. "
+++

Now we will use the IAM Roles that we created earlier to assign to two EC2 instances.

#### Configure the Role and Set Up Metadata for DevEC2

Go to the EC2 management console and access the list of EC2 instances.

- Select the EC2 instance you want to assign `dev-ec2`

![2-image](/images/2-preparation/2-6-1-attach-iam-role-to-dev-ec2.png)

- Open the dropdown menu and choose the correct role we previously named `DevEC2`
- Click **Update IAM role** to confirm.

![2-image](/images/2-preparation/2-6-2-select-iam-role-for-dev-ec2.png)

Next, for this same EC2 instance, we will adjust the settings to retrieve metadata from the EC2 instance.

![2-image](/images/2-preparation/2-6-3-setup-metadata-for-dev-ec2.png)

- Instance metadata service: Enable (it's usually enabled by default)
- IMDSv2: change to **Optional**

![2-image](/images/2-preparation/2-6-4-setup-metadata-for-dev-ec2.png)

#### Assign IAM Role for Prod EC2

Similarly, we will perform the same steps for the EC2 instance `imga-server`

- Select `imga-server`

![2-image](/images/2-preparation/2-6-5-attach-iam-role-for-prod-ec2.png)

- Open the dropdown menu and choose the correct role we previously named `ProdEC2`
- Click **Update IAM role** to confirm.

![2-image](/images/2-preparation/2-6-6-select-iam-role-for-prod-ec2.png)

Next, we will adjust the settings to retrieve metadata from the EC2 instance.

![2-image](/images/2-preparation/2-6-7-setup-metadata-for-prod-ec2.png)

The remaining steps are exactly the same as for `dev-ec2`. At this point, we can ensure that both EC2 instances can communicate with each other and use the necessary services reliably.
