# APSCE Alumni Portal

A robust, full-stack web application designed for the **APS College of Engineering (APSCE)** to bridge the gap between current students and alumni. This platform facilitates networking, mentorship requests, and career tracking through a secure, role-based ecosystem.

---

## 🚀 Features

- **Role-Based Authentication:** Distinct registration and login pipelines for Students, Alumni, and Admins.
- **Secure Onboarding:** Secure registration backed by Email OTP verification using Nodemailer.
- **Alumni Directory:** Searchable and filterable directory of alumni with LinkedIn integration for easy profiling.
- **Dynamic Dashboard:** Custom metrics and interactive elements customized per user role.
- **Relational Backend:** Structured MySQL database ensuring data integrity and optimized queries.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT) & bcrypt hashing
- **Mailing Service:** Nodemailer (SMTP via Google App Passwords)

---

## 📋 Required Project Configurations (Create Locally)

To make this project work properly and safely, ensure you create these two files in your root directory before pushing to GitHub.

### 1. Copy this into a file named `.gitignore`
```text
node_modules/
.env
.env.local
venv/
.venv/
__pycache__/
*.pyc
.vscode/
.DS_Store
