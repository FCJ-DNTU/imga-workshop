+++
title = "Deploy web server"
date = 2024
weight = 6
chapter = false
pre = "5.6. "
+++

#### Pull Docker Image from ECR

In the previous step, we pushed the Docker image to ECR. Now, we will pull the Docker image from ECR to build a Docker container.

Reconnect via SSH to the EC2 instance in the production environment from the EC2 instance in the development environment.

**INSERT IMAGE HERE**

To pull the Docker image, we need the URI of the Docker image. Go to the details of the Docker image in the repository on ECR and copy the URI.

**INSERT IMAGE HERE**

Login to Docker, using the same command from the previous step.

**INSERT IMAGE HERE**

The Docker image has now been successfully pulled.

#### Deployment

After pulling the image, we will start the Docker container using this Docker image.

**INSERT IMAGE HERE**

There are several prompts where you need to select options:

- Please select the geographic area in which you live: select **5**
- Please select the city or region corresponding to your time zone: select **70**

**INSERT IMAGE HERE**

The script will continue running for a while, and there may be additional prompts requiring confirmation. Once everything is downloaded and set up, the web server will start using **pm2**.

**INSERT IMAGE HERE**

#### Verification

Now, when checking the target status in the Load Balancer `imga-nlb`, you should see that the target (the EC2 instance in the production environment) is healthy with the status **Healthy**.

**INSERT IMAGE HERE**

Go to API Gateway, retrieve the API endpoint, and test it to see the result.

**INSERT IMAGE HERE**

{{% notice note %}}
The reason the API can be tested through a request to the server is that we set **Access-Control-Allow-Origin** to **\***.
{{% /notice %}}

This means our web server is now operational.
