\# Real-Time Chat Application



A real-time chat application built using \*\*React, Node.js, Express.js, Socket.io, and MongoDB\*\*. The application allows multiple users to send and receive messages instantly without refreshing the page.



\## Features



\* Real-time messaging using Socket.io

\* Multiple users can communicate simultaneously

\* Username-based chat

\* Message timestamps

\* Previous messages are loaded when the application is refreshed

\* Online connection status

\* REST API for sending messages

\* REST API for fetching chat history

\* MongoDB message storage

\* Responsive and user-friendly chat interface

\* Express.js backend

\* React frontend



\## Tech Stack



\### Frontend



\* React

\* Vite

\* CSS

\* Axios

\* Socket.io Client



\### Backend



\* Node.js

\* Express.js

\* Socket.io

\* MongoDB

\* Mongoose

\* Axios



\## Project Structure



```text

realtime-chat-app/

│

├── client/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── App.jsx

│   │   ├── App.css

│   │   ├── index.css

│   │   └── main.jsx

│   ├── package.json

│   └── vite.config.js

│

├── server/

│   ├── config/

│   │   └── db.js

│   ├── controllers/

│   │   └── messageController.js

│   ├── models/

│   │   └── Message.js

│   ├── routes/

│   │   └── messageRoutes.js

│   ├── server.js

│   └── package.json

│

├── .gitignore

├── package.json

├── package-lock.json

└── README.md

```



\## Prerequisites



Make sure the following are installed:



\* Node.js

\* npm

\* MongoDB



You can also use MongoDB Atlas instead of a local MongoDB installation.



\## Installation



\### 1. Clone the repository



```bash

git clone https://github.com/upadhyaykapil142-prog/realtime-chat-app.git

cd realtime-chat-app

```



\### 2. Install root dependencies



```bash

npm install

```



\### 3. Install frontend dependencies



```bash

cd client

npm install

```



\### 4. Install backend dependencies



Open another terminal and run:



```bash

cd server

npm install

```



\## Environment Variables



Create a `.env` file inside the `server` directory.



Example:



```env

PORT=5000

MONGO\_URI=your\_mongodb\_connection\_string

```



Do not commit the `.env` file to GitHub.



\## Running the Application



\### Start the Backend



From the `server` directory:



```bash

npm start

```



The backend will run on:



```text

http://localhost:5000

```



\### Start the Frontend



From the `client` directory:



```bash

npm run dev

```



The frontend will normally run on:



```text

http://localhost:5173

```



Open the frontend URL in your browser.



\## REST API



\### Send Message



```http

POST /api/messages

```



Example request:



```json

{

&#x20; "username": "Kapil",

&#x20; "message": "Hello!"

}

```



\### Fetch Chat History



```http

GET /api/messages

```



This endpoint returns previously stored chat messages.



\## Socket.io Real-Time Communication



Socket.io is used to deliver messages instantly between connected users.



When a user sends a message:



1\. The frontend sends the message to the backend.

2\. The backend processes/stores the message.

3\. Socket.io broadcasts the new message.

4\. Connected clients receive the message immediately.

5\. The UI updates without requiring a page refresh.



This satisfies the mandatory real-time communication requirement of the assignment.



\## Connection Handling



The application tracks Socket.io connections and handles users joining and leaving the chat.



The frontend also displays the connection status so users can see whether the application is online.



\## Message History



Messages are stored in MongoDB.



When the application loads or refreshes, the frontend requests the existing messages from the backend API and displays the previous chat history.



\## Design Decisions



\### React + Vite



React with Vite was used to create a fast and maintainable frontend application.



\### Express.js



Express provides a lightweight backend for REST APIs and works well with Socket.io.



\### Socket.io



Socket.io was selected because real-time communication is a mandatory requirement of the assignment. It allows messages to be broadcast instantly to connected clients.



\### MongoDB



MongoDB is used to persist chat messages so that previous messages can be retrieved after refreshing the application.



\### Component-Based UI



The React application is organized into reusable components and separates frontend presentation from backend communication.



\## Assumptions



\* Users provide a username when using the chat application.

\* Authentication is not required for this assignment.

\* The application is intended for demonstration/testing purposes.

\* MongoDB is available locally or through MongoDB Atlas.

\* The application is run locally unless a deployment URL is provided separately.



\## Testing



The application was tested using two separate browser sessions:



\* Normal Chrome window

\* Chrome Incognito window



The following real-time communication was verified:



```text

User 1 → sends message → User 2 receives instantly

User 2 → sends message → User 1 receives instantly

```



Messages were also verified after refreshing the application to confirm that previous chat history is retained.



\## Assignment Requirements



The application implements:



\* React frontend

\* Node.js + Express backend

\* REST APIs

\* Socket.io real-time communication

\* Instant message delivery without page refresh

\* Message timestamps

\* Previous message history

\* Connection status

\* MongoDB message persistence

\* README documentation



\## Repository



GitHub:



https://github.com/upadhyaykapil142-prog/realtime-chat-app



\## Author



\*\*Kapil Upadhyay\*\*



Built as a real-time chat application assignment.



