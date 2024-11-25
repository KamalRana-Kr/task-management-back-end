- Task Management Application Setup and Documentation
This guide provides detailed steps for setting up and running the Task Management Application, along with an overview of its features, modules, and workflow.

- Installation
Install Required Dependencies
Run the following command to install the required Node.js modules and dependencies:

- npm install
Install Additional NestJS-Specific Packages (if required)
If your project uses specific NestJS packages, install them as needed:


- npm install @nestjs/<package-name>
Running the Application
Development Mode


- npm run start
Production Mode
Build the application and start it in production mode:

- npm run build
npm run start:prod
Database Setup
Create the Database
Set up a MongoDB database named:


- task_management
Configure the Database
Ensure the following variables are defined in the .env file for the database connection:

DB_URI: The MongoDB connection string (e.g., mongodb://localhost:27017).
DB_NAME: The name of the database (task_management).
Environment Variables
Store all sensitive configuration settings in a .env file. Below is an example:


DB_URI=mongodb://localhost:27017
DB_NAME=task_management
JWT_SECRET=your-secret-key
PORT=5000
DB_URI: MongoDB connection string.
DB_NAME: Name of the database.
JWT_SECRET: Secret key used for JWT authentication.
PORT: Port on which the application will run.
API Documentation
Access the auto-generated API documentation at:



http://localhost:5000/api/docs
The documentation includes:

Available endpoints.
Request/response structures.
Example requests.
This is generated using tools like Swagger.

Project Modules and Flow
Overview
The Task Management Application allows users to:

Log in to their accounts.
Create, update, and manage tasks.
View task details.
List all tasks with their current statuses.
Modules
Auth Module

Handles user authentication and authorization.
Implements secure login and token-based authentication using JWT.
Supports role-based or user-specific task management.
Database Module

Manages MongoDB database connections.
Handles schema definitions and interactions with the task_management database.
Uses Mongoose or a similar ORM for seamless database operations.
Task Module

Provides task-related APIs:
Create Task: Allows users to create new tasks.
Update Task Status: Lets users update the status of existing tasks.
List All Tasks: Retrieves all tasks created by the user.
View Task Details: Fetches detailed information about a specific task.
Application Flow
User Authentication

Users log in using their credentials.
Upon successful authentication, a JWT token is issued.
Task Management

Create Tasks: Users can create tasks with details like title, description, and priority.
Update Tasks: Tasks can be updated to reflect changes in status or properties.
List Tasks: Users can retrieve a list of all their tasks.
View Task Details: Users can fetch detailed information for specific tasks.
