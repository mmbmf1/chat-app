# Chat App

A real-time chat application built with Next.js and Socket.IO.

## Description

This is a real-time chat application that allows users to communicate with each other instantly. The app is built using Next.js for the frontend and Socket.IO for real-time communication. It can only be run locally.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or above)
- yarn (package manager)

## Installation and Running Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/chat-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd chat-app
   ```
3. Install the dependencies:
   ```sh
   yarn install
   ```
4. Start the Next.js development application:
   ```sh
   yarn dev
   ```
5. Open your browser and go to `http://localhost:3000` to start using the chat app.

## Server Configuration

The server is configured to run on `http://localhost:3000` by default. If you need to change the hostname or port, modify the `src/server.mjs` file accordingly.

## Client Code Explanation

The client-side code in `pages/index.js` establishes a connection to the server using Socket.IO. It manages the chat functionality, including sending and receiving messages in real-time.
