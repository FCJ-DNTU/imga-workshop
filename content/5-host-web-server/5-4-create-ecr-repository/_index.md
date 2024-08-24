+++
title = "Create a private repository in ECR"
date = 2024
weight = 4
chapter = false
pre = "5.4. "
+++

Before we can push a Docker image to ECR, we need to create a repository. This repository will be private, requiring authentication and authorization.

#### Create a Private Repository

In the main interface:

- Search for `ECR`.
- Select **Elastic Container Registry**.

![5-host-web-server](/images/5-host-web-server/5-4-1-search-ecr.png)

- Click **Create** to start creating the repository.

![5-host-web-server](/images/5-host-web-server/5-4-2-ecr-page.png)

Here, we'll fill in some information:

- **Repository name**: `imga/server`
- **Image tag mutability**: Select **Immutable** (this prevents Docker image tags from being overwritten, helping us manage image versions).

In the **Encryption settings**:

- Select **AES-256**.

![5-host-web-server](/images/5-host-web-server/5-4-3-setup-private-repository.png)

After creation, under **Private Registry**, you will see the repository we just created listed.

![5-host-web-server](/images/5-host-web-server/5-4-4-check-result.png)

If you go into this repository, you won't see any images yet.

![5-host-web-server](/images/5-host-web-server/5-4-5-view-push-commands.png)

Click **View push commands**, and you will see instructions on how to push a Docker image to ECR.

![5-host-web-server](/images/5-host-web-server/5-4-6-view-push-commands.png)

This includes commands for logging into Docker, obtaining the repository endpoint, building the image, tagging it, and finally pushing the image to the repository.
