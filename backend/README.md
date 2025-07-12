# HackJam 2025 Team 3 Backend

## Project Overview
This is the backend for the HackJam 2025 Team 3 project, built with Node.js, Express, and MongoDB. It supports user authentication, alumni achievement tracking, community engagement, and gamification features.

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd HackJam_2025_Team_3/backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```
MONGO_URI=mongodb://localhost:27017/hackjam2025
JWT_SECRET=your_jwt_secret
PORT=3000
```

- Adjust `MONGO_URI` as needed for your MongoDB setup.
- Set a strong `JWT_SECRET` for production.

### 4. Start the Server
```sh
npm start
```
The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### **Authentication**
#### Register
- **POST** `/auth/register`
- **Request Body:**
```json
{
  "firstName": "Padmaja",
  "lastName": "Doe",
  "email": "padmaja@example.com",
  "password": "StrongPassword123",
  "location": "City",
  "role": "learner"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "userId": "<user_id>"
}
```

#### Login
- **POST** `/auth/login`
- **Request Body:**
```json
{
  "email": "padmaja@example.com",
  "password": "StrongPassword123"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "userId": "<user_id>"
}
```

---

### **Achievements**
- **All routes require JWT in `Authorization: Bearer <token>` header**

#### Create Achievement
- **POST** `/api/achievements`
- **Request Body:**
```json
{
  "type": "internship", // "interview", "job", "certification"
  "title": "Google Internship",
  "description": "Summer internship at Google",
  "date": "2024-06-01"
}
```
- **Response:** Achievement object

#### Get User Achievements
- **GET** `/api/achievements`
- **Response:**
```json
[
  {
    "_id": "...",
    "user": "...",
    "type": "internship",
    "title": "...",
    "description": "...",
    "date": "...",
    "createdAt": "..."
  }
]
```

#### Update Achievement
- **PUT** `/api/achievements/:id`
- **Request Body:** (fields to update)
- **Response:** Updated achievement object

#### Delete Achievement
- **DELETE** `/api/achievements/:id`
- **Response:** `{ "message": "Deleted" }`

---

### **Engagements**
#### Create Engagement
- **POST** `/api/engagements`
- **Request Body:**
```json
{
  "type": "mentorship", // "peer_group", "social_event"
  "title": "Peer Mentoring",
  "description": "Mentored juniors",
  "date": "2024-05-15"
}
```
- **Response:** Engagement object

#### Get User Engagements
- **GET** `/api/engagements`
- **Response:** Array of engagement objects

#### Update Engagement
- **PUT** `/api/engagements/:id`
- **Request Body:** (fields to update)
- **Response:** Updated engagement object

#### Delete Engagement
- **DELETE** `/api/engagements/:id`
- **Response:** `{ "message": "Deleted" }`

---

### **Badges**
#### Create Badge
- **POST** `/api/badges`
- **Request Body:**
```json
{
  "name": "First Internship",
  "description": "Awarded for completing your first internship",
  "icon": "🎉",
  "criteria": "Complete 1 internship"
}
```
- **Response:** Badge object

#### Get All Badges
- **GET** `/api/badges`
- **Response:** Array of badge objects

#### Update Badge
- **PUT** `/api/badges/:id`
- **Request Body:** (fields to update)
- **Response:** Updated badge object

#### Delete Badge
- **DELETE** `/api/badges/:id`
- **Response:** `{ "message": "Deleted" }`

---

### **Tasks**
#### Create Task
- **POST** `/api/tasks`
- **Request Body:**
```json
{
  "description": "Complete your profile",
  "type": "daily", // or "weekly"
  "frequency": "daily", // or "weekly"
  "isActive": true
}
```
- **Response:** Task object

#### Get All Tasks
- **GET** `/api/tasks`
- **Response:** Array of task objects

#### Update Task
- **PUT** `/api/tasks/:id`
- **Request Body:** (fields to update)
- **Response:** Updated task object

#### Delete Task
- **DELETE** `/api/tasks/:id`
- **Response:** `{ "message": "Deleted" }`

---

### **Gamification**
#### Get User Points
- **GET** `/api/gamification/points`
- **Response:**
```json
{
  "user": "<user_id>",
  "totalPoints": 100,
  "lastLogin": "2024-06-01T00:00:00.000Z",
  "streak": 3
}
```

#### Add Points
- **POST** `/api/gamification/points`
- **Request Body:**
```json
{
  "amount": 10
}
```
- **Response:** Updated points object

#### Daily Login Bonus
- **POST** `/api/gamification/daily-login`
- **Response:**
```json
{
  "message": "Daily login bonus awarded",
  "points": { ... }
}
```

#### Get User Badges
- **GET** `/api/gamification/badges`
- **Response:** Array of user badge objects

#### Award Badge
- **POST** `/api/gamification/badges`
- **Request Body:**
```json
{
  "badgeId": "<badge_id>"
}
```
- **Response:** UserBadge object

#### Get User Tasks
- **GET** `/api/gamification/tasks`
- **Response:** Array of user task objects

#### Complete Task
- **POST** `/api/gamification/tasks/complete`
- **Request Body:**
```json
{
  "userTaskId": "<user_task_id>"
}
```
- **Response:**
```json
{
  "message": "Task completed",
  "userTask": { ... },
  "points": { ... }
}
```

---

## Notes
- All protected routes require a valid JWT in the `Authorization` header: `Bearer <token>`
- All request and response bodies are in JSON format.
- For development, set `NODE_ENV=development` to see detailed error messages.

---

## License
MIT 