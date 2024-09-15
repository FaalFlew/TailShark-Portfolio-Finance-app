# Running the frontend

## Using Docker

### Install Docker
[Docker Installation Guide](https://docs.docker.com/engine/install/).

### Clone and open the project
`git clone https://github.com/your-username/portfolio-finance-app.git`

`cd portfolio-finance-app/frontend`
### Build the Docker image
`docker build -t tailshark-frontend .`

### Run the Docker container
`docker run --name frontend_container -p 3000:3000 tailshark-frontend`

### Access the app
You can then access the app here:

http://localhost:3000

### Stopping the container
**Run the command:**

`docker stop frontend_container`

## Using node.js

### Install node.js
Version 18 and above

[Node.JS Installation Guide](https://nodejs.org/en/download/package-manager).

### Clone and open the project
**Run commands:**

`git clone https://github.com/FaalFlew/TailShark-Portfolio-Finance-app.git`

`cd portfolio-finance-app/frontend`

### Install and run the app
`npm install`

`npm start`
