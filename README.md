<h1 align="center">To Do Application</h1>

<p align="center">
</p>

<p align="center">
To-Do Application Backend
</p>


## Overview

This is the backend implementation for a To-Do application, designed with robust features like user authentication, profile management, CRUD operations for to-dos, and advanced functionalities like category management, due date reminders, and search. The backend is built using Node.js, Express, and MongoDB, and is deployed on Render.


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
- [Installation](#installation)
- [Deployment](#deployment)
- [How To Test](#how-to-test)
- [API Endpoints](#api-endpoints)
- [License](#license)
## Features

1. User Authentication
- Sign-up, Login, and Logout functionalities.
- JWT-based authentication for secure access to APIs.

2. User Profile Management
- Endpoints to view and update user profile details.

3. To-Do Management
- Create: Add new to-do items with properties:
  title, description, dueDate, priority (low, medium, high), and status (pending, completed).
- Read: Retrieve to-dos with: Filtering (by status, priority, dueDate).Sorting and pagination.
- Update: Modify to-do properties or status.
- Delete: Soft delete or permanently remove a to-do.
  
4. Additional Features
- Category Management: Assign categories/tags to to-dos.
- Due Date Reminders: Fetch to-dos nearing their due date (e.g., within the next 3 days).
- Search: Find to-dos based on keywords in title or description.

5. Validation and Error Handling
- Input validation for users and to-dos.
- Clear and descriptive error messages with appropriate status codes.


## Technology Stack
- **MongoDB:**  A robust NoSQL database that securely stores and manages application data.
- **Express.js:** Provide fast and flexible web application framework powering the server-side functionality.
- **Express-validator:** To Validate input data 
- **bcrypt:** A reliable library for encrypting passwords, enhancing user data security.
- **jsonwebtoken:** secure method for implementing authentication and authorization mechanisms.



## Project Setup
Prerequisites
Ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (Atlas or local instance)
- Postman (for testing)
- Environment Variables

  ```
  MONGO_URI=<Your MongoDB Connection String>
  JWT_SECRET=<Your JWT Secret>
  PORT=<Port Number>
  ```

## Installation

To run Todo App locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kartik-Shrikhande/To-Do-Application-Backend-Development.git
   ```

2. **Install the server dependencies:**

   ```bash
  
   npm install
   ```
3.  __Configure Enviroment Variables__ 
    - Create a .env file in the server's root directory and set up some environment variables.
      
4. **Set up the database:**
    - Create a MongoDB database or use an existing one
    - Ensure that you have Mongoose installed and running on your local machine

5. **Run the server:**

   ```bash
   npm start
   ```

7. **Access the app:**
   
   Open your web browser and visit `http://localhost:3000` to use todo app.

## Deployment
```
https://to-do-application-backend-development.onrender.com

```

## How to Test
- Import the Postman collection.
- Use the following base URL for testing:
  ```
  {{base_url}} = https://to-do-application-backend-development.onrender.com

  ```

For endpoints requiring authentication:
- Log in to get a JWT token.
- Add the token as a header:
  ```
  Authorization: Bearer <your_token>

  ```
## API Endpoints
**User Profile API Endpoints :-**


| **HTTP Method** | **Endpoint**               | **Description**                                                                                         | **Authentication Required** |
|-----------------|----------------------------|---------------------------------------------------------------------------------------------------------|-----------------------------|
| POST            | `/user/signup`             | Allows a new user to sign up by providing valid credentials.                                            | NO                          |
| POST            | `/user/login`              | Logs in a user and returns a JWT token for authentication.                                              | NO                          |
| GET             | `/user/profile`            | Retrieves the profile details of the currently logged-in user.                                           | YES                         |
| DELETE          | `/user/delete-profile`     | Deletes the logged-in user's profile from the system.                                                   | YES                         |
| PUT             | `/user/update-profile`     | Updates the profile information of the logged-in user with validated input fields.                      | YES                         |
| POST            | `/user/logout`             | Logs out the user by invalidating the current JWT token.                                                | YES                         |



**ToDo's API Endpoints :-**


| **HTTP Method** | **Endpoint**         | **Description**                                                                                           | **Authentication Required** |
|------------------|----------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------|
| POST             | `/todo/create`           | Creates a new to-do item with properties like title, description, due date, priority, and status.         | Yes                         |
| GET              | `/todo/get/:filter`      | Retrieves to-do items based on filters such as status, priority, or due date. Supports sorting/pagination.| Yes                         |
| PUT              | `/todo/update/:id`       | Updates an existing to-do item, allowing changes to properties like status, priority, and due date.       | Yes                         |
| DELETE           | `/todo/delete/:id`       | Deletes a to-do item by its ID. Can be configured for soft or permanent deletion.                         | Yes                         |
| PATCH            | `/todo/category/:id`     | Assigns a category or tag to a specific to-do item by its ID.                                             | Yes                         |
| GET              | `/todo/reminders`        | Retrieves a list of to-do items nearing their due dates (e.g., within the next 3 days).                   | Yes                         |
| GET              | `/todo/search/:keyword`  | Searches to-do items based on a keyword found in their title or description.                              | Yes                         |




## License

This project is licensed under the MIT License. ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
