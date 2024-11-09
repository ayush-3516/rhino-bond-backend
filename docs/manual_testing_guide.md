# Manual Testing Guide

This guide provides detailed instructions on how to manually test the app using Postman or cURL.

## Using Postman

1. Open Postman.
2. Create a new request.
3. Set the request method (e.g., GET, POST) and the URL (e.g., `http://localhost:3000/auth/register`).
4. Add any necessary headers or body parameters as specified below.
5. Send the request and observe the response.

## Using cURL

1. Open a new terminal or command prompt.
2. Use the `curl` command to send requests. For example:
   ```sh
   curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'
   ```
3. Observe the response in the terminal.

### Example Requests

#### Auth Controller

- **POST /auth/register**
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

- **POST /auth/login**
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

- **POST /auth/verify-otp**
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "testuser",
      "otp": "123456"
    }
    ```

- **POST /auth/refresh-token**
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "refreshToken": "your-refresh-token"
    }
    ```

- **POST /auth/logout**
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "testuser"
    }
    ```

#### Notification Controller

- **GET /notifications**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **PUT /notifications/:id/read**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "read": true
    }
    ```

#### Points Controller

- **GET /points**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **POST /points**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "points": 100
    }
    ```

#### Product Controller

- **GET /products**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **POST /products**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "name": "Product Name",
      "price": 99.99
    }
    ```

#### QR Controller

- **POST /qr/generate**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "data": "your-data-to-encode"
    }
    ```

- **POST /qr/scan**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "qrCode": "your-qr-code-data"
    }
    ```

#### Rewards Controller

- **GET /rewards**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **POST /rewards**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "name": "Reward Name",
      "pointsRequired": 500
    }
    ```

#### Support Controller

- **GET /support**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **POST /support**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "message": "Your support message"
    }
    ```

#### User Controller

- **GET /users/:id**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token"
    }
    ```

- **PUT /users/:id**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "newusername",
      "password": "newpassword"
    }
    ```

- **POST /users**
  - Headers:
    ```json
    {
      "Authorization": "Bearer your-access-token",
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "username": "newuser",
      "password": "newpassword"
    }
    ```

You can now manually test these endpoints to verify the functionality of the app.
