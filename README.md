<h1 align="center">To Do Application</h1>

<p align="center">
</p>

<p align="center">
To-Do Application Backend
</p>


## Overview

This is the backend implementation for a To-Do application, designed with robust features like user authentication, profile management, CRUD operations for to-dos, and advanced functionalities like category management, due date reminders, and search. The backend is built using Node.js, Express, and MongoDB, and is deployed on Render.


## Features

Features
1. User Authentication
Sign-up, Login, and Logout functionalities.
JWT-based authentication for secure access to APIs.
2. User Profile Management
Endpoints to view and update user profile details.
3. To-Do Management
Create: Add new to-do items with properties:
title, description, dueDate, priority (low, medium, high), and status (pending, completed).
Read: Retrieve to-dos with:
Filtering (by status, priority, dueDate).
Sorting and pagination.
Update: Modify to-do properties or status.
Delete: Soft delete or permanently remove a to-do.
4. Additional Features
Category Management: Assign categories/tags to to-dos.
Due Date Reminders: Fetch to-dos nearing their due date (e.g., within the next 3 days).
Search: Find to-dos based on keywords in title or description.
5. Validation and Error Handling
Input validation for users and to-dos.
Clear and descriptive error messages with appropriate status codes.