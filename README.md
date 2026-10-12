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

## 📋 Required Project Configuration

To run this project locally, create a file named **`.env`** in your root directory and fill it with your own specific configuration details as shown below:

```env
PORT=5000
NODE_ENV=development

# MySQL Database Configurations (Enter your own database details here)
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=alumni_portal_db

# Security Keys (Enter your own secret token key)
JWT_SECRET=your_super_secret_jwt_key

# Nodemailer Configuration (Enter your own email and 16-character App Password)
# NOTE: Do NOT use your standard account login password for EMAIL_PASS.
# Go to Google Account -> Security -> 2-Step Verification -> App Passwords to generate it.
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=abcd1234efgh5678

# LinkedIn Integration Credentials (Enter your own developer API keys)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:5000/auth/linkedin/callback

---

## 🚀 Key Features

* **Strict Institution Credential Gate:** Restricts user registration strictly to verified college credentials by validating USN structure (must begin with institutional identifier `1AP`).
* **Time-Bound OTP Verification:** Mitigates unauthorized account creation via dynamic 6-digit one-time password delivery powered by Nodemailer.
* **Role-Based Access Control (RBAC):** Distinct permissions and dashboards for `student`, `alumni` roles powered by JSON Web Tokens (JWT).
* **Searchable Alumni Directory:** Filterable catalog to discover graduates by academic department, graduation year, organization, and designation.
* **Mentorship Exchange:** Students can submit structured mentorship requests directly to alumni mentors.
* **Event Discovery & Attendee Rosters:** Browse upcoming college events, view live attendee lists for each gathering, and manage participation via role-restricted RSVP tracking.
* **Curated Achievement Gallery:** Community showcase featuring asset tracking with ownership-restricted and admin-restricted deletion rules.
* **Alumni Network Directory:** Search and connect with graduates, discover industry peers, and explore detailed professional profiles filtered by department, batch, and company.
---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Fetch API, DOM manipulation)
* **Backend Runtime & Framework:** Node.js, Express.js
* **Database:** MySQL
* **Authentication & Cryptography:** JSON Web Tokens (`jsonwebtoken`), Salting & Hashing (`bcryptjs`)
* **Mailing Service:** Nodemailer (SMTP transport with Google App Passwords)
* **Environment & Security:** CORS, Dotenv

---

## 📁 Repository Structure

```text
APSCE-Alumni-Portal/
├── backend/
│   ├── controllers/         # Endpoint business logic
│   ├── middleware/          # Route protection & JWT verification
│   ├── models/              # Query helpers & schema models
│   ├── routes/              # Express API route modules
│   ├── db.js                # MySQL connection pool configuration
│   ├── schema.sql           # Database table definitions & relations
│   ├── server.js            # Express application entrypoint
│   ├── package.json         # Backend dependencies & npm scripts
│   └── .env.example         # Environment variable template
├── Frontend/
│   ├── index3.html          # Main application dashboard
│   ├── register.html        # Onboarding & OTP verification form
│   ├── profile.html         # User profile manager
│   ├── css/                 # Custom stylesheets
│   └── js/                  # Client-side API fetch handlers
├── .gitignore               # Excludes node_modules and .env
├── package.json
└── README.md


### Backend
To start the backend server, run:
```bash
npm install
node server.js