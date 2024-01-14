# MoodCheck App

MoodCheck is a web application that utilizes IBM Watson's Natural Language Understanding service to analyze the emotion and sentiment of text content from URLs or direct text input. It provides valuable insights into the emotional tone and sentiment of text, helping users better understand the content they analyze.

## Screenshot

![MoodCheck webpage](./moodCheckClient/public/screenshot.png)

## Table of Contents

- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Local System Installation](#installation-on-local-system)
- [Cloud Hosting on AWS](#hosting-on-aws)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

---

## Key Features

- Analyze the emotion and sentiment of text content from both URLs and direct text input.
- Provides insights into the emotional tone and sentiment, helping users gauge the mood of the content.
- Easy-to-use RESTful API endpoints for integration with other applications.
- Utilizes IBM Watson's Natural Language Understanding service for accurate analysis.
- Web server serves static content for a seamless user experience.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine.
- An IBM Watson Natural Language Understanding API key and service URL. Refer to the [IBM Watson documentation](https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#features-examples) for details on obtaining these credentials.

---

## Installation on Local System

To install and run the MoodCheck app on your local system, follow these steps:

1. Clone the MoodCheck repository to your local machine:

    ```bash
    git clone https://github.com/chesahkalu/moodcheck.git
    ```

2. Navigate to the project directory:

    ```bash
    cd moodcheck
    ```

3. Install the project dependencies using npm or yarn; on the command line, in the `/moodcheck/moodCheckServer` and `/moodcheck/moodCheckClient` directories run:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Create a .env file in `/moodcheck/moodCheckServer` of the project root directory and add your IBM Watson Natural Language Understanding API credentials:

    ```env
    API_KEY=your_api_key
    API_URL=your_api_url
    ```

    Replace `your_api_key` and `your_api_url` with your actual credentials.

5. Start the MoodCheck; on the command line, in the `/moodcheck/moodCheckServer` directory run:

    ```bash
    npm start
    ```
## Hosting on AWS

The Moodcheck App is currently hosted on AWS EC2 instance. Below are the steps and directions used to host the app on AWS.

1. Launch an `EC2 Instance` on AWS
    - Log into the AWS Management Console and navigate to the `EC2` Dashboard.
    - Create an `EC2 instance` and select the `Amazon Linux 2023 AMI`
    - Select the `t2.micro` instance type(Determine how much CPU and how much memory your instance gets).
    - Use default `VPC` which has `Subnets` with Internet Access because of `Internet Gateway` attached to the `VPC.`
    - Allow `HTTP` and `HTTPS` traffic on the `Security Group` to allow users to access the app , and `SSH` to allow you to connect to the instance from your terminal.
    - Create a new `Key Pair` and download the `.pem` file. This will be used to connect to the instance from your terminal.
    - Enable `Auto-assign Public IP` to allow the instance to have a public IP address.
    - Launch the instance.

2. Connect to the instance from your terminal using the `.pem` file downloaded:
    `ssh -i /path/to/.pem file ec2-user@your-instance-public-dns`

    or

    connect to instance from Console with the `Connect` button on the `EC2 Dashboard`.

3. Install `Node.js` and `npm` on the instance:

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    source ~/.bashrc
    nvm install node
    ```

4. Install `git` on the instance:

    ```
    sudo yum install git
    sudo apt-get install git
    ```

and clone the `Moodcheck` repository:

    ```
    git clone https://github.com/chesahkalu/moodcheck.git
    ```

5. Install the project dependencies using npm or yarn; on the command line, in the `/moodcheck/moodCheckServer` and `/moodcheck/moodCheckClient` directories run:

-   ```
    npm install
    ```
-   Create a .env file in the /moodcheck/moodCheckServer directory and add your IBM Watson credentials.

6. Start the MoodCheck; on the command line, in the `/moodcheck/moodCheckServer` directory run:

    ```
    npm start
    ```

7. Keep the application running on the instance because the application will stop running when the terminal is closed. To keep the application running in the background, use a process manager like `pm2`

    ```
    npm install pm2 -g
    ```

8. Start the application with `pm2`:

    ```
    pm2 start moodCheckerServer.js
    ```

-  To stop the application, run:

    ```
    pm2 stop moodCheckerServer.js
    ```

9. To access the application from your browser, you need to allow `HTTP` and `HTTPS` traffic on the `Security Group`  and allow `Port 8080` on the instance.

    - Navigate to the `EC2` Dashboard and select the instance.
    - Click on the `Security Group` of the instance.
    - Click on the `Inbound Rules` tab and edit the rules , adding a new rule with type `Custom TCP Rule`, Protocol `TCP`, Port Range `8080`, Source Anywhere.

10. You can now access the MoodCheck web app at `http://your-instance-public-dns:8080` on your browser.



---

## Usage

The server should now be running locally on port 8080. You can now access the MoodCheck web app at http://localhost:8080 on your browser.
If the port is already in use, you can change it in the `/moodcheck/moodCheckServer/moodCheckerServer.js` file on line 183.

### API Endpoints

You can use the MoodCheck app to analyze the emotion and sentiment of text content using the following API endpoints:

- **Analyze Emotion from a URL**:

    ```bash
    GET /url/emotion?url=<URL_TO_ANALYZE>
    ```

- **Analyze Sentiment from a URL**:

    ```bash
    GET /url/sentiment?url=<URL_TO_ANALYZE>
    ```

- **Analyze Emotion from Text**:

    ```bash
    GET /text/emotion?text=<TEXT_TO_ANALYZE>
    ```

- **Analyze Sentiment from Text**:

    ```bash
    GET /text/sentiment?text=<TEXT_TO_ANALYZE>
    ```

Replace `<URL_TO_ANALYZE>` and `<TEXT_TO_ANALYZE>` with the URL or text you want to analyze.

Example usage:

- Analyze emotion from a URL:

    ```bash
    GET http://localhost:8080/url/emotion?url=https://example.com
    ```

    or with curl on the command line:

    ```bash
    curl http://localhost:8080/url/emotion?url=https://example.com
    ```

- Analyze sentiment from text:

    ```bash
    GET http://localhost:8080/text/sentiment?text=Hello, I am feeling great today!
    ```

    or with curl on the command line:

    ```bash
    curl http://localhost:8080/text/sentiment?text=Hello, I am feeling great today!
    ```

    
---

## License

This project is licensed under the Apache License, Version 2.0. Please refer to the [LICENSE](./LICENSE) file in the parent folder for more details.

---
