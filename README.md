# UsS_Assignment1
This is a low-fi prototype and used to depict what is needed for the assignment, an anonymous and secure IIITD Campus Grievance Portal.
PulsePoint is a simple, web-based grievance redressal portal designed for IIITD campus users. It allows students to register, login, submit grievances (anonymously or identified), and track their submissions via a dashboard. The application is built as a single-page prototype using HTML, JavaScript, and Tailwind CSS for styling. Data is stored locally using localStorage for demonstration purposes—no backend server is required.
This project is ideal for educational or prototype use, emphasizing anonymity and security in grievance handling.

## Features

User Registration & Login: Students can create accounts with details like full name, enrollment number, course, department, year, institute, and email. Login uses enrollment number and password.
Grievance Submission:

Select category (Academic, Administrative, Harassment, Other).
Add description, attach files (prototype only—no upload handling).
Choose priority level (Low, Medium, High).
Option to submit anonymously.


Anonymous Submission: Direct form for anonymous grievances without login.
Dashboard: View all your grievances in a responsive table with columns for ID, Category, Description (truncated), Status, Date, Anonymous, and Priority.
Local Persistence: User data and grievances stored in browser's localStorage for session persistence.
Responsive Design: Mobile-friendly layout using Tailwind CSS.
Professional UI: Blue-orange theme with hover effects on buttons for a modern, engaging look.
