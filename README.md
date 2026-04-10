# 🔐 Auth Token Logs System

A secure and scalable backend system that issues authentication tokens, authorizes users to perform CRUD operations, and maintains detailed activity logs associated with each token.

---

## 🚀 Overview

**Auth Token Logs** is designed to demonstrate a clean and practical implementation of token-based authentication with activity tracking. Once a user is issued a token, they can interact with the system based on their authorization level — while every action is transparently logged for auditing and monitoring.

This project is ideal for learning and implementing:
- Token-based authentication
- Secure API design
- Activity logging & traceability
- CRUD operation control via authorization

GitHub Repository:  
https://github.com/hammadansari0/auth-token-logs

---

## ✨ Features

### 🔑 Token Generation
- Secure issuance of unique authentication tokens
- Tokens act as identity for all user operations
- Designed for extensibility (JWT or custom token strategies)

### 🛠 CRUD Operations
- Create, Read, Update, Delete support
- Access controlled via authentication tokens
- Each request is validated before execution

### 📜 Token-Based Logging
- Every request made with a token is logged
- Logs include:
  - Token identifier
  - Action performed
  - Endpoint accessed
  - HTTP method
  - Timestamp
  - Status (Success/Failure)

### 🔍 Activity Tracking
- Full traceability of user actions
- Helps in debugging, monitoring, and auditing
- Token-wise log history available

---

## ⚙️ How It Works

1. **Token Generation**
   - User requests an auth token from the system
   - A unique token is generated and returned

2. **Request Authentication**
   - Token is sent in request headers:
     ```
     Authorization: Bearer <token>
     ```
   - System validates token before processing

3. **CRUD Operations**
   - If token is valid, requested operation is executed

4. **Logging System**
   - Every request is recorded with full metadata
   - Logs are stored for auditing and tracking

---

## 🧪 API Workflow Example

```bash
# Generate Token
POST /auth/token

# Use Token in Requests
Authorization: Bearer <your-token>

# CRUD Operations
GET    /resources
POST   /resources
PUT    /resources/:id
DELETE /resources/:id
