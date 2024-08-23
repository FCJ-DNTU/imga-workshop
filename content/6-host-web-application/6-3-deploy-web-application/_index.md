+++
title = "Deploy web application"
date = 2024
weight = 3
chapter = false
pre = "6.3. "
+++

In theory, as long as the web data is uploaded to the S3 Bucket, users can access it via CloudFront. Now, we will automate the deployment to the S3 Bucket.

#### Download the application source code

Go to the repository that we cloned into our personal account at the beginning and download the source code just like we did on the EC2 instance.

**INSERT IMAGE HERE**

Once the project is cloned, open it in VSCode and modify the API endpoint in the following file. Change it to the API Gateway endpoint.

**INSERT IMAGE HERE**

#### Create an access key

Before creating a workflow, we need to have an IAM User authorized for the Runner to execute actions. There are a few ways to achieve this:

- Create an IAM Role with S3 access, assign the Role to an EC2 instance (located in a VPC with an S3 Endpoint), and switch the Runner to that EC2 instance.
- Create an IAM User with access to the S3 Bucket, and provide that user's credentials (Access Key ID and Secret Access Key) to the Runner's AWS CLI.

Here, we'll use the second method.

In the **IAM** interface, select Users.

**INSERT IMAGE HERE**

In the User list, choose a user with access to the S3 Bucket.

**INSERT IMAGE HERE**

On the user's information page, create a new access key.

**INSERT IMAGE HERE**

Select **Other** as the use case, then click **Next**.

**INSERT IMAGE HERE**

You can add a description or skip this step, then click **Create access key**.

**INSERT IMAGE HERE**

After creation, download the key for future use.

**INSERT IMAGE HERE**

### Deployment

Now that we have the Access Key and Secret Access Key, we'll configure the corresponding secrets for the workflow. Go to your repository:

- Open the **Settings** tab.
- Expand **Secrets and variables**, then choose **Actions**.

**INSERT IMAGE HERE**

Click **New repository secret** to configure these settings. Since this is sensitive information, I won't configure it here, but there are four values we need:

- `AWS_BUCKET`: The name of the bucket storing the web application content. For this workshop, the S3 Bucket is named `imga-website`.
- `AWS_KEY_ID`: The Access Key ID.
- `AWS_SECRET_ACCESS_KEY`: The Secret Access Key.
- `AWS_REGION`: The region code, which is `ap-southeast-1` (Singapore) in this workshop.

After setting these up, your secrets should look like this:

**INSERT IMAGE HERE**

Now, push the changes in the source code to the `main` branch of the project. Once pushed, GitHub will trigger the workflow.

**INSERT IMAGE HERE**

The workflow will run like this:

**INSERT IMAGE HERE**
**INSERT IMAGE HERE**

When it's finished, go to the S3 Bucket that contains the website to check, and confirm that all necessary web data has been uploaded.

**INSERT IMAGE HERE**

Copy the URL from the CloudFront distribution to check the result.

**INSERT IMAGE HERE**

Result:

**INSERT IMAGE HERE**

Now, we've completed the configuration and deployment tasks. It's time to check if our application is running smoothly.
