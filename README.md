# Project Management System

A full-stack Project Management System designed to help users create projects, manage tasks, and track progress efficiently.  
The application is built with a separated frontend and backend architecture for scalability and maintainability.

---

## Table of Contents
- Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Environment Setup
- Running the Application
- Usage
- Screenshots
- Future Improvements
- Contributing
- License

---

## Overview

This Project Management System allows users to:
- Create and manage multiple projects
- Add, update, and track tasks
- Monitor task progress and status
- Maintain a clean separation between client and server logic

---

## Features

- Project creation and management
- Task creation and assignment
- Task status tracking (Pending, In Progress, Completed)
- RESTful backend architecture
- Modular and scalable codebase
- Client–server separation

---

## Tech Stack

### Frontend
- JavaScript
- React
- HTML / CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Tools
- Git & GitHub
- npm
- dotenv

---

## Project Structure

```
project-management-main/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/iamsuyashhhhh/project-management-main.git
cd project-management-main
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Client Dependencies
```bash
cd ../client
npm install
```

---

## Environment Setup

### Backend
Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_database_connection_string
```

### Client (Optional)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Running the Application

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd client
npm start
```

---

## Usage

1. Start backend and frontend servers
2. Open the application in browser
3. Create a project
4. Add and manage tasks
5. Track progress

---

## Screenshots

Add screenshots inside a `screenshots/` folder and reference them here.

---

## Future Improvements

- Authentication & authorization
- Role-based access
- Drag-and-drop task board
- Deployment support

---

## Contributing

Contributions are welcome. Fork the repo, create a branch, commit changes, and open a pull request.

---

## License

MIT License
