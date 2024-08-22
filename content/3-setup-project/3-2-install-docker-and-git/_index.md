+++
title = "Install Docker and Git"
date = 2024
weight = 2
chapter = false
pre = "3.2. "
+++

#### Installing Docker

To allow the EC2 instance to package the source code and for the EC2 instance in the development environment to deploy that package as a server, we need to install Docker on both EC2 instances.

First, we need to SSH into the EC2 instance in the development environment and install Docker using the following command:

```bash
sudo yum install -y docker
```

**INSERT IMAGE HERE**

After the installation, we will start the Docker service on Linux:

```bash
sudo service docker start
```

Add the current Linux user to the Docker group so that the user can interact with Docker, and check if the current user can use Docker:

```bash
# Create group if it doesn't exist
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
docker ps
```

Next, SSH into the EC2 instance in the production environment and install Docker following the same steps as above.

**INSERT IMAGE HERE**

#### Installing Git

To clone the project we just forked onto the EC2 instance in the development environment, we need to install Git on that EC2 instance.

```bash
sudo yum install -y git-all
```

Go to the project repository on GitHub and copy the URL to clone the source code.

**INSERT IMAGE HERE**

```bash
git clone https://github.com/{your-user-name}/imga
```

INSERT IMAGE HERE

And that's it! We now have:

- Docker and Git installed on the EC2 instance in the development environment (for source code management, packaging the source code, and pushing Docker images to ECR).
- Docker installed on the EC2 instance in the production environment (for pulling Docker images from ECR and deploying the server).
