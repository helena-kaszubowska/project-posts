# Project-Posts
Back-end RESTful API

## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[User Endpoints](#user-endpoints)**<br>
- **[Post Endpoints](#post-endpoints)**<br>
- **[Comment Endpoints](#comment-endpoints)**<br>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installing

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd project-posts
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory based on the `.env.example` provided.
5. Start the server:
   ```bash
   npm start
   ```

## Overview
- This application serves as a back-end for managing user posts. It provides endpoints for user registration, login, post creation, and retrieval.
- Implements authentication and authorization using JWT.
- RESTful API structure for clean and maintainable code.

## Back-end

- **Framework**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens 
- **Environment Variables**: Managed using `.env` file

## API Endpoints

### User Endpoints
| Method | Route                  | Description                      |
|--------|------------------------|----------------------------------|
| POST   | /api/users/signup      | Register a new user              |
| POST   | /api/users/login       | Login user and retrieve token    |

#### Register Endpoint
```http
POST /api/users/signup
```
**Request Body:**
```json
{
  "username": "new_user",
  "password": "password",
  "email": "user@example.com"
}
```
**Response:**
```json
{
  "id": "123",
  "username": "new_user",
  "email": "user@example.com"
}
```

#### Login Endpoint
```http
POST /api/users/login
```
**Request Body:**
```json
{
  "username": "new_user",
  "password": "password"
}
```
**Response:**
```json
{
  "token": "jwt-token"
}
```

### Post Endpoints
| Method | Route                  | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | /api/posts             | Create a new post                 |
| GET    | /api/posts             | Retrieve all posts                |
| GET    | /api/posts/:id         | Retrieve a specific post by ID    |
| PATCH  | /api/posts/:id         | Update a specific post by ID      |
| DELETE | /api/posts/:id         | Delete a specific post by ID      |

#### Create Post
```http
POST /api/posts
```
**Request Body:**
```json
{
  "title": "New Post",
  "content": "This is the content of the post.",
}
```
**Response:**
```json
{
    "message": "New Post",
    "post": {
        "title": "New Post",
        "content": "This is the content of the post.",
        "userId": "123",
        "comments": [],
        "_id": "456",
    }
}
```

#### Get All Posts
```http
GET /api/posts
```
**Response:**
```json


  "message": "Lista wszystkich postów",
  "posts": 
[
  {
    "title": "New Post",
            "content": "This is the content of the post.",
            "userId": {
                "name": "new_user" ,
                "email": "user@example.com"
            },
            "comments": [],
  }
]
```

#### Get Post By ID
```http
GET /api/posts/:id
```
**Response:**
```json

 "message": "Pobrano post",
  "posts": 
[
  {
    "title": "New Post",
            "content": "This is the content of the post.",
            "userId": {
                "name": "new_user" ,
                "email": "user@example.com"
            },
            "comments": [],
  }
]
```

#### Update Post By ID
```http
PATCH /api/posts/:id
```
**Request Body:**
```json
{
  "title": "Updated Post Title"
}
```
**Response:**
```json
{
    "title": "Updated title",
            "content": "This is the content of the post.",
            "userId": {
                "name": "This is the content of the post.",
                "email": "user@example.com"
            },
            "comments": [],
  }
```

#### Delete Post By ID
```http
DELETE /api/posts/:id
```
**Response:**
```json
{
  "message": "Post usunięty"
}
```

### Comment Endpoints
| Method | Route                  | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | /api/comments          | Create a new comment              |
| PATCH  | /api/comments/:id      | Update a specific comment by ID   |
| DELETE | /api/comments/:id      | Delete a specific comment by ID   |

#### Create Comment
```http
POST /api/comments
```
**Request Body:**
```json
{
  "content": "This is a comment.",
}
```
**Response:**
```json
{
 "content": "This is a comment.",
  "post_id": "456",
  "userId": "123",
  "id": "789",  
}
```

#### Update Comment By ID
```http
PATCH /api/comments/:id
```
**Request Body:**
```json
{
  "content": "Updated Comment Content"
}
```
**Response:**
```json
{
  "content": "Updated comment.",
  "post_id": "456",
  "userId": "123",
  "id": "789",  
}
```

#### Delete Comment By ID
```http
DELETE /api/comments/:id
```
**Response:**
```json
{
  "message": "Komentarz usunięty"
}
```

## Additional Information
- Ensure that MongoDB is running locally.
- Update the `.env` file with the necessary configurations (e.g., database URI, JWT secret).

---
