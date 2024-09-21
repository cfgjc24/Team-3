# Team 3: JP Morgan Code for Good Lodestar Children Services

# Problem Statement

How might technology help assist and support Lodestar's in-field staff throughout the assignment of, preparation, and execution of in-home field visits and related tasks (timesheets, expense/mileage tracking, editing appointments)? With safety being of the utmost importance to Lodestar, how can technology specifically help ensure the safety of in-field providers as they visit client homes to provide care and services, without the companionship of another staff member? For this challenge, consider the following:

• How this tool can enable in-field staff to learn about and "raise their hand" for open cases, rapidly access resources for their treatments, efficiently document the progress of their clients, and communicate with the program management team at Lodestar

• How this tool may incorporate Electronic Visit Verification/GPS Locator solutions

• How this tool may be accessible/used in high pressure situations or if a crisis arises

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Technologies:

Next.js – Server-side rendering, routing, and React framework.

React – The JavaScript library used to build the user interface.

TypeScript – TypeScript is used to add static typing to your JavaScript code, improving code quality and developer experience.

Tailwind CSS – A utility-first CSS framework for styling your components.

CSS Modules – For component-based styling.

Node.js – The runtime environment for building and running JavaScript applications.

Shad - A UI component library used for design elements.

ExpressJS - Backend framework for building the server-side API.

# API Documentation

Deepgram API
OpenAI API

## Express API for Provider and Case Management

This Express API provides endpoints for managing providers, cases, session notes, and clients. It's designed to handle authentication and serve data for a provider and case management system.

### Table of Contents

- [Setup](#setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Data](#data)

### Setup

1. Ensure you have Node.js installed on your system.
2. Clone this repository to your local machine.
3. Install the required dependencies:

```bash
npm install
```

### Running the Server

To start the server, run the following command:

```bash
node server.js
```

The server will start running on `http://localhost:4000` by default. You can change the port by setting the `PORT` environment variable.

### API Endpoints

#### Providers

- `GET /providers`: Get all providers
- `GET /providers/:id`: Get a specific provider by ID

#### Cases

- `GET /`: Get all cases
- `GET /cases/provider/:providerId`: Get all cases for a specific provider
- `GET /cases/open/provider/:providerId`: Get all open cases for a specific provider

#### Session Notes

- `GET /session_notes`: Get all session notes
- `GET /session_notes/provider/:providerId`: Get all session notes for a specific provider

#### Clients

- `GET /clients`: Get all clients

#### Authentication

- `POST /sign-in`: Attempt to sign in a user

### Authentication

The API uses a simple authentication mechanism. To sign in, send a POST request to the `/sign-in` endpoint with the user's credentials in the request body.

Example:

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

### Data

The API uses mock data stored in JSON files. The data includes:

- Provider data
- Case data
- Session note data
- Client data
- Admin data

This data is imported from the `./data/data.js` file.

### CORS

Cross-Origin Resource Sharing (CORS) is enabled for all origins.

### Error Handling

The API includes basic error handling for cases where resources are not found. In such cases, it returns a 404 status code with an appropriate error message.

### Contributing

To contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

### License

MIT License

Copyright (c) 2024 Jason Zheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
