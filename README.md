# Online Student Feedback System

A simple college-level Online Student Feedback System built with React JS, Node.js, Express.js, and MongoDB.

## Features
- Student registration and login
- JWT authentication
- Course selection
- 1–5 star rating
- Comments
- Feedback submission confirmation
- Faculty/Admin login
- Admin dashboard for viewing feedback
- Git/GitHub workflow demonstration

## Technology
- Frontend: React + Vite
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs

## Project Structure
```text
student-feedback-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas
- Git
- A GitHub account

## Installation

### 1. Backend
```bash
cd server
npm install
```

Create `.env` from `.env.example`.

Example:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_feedback
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Seed the sample admin and courses:
```bash
npm run seed
```

Start backend:
```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Demo Accounts

After `npm run seed`:

**Admin**
- Email: `admin@example.com`
- Password: `Admin@123`

A student account can be created from the Register page.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register student |
| POST | `/api/auth/login` | Student/admin login |
| GET | `/api/courses` | Get courses |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback/mine` | Student's feedback |
| GET | `/api/feedback` | Admin/faculty feedback list |
| GET | `/api/health` | API health check |

## Screenshots
Add screenshots of:
1. Login
2. Student dashboard
3. Feedback form
4. Submission success
5. Admin dashboard
6. GitHub repository
7. Pull Request

## GitHub Workflow
```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-feedback-system.git
git push -u origin main

git checkout -b feature/feedback-ui
git add .
git commit -m "Add feedback UI"
git push -u origin feature/feedback-ui
```

Then create a Pull Request on GitHub and merge it.

## Future Enhancements
- Anonymous feedback option
- Course-wise analytics and charts
- Faculty-specific dashboards
- Export feedback to CSV/PDF
- Password reset
- Email notifications
## Branch Development

Student feedback features are maintained and tested using Git branches.