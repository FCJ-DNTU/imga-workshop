+++
title = "Push docker image to ECR"
date = 2024
weight = 5
chapter = false
pre = "5.5. "
+++

Now, we will move on to packaging the source code into a Docker image. But before packaging, we need to modify some configurations.

#### Configure Variables in the Bash Script

We have a bash script in the `nodejs/scripts/start.sh` directory. As mentioned earlier, this script is responsible for setting up environment variables and starting the Node server using those variables.

First, reconnect to the EC2 instance via SSH in the production environment.

- Navigate to the `imga/backend` directory, which contains the backend source code for the project.
- Then, run the command `vim nodejs/scripts/start.sh` to open this file in the VIM text editor.

**INSERT IMAGE HERE**

Inside this script, there are several environment variables like:

- **NVM_DIR**: Used to specify the script location for `nvm`, `node`, and `npm`.
- **PYTHON_PATH**: This is the absolute path from root to the home directory, pointing to the Python interpreter within the virtual environment (set up in previous scripts).
- **TEMP_PATH**: Absolute path to the temporary folder that holds the results for the users.
- **UPLOADS_PATH**: Absolute path to the folder where user-uploaded images will be stored. The backend will retrieve images from here and upload them to the S3 Bucket.

Among these, `AWS_REGION` (the region where the S3 Buckets are located) and `BUCKET_NAME` (the name of the Bucket containing images) need to be updated accordingly. Once edited:

- Press **ESC** to enter Normal Mode.
- Press **Shift + ;** to open the Command Mode.
- Type `:wq` to save and exit.

**INSERT IMAGE HERE**

#### Build the Docker Image

Following the push commands we reviewed earlier, the first step is to log in to Docker using credentials retrieved from ECR with the command `aws ecr get-login-password`.

**INSERT IMAGE HERE**

Once logged in, proceed to package the source code into a Docker image.

**INSERT IMAGE HERE**

Check if the image has been built with the command `docker image ls`. Finally, push the image to the repository created earlier.

**INSERT IMAGE HERE**

Go to the repository to verify.

**INSERT IMAGE HERE**

Now, the Docker image exists in our private repository. The next step will be to deploy the web server.
