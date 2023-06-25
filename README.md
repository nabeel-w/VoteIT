# Vote It

This repository contains the code for a secure vote system implemented using Node.js. The system includes features such as user registration, login with two-factor authentication (2FA), and verification of the authentication code.

## Features

- User registration: Users can register by providing their name and phone number.
- Two-factor authentication (2FA): After registration, users can log in by providing their phone number. The system generates a unique verification code and sends it to the user's registered phone number using Twilio API.
- Verification of authentication code: Users must enter the received authentication code to complete the login process.
- Secure phone number storage: User phone numbers are securely hashed using bcrypt before storing them in the database.
- JSON Web Tokens (JWT): JWT is used to generate and validate tokens for authentication.

## Prerequisites

Before running the code, make sure you have the following prerequisites:

- Node.js installed on your machine
- MongoDB installed and running
- Twilio account with an active phone number and API credentials

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/vote-system.git
2. Install the dependencies:
   ```bash
     cd vote-system
      npm install
3. Set up environment variables:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables and provide your own values:
     ```env
     TWILIO_ACCOUNT_SID=your-twilio-account-sid
     TWILIO_AUTH_TOKEN=your-twilio-auth-token
     JWT_SECRET=your-jwt-secret
     MESSAGING_SERVICE_SID=your-twilio-messaging-service-sid
4. Start the server:
   ```bash
      node index.js
## API Endpoints
- `POST /register`: Register a new user by providing their name and phone number.
- `POST /login`: Login with phone number. The system generates a verification code and sends it to the user's phone number.
- `POST /verify`: Verify the authentication code received during the login process.
## Database
The system uses MongoDB as the database to store user information. Make sure you have MongoDB installed and running on your local machine. The connection string is specified in the code: `mongodb://127.0.0.1:27017/voteDB`. Modify it if your MongoDB instance is running on a different address or port.
## Acknowledgements

This project utilizes the following npm packages:

- Express: Fast, unopinionated, minimalist web framework for Node.js
- Bcrypt: Password hashing library
- Twilio: Library for interacting with the Twilio API
- Body-parser: Middleware for parsing request bodies
- Mongoose: MongoDB object modeling tool
- Jsonwebtoken: JSON Web Token implementation

Special thanks to the developers of these packages for their contributions to the open-source community.
