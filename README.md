# Medical Appointment Management System

## Overview

This application provides a seamless experience for patients, doctors, and administrators to manage medical appointments, patient records, and user accounts efficiently.

## Features

### Patient Interface

- View and manage scheduled appointments.
- Access medical records.
- Schedule new appointments.
- Update personal information.

### Doctor Interface

- View and manage appointments.
- Manage patient records.
- Update personal details.

### Admin Interface

- Manage users (patients, doctors, admins).
- Register new doctors and admins.
- Update and manage doctor salaries.

## Appointment Scheduling

- Available from **8:00 AM to 2:00 PM** in **30-minute slots**.
- Appointments can be booked **up to one week in advance**.
- Patients select a doctor, choose a date, and pick an available time slot.
- Doctors can schedule appointments for their patients.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Spring Boot, MySQL, XAMPP
  - **MySQL** is used for the database.
  - **XAMPP** is used to run the MySQL and Apache servers.

## Contributors

- **Frontend:** Mateja Bogdanović [GitHub](https://github.com/matejabogdanovic) 💻
- **Backend:** Lazar Nikolić [GitHub](https://github.com/4796) ⚙️

# Installation Instructions

## Prerequisites

- **Java** (for the Spring Boot backend)
- **Node.js** and **npm** (for the frontend)
- **XAMPP** (for MySQL and Apache servers)

## Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Set up the database**:

   - Open XAMPP and start the **Apache** and **MySQL** servers.
   - Import the database schema and data into MySQL using phpMyAdmin or through the command line.

3. **Run the backend**:

   - Navigate to the backend folder and run all Java applications.
   - Make sure all required dependencies are installed and the application is running.

4. **Set up the frontend**:
   - Navigate to the frontend folder:
     ```bash
     cd <frontend-folder>
     ```
   - Install the frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
     or use it on your home network:
     ```bash
     npm run dev -- --host
     ```

Once everything is set up, the application should be ready to use!
