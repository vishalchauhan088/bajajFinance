# Project Name

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Connection](#database-connection)
- [API Endpoints](#api-endpoints)
  - [GET /bfhl](#get-bfhl)
  - [POST /bfhl](#post-bfhl)
  - [GET /bfhl/filter](#get-bfhlfilter)
- [Example Requests](#example-requests)
  - [GET Request](#1-get-bfhl)
  - [POST Request](#2-post-bfhl)
- [Error Handling](#error-handling)

## Overview

This project is a backend API that handles user data, allowing filtering based on numbers and alphabets. It provides endpoints for retrieving and storing data efficiently.

## Project Structure

```
/project-root
│── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│── .env
│── server.js
│── package.json
│── README.md
```

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file and add the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

## Database Connection

This project uses **MongoDB** with Mongoose. The database connection is configured in `server.js`.

## API Endpoints

### **GET /bfhl**

- **Description**: Fetch basic API status.
- **Response**:
  ```json
  {
    "is_success": true,
    "message": "API is working"
  }
  ```

### **POST /bfhl**

- **Description**: Save user data including numbers and alphabets.
- **Request Body**:
  ```json
  {
    "status": "Active",
    "full_name": "John Doe",
    "dob": "17/09/2000",
    "collegeEmailId": "john@xyz.com",
    "collegeRollNumber": "ABCD1234",
    "numbers": [1, 2, 3, 4, 5],
    "alphabets": ["M", "B"]
  }
  ```
- **Response**:
  ```json
  {
    "is_success": true,
    "message": "User data saved successfully"
  }
  ```

### **GET /bfhl/filter**

- **Description**: Fetch users based on provided numbers and alphabets.
- **Query Parameters**:
  ```json
  {
    "numbers": [1, 2],
    "alphabets": ["M"]
  }
  ```
- **Response**:
  ```json
  {
    "is_success": true,
    "filtered_data": {
      "numbers": [1, 2],
      "alphabets": ["M"]
    }
  }
  ```

## Example Requests

### **1. GET /bfhl**

```sh
curl -X GET http://localhost:3000/bfhl
```

### **2. POST /bfhl**

```sh
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{
  "status": "Active",
  "full_name": "John Doe 2",
  "dob": "17/09/2000",
  "collegeEmailId": "john2@xyz.com",
  "collegeRollNumber": "ABCD1234",
  "numbers": [1, 2, 3, 4, 5, 7],
  "alphabets": ["M", "B", "C"]
}'
```

## Error Handling

All API responses include a success flag. If an error occurs, responses follow this format:

```json
{
  "is_success": false,
  "error": "Error description here"
}
```
