+++
title = "Create IAM Role"
date = 2024
weight = 4
chapter = false
pre = "2.4. "
+++

IAM Roles are highly recommended because they are easy to manage and have limited usage durations. In this tutorial, we will create 2 IAM Roles for each EC2 instance to grant access to desired services: S3 and ECR.

For the EC2 instance in the development environment, it has the permission to:

- Push and pull Docker images from ECR
- Read, write, and delete objects in S3

For the EC2 instance in the production environment, it has the permission to:

- Pull Docker images from ECR
- Read, write, and delete objects in S3

Thus, we will need the following policies to:

- Push Docker images to ECR, and can get authorization token from ECR
- Pull Docker images from ECR, and can get authorization token from ECR
- Read, write, and delete objects in S3

{{% notice note %}}
Since Docker will push and pull Docker images to a private registry, and in this case, we are using ECR as a registry with a private repository, Docker needs credentials to push and pull images to and from ECR. When configuring IAM Policies, we will add the permission to retrieve authentication tokens.
{{% /notice %}}

#### Create ECR access policy for IAM Role

On the home page:

- Search for `IAM`
- Select **IAM**

**INSERT IMAGE HERE**

On the IAM home page:

- Select **Policies**
- Click **Create policy**

**INSERT IMAGE HERE**

In **Select a service**, we will:

- Search for `Elastic Container Registry`
- Select **Elastic Container Registry**

**INSERT IMAGE HERE**

Next, we will select a few permissions in **List** and **Read** as shown in the image. Check **Any in this account** under Resources (Specific).

**INSERT IMAGE HERE**

After that, enter some details for the policy:

- Name: `ReadECRRepositoryContent`
- Description: `Allow pull images, describe repositories`
- Review the information and click **Create policy**

**INSERT IMAGE HERE**

Similarly, we will now create another policy for the ECR service with **Write** permissions.

**INSERT IMAGE HERE**

Details:

- Name: `WriteECRRepositoryContent`
- Description: `Allow push and delete images`
- Review the information and click **Create policy**

**INSERT IMAGE HERE**

#### Create S3 access policy for IAM Role

Next, in the policy creation interface:

- Search for `S3`
- Select **S3**
- Click **Next**

**INSERT IMAGE HERE**

Next, we will add **List**, **Read**, and **Write** permissions as follows:
**INSERT IMAGE HERE**
**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

In **Resources**, select **Specific** and check Any for both **bucket** and **object**.

**INSERT IMAGE HERE**

Next, we will configure the details for this policy:

- Name: `RWDS3Objects`
- Description: `Allow read, write and delete Objects in S3 Bucket`
- Review the information and click **Create policy**

**INSERT IMAGE HERE**

In the policy list, under **Filter by Type**, select **Customer managed** to check the policies.

**INSERT IMAGE HERE**

#### Create IAM Role for EC2 in the development environment

After creating the policies, we will now assign them to IAM Roles, starting with the EC2 instance in the development environment. In the IAM console:

- Select **Roles**
- Click **Create role**

**INSERT IMAGE HERE**

Next, in **Select trusted entity**:

- Choose **AWS Service**
- Use case:
  - Service or use case: EC2
  - Use case: EC2

**INSERT IMAGE HERE**

In **Add permissions**:

- Select all the policies we just created
- Click **Next**

**INSERT IMAGE HERE**

Name the Role `DevEC2` and create the Role.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

#### Create IAM Role for EC2 in the production environment

Similarly, follow the same steps as creating the Role for EC2 in the development environment, but the permissions for this role will differ slightly.

- In **Add permissions**:
- Select the 2 policies: `ReadECRRepositoryContent` and `RWDS3Object`
- Click **Next**

**INSERT IMAGE HERE**

Name the Role `ProdEC2` and create the Role.

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

Finally, review the 2 IAM Roles we just created.

**INSERT IMAGE HERE**
