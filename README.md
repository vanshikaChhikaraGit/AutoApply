# 🎯 University Auto-Fill Solution

A cross-platform autofill solution designed to automate data entry across dynamic web forms within university systems. This project consists of a **Chrome Extension** for intelligent form filling and a **full-stack web platform** for user profile management.
![image](https://github.com/user-attachments/assets/a1a0099e-21df-431f-873f-58c54d8c70a2)

---

## Why choose auto apply?
Our extension is designed for university students applying for on-campus placements. Often the TnP cell provides students with a google form to fill that contains repetitive information but any already available chrome extension in marketplace does not provide auto-filling of google forms also their data is not tailored according to university forms so students end up filling the same thing multiple time and wasting thier time. This problem is solved by AUTO APPLY. Any kind of form google form, website form etc is catered to by Auto Apply!

## 🚀 Features

- **End-to-End System Development**: Full-stack architecture with a user dashboard and Chrome Extension for seamless autofill.
- **Form Autofill Engine**: Chrome Extension detects form structures dynamically and injects user data with a single click.
- **Secure User Data Handling**: Utilizes Clerk for authentication and Prisma ORM for managing data in PostgreSQL.
- **Modern Web Tech**: Built using Next.js, TypeScript, and deployed on Vercel.

---

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Node.js, Prisma ORM, RESTful APIs
- **Database**: PostgreSQL
- **Authentication**: Clerk.dev
- **Browser Extension**: Chrome Extension API
- **Deployment**: Vercel

---

## 🧰 Project Structure


---

## 📦 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/university-autofill-solution.git
cd university-autofill-solution
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Connect to database
- Use neon.tech to get access to server-hosted postgresql database
- add database url to env variables

### 4. Authentication
- signup of clerk and get access token and list in the env vairiables to enable clerk based auth

### 5. Uploadthing
- signup of uploadthing and get the token and list it in the env variables to enable file uploades.

### 6. Run you app
```bash
npm run dev
```



