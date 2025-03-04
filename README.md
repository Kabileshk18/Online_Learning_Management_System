# Online_Learning_Management_System

📌 Project Overview

The Online Learning Management System (LMS) is a backend application built using Node.js, Express, and MySQL. It includes authentication, authorization, user role management, task scheduling, email notifications, and various backend optimizations.

🚀 Features & Functionalities

◻️User Authentication & Authorization

    ◾JWT-based authentication
    ◾Role-based access control (RBAC) using Passport.js

◻️Database Management with Sequelize

    ◾Sequelize ORM with MySQL
    ◾Associations (One-to-One, One-to-Many, Many-to-Many)

◻️Middleware Implementations

    ◾Rate Limiting to prevent API abuse
    ◾Joi Validator for request validation
    ◾Winston Logger for error and request logging

◻️Task Scheduling

    ◾Cron jobs to send scheduled emails to enrolled students every Saturday at 5 PM

◻️Mail Service

    ◾Sends email notifications once a student is enrolled

◻️Security Enhancements

    ◾Password hashing with bcrypt
    ◾Input validation to prevent malicious payloads

##📂 Project Structure
    Online_Learning_Management_System/
    ├── bin/
    |   ├──www                          # server start
    |
    ├── config/
    │   ├── config.js                   # Configuration file
    │
    ├── constants/
    │   ├── messages.js                 # Constant showing messages
    │
    ├── controllers/
    │   ├── users.controller.js         # User-related operations
    │   ├── courses.controller.js       # Course-related operations
    │   ├── enrollments.controller.js   # Enrollment-related operations
    │
    ├── logs/
    │   ├── app.log                     # Hold the all errors logs
    |
    ├── middlewares/
    │   ├── authorize.js                # Authorize the api access
    │   ├── passport.js                 # Verify token
    │   ├── rateLimiter.js              # Rate limit Middleware
    │
    ├── models/
    │   ├── users.js                    # User model
    │   ├── courses.js                  # Course model
    │   ├── enrollments.js              # Enrollment model (Many-to-Many relation)
    │   ├── index.js                    # Main model file
    │
    ├── routes/
    │   ├── v1.js                       # Routes for the Application
    │
    ├── services/
    │   ├── cronMail.service.js         # Mailer for remainder notifications
    │   ├── crypto.service.js           # Service for encrytion and decryption
    │   ├── logger.service.js           # Service for log
    │   ├── sendMail.service.js         # Mailer for enrollment notifications
    │
    ├── validators/
    │   ├── courses.validator.js         # Courses related validators
    │   ├── enrollments.validator.js     # Enrollment related validators
    │   ├── users.validator.js           # User related validators
    |
    ├── .env                            # Environment variables
    ├── app.js                          # Entry point
    ├── package.json                    # Dependencies
    ├── README.md                       # Project Documentation
    └── responseHandler.js              # Application related functions

🛠️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Kabileshk18/Online_Learning_Management_System.git

2️⃣ Install Dependencies

npm install 

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=online_lms
    JWT_SECRET=your_secret_key
    EMAIL_SERVICE=gmail
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASSWORD=your_email_password

4️⃣ Start the Application

    npm start

For development with nodemon:

    nodemon start

🛡️ Security & Validation

    ◾Passport.js & JWT for secure authentication
    ◾Joi Validator for request body validation
    ◾Rate Limiting Middleware to prevent excessive API requests
    ◾Environment Variables for sensitive data management

📧 Scheduled Email Notification

The system sends an email every Saturday at 5 PM to all students enrolled in courses.

📜 Logging

    ◾Winston Logger logs errors and important events to logs/error.log.
    ◾Errors are also handled via the global error middleware.

🛠️ Technologies Used

    ◾Backend: Node.js, Express.js
    ◾Database: MySQL with Sequelize ORM
    ◾Authentication: JWT & Passport.js
    ◾Validation: Joi Validator
    ◾Logging: Winston Logger
    ◾Scheduler: Node-Cron
    ◾Email Service: Nodemailer

👨‍💻 Author

Developed by Kabilesh K | GitHub: @Kabileshk18