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

![6-host-web-application](/images/6-host-web-application/6-3-1-clone-folked-repo.png)

Once the project is cloned, open it in VSCode and modify the API endpoint in the following file. Change it to the API Gateway endpoint.

![6-host-web-application](/images/6-host-web-application/6-3-2-setup-endpoint.png)

#### Create an access key

Before creating a workflow, we need to have an IAM User authorized for the Runner to execute actions. There are a few ways to achieve this:

- Create an IAM Role with S3 access, assign the Role to an EC2 instance (located in a VPC with an S3 Endpoint), and switch the Runner to that EC2 instance.
- Create an IAM User with access to the S3 Bucket, and provide that user's credentials (Access Key ID and Secret Access Key) to the Runner's AWS CLI.

Here, we'll use the second method.

In the **IAM** interface, select Users.

![6-host-web-application](/images/6-host-web-application/6-3-3-iam-page.png)

In the User list, choose a user with access to the S3 Bucket.

![6-host-web-application](/images/6-host-web-application/6-3-4-select-user.png)

On the user's information page, create a new access key.

![6-host-web-application](/images/6-host-web-application/6-3-5-select-create-access-key.png)

Select **Other** as the use case, then click **Next**.

![6-host-web-application](/images/6-host-web-application/6-3-6-select-use-case.png)

You can add a description or skip this step, then click **Create access key**.

![6-host-web-application](/images/6-host-web-application/6-3-7-describe.png)

After creation, download the key for future use.

![6-host-web-application](/images/6-host-web-application/6-3-8-key-created.png)

### Deployment

Now that we have the Access Key and Secret Access Key, we'll configure the corresponding secrets for the workflow. Go to your repository:

- Open the **Settings** tab.
- Expand **Secrets and variables**, then choose **Actions**.

![6-host-web-application](/images/6-host-web-application/6-3-9-create-secret.png)

Click **New repository secret** to configure these settings. Since this is sensitive information, I won't configure it here, but there are four values we need:

- `AWS_BUCKET`: The name of the bucket storing the web application content. For this workshop, the S3 Bucket is named `imga-website`.
- `AWS_KEY_ID`: The Access Key ID.
- `AWS_SECRET_ACCESS_KEY`: The Secret Access Key.
- `AWS_REGION`: The region code, which is `ap-southeast-1` (Singapore) in this workshop.

After setting these up, your secrets should look like this:

![6-host-web-application](/images/6-host-web-application/6-3-10-check-secrets.png)

Before our workflow can be triggerd by Github Actions, we need to go to **Actions**, press **I understand my workflows, go ahead and enable them** to open our workflow.

![6-host-web-application](/images/6-host-web-application/6-3-11-allow-github-actions.png)

Now, push the changes in the source code to the `main` branch of the project. Once pushed, GitHub will trigger the workflow.

![6-host-web-application](/images/6-host-web-application/6-3-12-push-code-to-trigger-workflow.png)

The workflow will run like this:

![6-host-web-application](/images/6-host-web-application/6-3-13-workflow-is-running.png)
![6-host-web-application](/images/6-host-web-application/6-3-14-workflow-runs-successfully.png)

When it's finished, go to the S3 Bucket that contains the website to check, and confirm that all necessary web data has been uploaded.

![6-host-web-application](/images/6-host-web-application/6-3-15-check-result.png)

Copy the URL from the CloudFront distribution to check the result.

![6-host-web-application](/images/6-host-web-application/6-3-16-copy-url-of-distribution.png)

Result:

![6-host-web-application](/images/6-host-web-application/6-3-17-our-website.png)

Now, we've completed the configuration and deployment tasks. It's time to check if our application is running smoothly.
