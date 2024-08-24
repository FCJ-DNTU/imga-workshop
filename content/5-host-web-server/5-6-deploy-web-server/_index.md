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

![5-host-web-server](/images/5-host-web-server/5-6-1-pull-docker-image.png)

To pull the Docker image, we need the URI of the Docker image. Go to the details of the Docker image in the repository on ECR and copy the URI.

![5-host-web-server](/images/5-host-web-server/5-6-2-copy-image-uri.png)

Login to Docker, using the same command from the previous step.

![5-host-web-server](/images/5-host-web-server/5-6-3-pull-image.png)

The Docker image has now been successfully pulled.

#### Deployment

After pulling the image, we will start the Docker container using this Docker image.

![5-host-web-server](/images/5-host-web-server/5-6-4-run-docker-container.png)

There are several prompts where you need to select options:

- Please select the geographic area in which you live: select **5**
- Please select the city or region corresponding to your time zone: select **70**

![5-host-web-server](/images/5-host-web-server/5-6-5-choose-region.png)
![5-host-web-server](/images/5-host-web-server/5-6-6-choose-time-zone.png)

The script will continue running for a while, and there may be additional prompts requiring confirmation. Once everything is downloaded and set up, the web server will start using **pm2**.

![5-host-web-server](/images/5-host-web-server/5-6-7-server-is-running.png)

#### Verification

Now, when checking the target status in the Load Balancer `imga-nlb`, you should see that the target (the EC2 instance in the production environment) is healthy with the status **Healthy**.

![5-host-web-server](/images/5-host-web-server/5-6-8-check-health.png)

Go to API Gateway, retrieve the API endpoint, and test it to see the result.

![5-host-web-server](/images/5-host-web-server/5-6-9-check-result.png)

{{% notice note %}}
The reason the API can be tested through a request to the server is that we set **Access-Control-Allow-Origin** to **\***.
{{% /notice %}}

This means our web server is now operational.
