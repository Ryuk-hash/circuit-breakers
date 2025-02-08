# **Circuit Breakers**

## **Overview**

This is a Node.js-based API servers that supports maintenance mode and service toggling using MongoDB, Redis, and Pub/Sub messaging.

## **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** (18 or later)
- **MongoDB**
- **Redis**

## **Setup Instructions**

### **1. Clone the Repository**

```sh
git clone https://github.com/Ryuk-hash/node-circuit-breakers.git
cd node-circuit-breakers
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Start MongoDB**

If MongoDB is not already running, start it with:

```sh
mongod
```

If you encounter errors, create directory if doesn't exist and specify the database path:

```sh
mkdir ~/mongodb/data/db
```

```sh
mongod --dbpath ~/mongodb/data/db
```

### **4. Start Redis**

If Redis is not already running, start it with:

```sh
redis-server
```

### **5. Configure Environment Variables**

Create a `.env` file in the root directory and add the necessary configurations:

```env
REDIS_ENDPOINT=localhost
REDIS_PORT=6379
DB_URI=mongodb://localhost:27017/circuit-breakers?readPreference=primary&directConnection=true&ssl=false
POSTS_API=http://localhost:3000
USERS_API=http://localhost:5000
```

### **6. Start the Server**

```sh
npm start
```

- The post server should now be running at `http://localhost:3000`.
- The user server should now be running at `http://localhost:5000`.
- The admin server should now be running at `http://localhost:8000`.

## **Maintenance Mode Toggle**

- **PATCH** `/api/maintenance`
  - Enables/disables maintenance mode or enables/disables user service interaction
  - Request Body (JSON):
    ```json
    {
      "isMaintenance": true,
      "maintenanceInfo": { "message": "We are upgrading our system.", "completesOn": "2025-02-10T12:00:00Z" },
      "isUserServiceEnabled": false
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Updated maintenance.",
      "data": { "maintenance": { ... } }
    }
    ```
