# Time Travel Advice App

This is a simple web application that provides humorous time travel advice based on user input. The application is designed with a solarpunk retrofuturistic theme and includes intentional security vulnerabilities for educational purposes.

## Features

- **Solarpunk Retrofuturistic Design**: A visually appealing frontend with a nature-inspired, futuristic aesthetic.
- **Time Travel Advice**: Enter a year or historical event to receive whimsical advice.
- **Intentional Vulnerabilities**: Demonstrates common AppSec vulnerabilities for educational purposes.

## Intentional Vulnerabilities

The application includes the following intentional vulnerabilities to demonstrate common security issues:

1. **Sensitive Data Exposure**: Sensitive data, such as API keys, are stored in plaintext within the code.
2. **Broken Authentication**: A weak authentication mechanism is implemented, with hardcoded credentials.
3. **Hardcoded Secrets**: Secrets are included directly in the source code.
4. **Libraries with Known Vulnerabilities**: Outdated libraries with known security issues are used.
5. **Input Validation Issues**: User inputs are not properly validated, allowing for potential injection attacks.
6. **Error Handling Exposing Sensitive Logs**: Error messages expose stack traces and sensitive information.
7. **No Rate Limiting**: Rate limiting is not implemented, allowing for potential abuse.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. **Clone the Repository**:
   ```bash
    git clone <repository-url>
    cd time-travel-advice
    npm install
    npm start

Open your browser and navigate to http://localhost:3000 to see the application in action.  

## Usage
Enter a year or historical event in the input field.
Click the "Get Advice" button to receive time travel advice.
Observe the intentional vulnerabilities in the backend code.
## Disclaimer
This application is for educational purposes only. The intentional vulnerabilities are included to demonstrate common security issues and should not be used in a production environment. Always follow best practices for securing your applications.


