# Multimedia Dashboard

A fully responsive and interactive multimedia dashboard built using **React.js/Nexr.js** for the frontend and **Node.js/Express** for the backend. It showcases real-time **Movies**, **News**, and **Songs** data fetched from public APIs and rendered in a clean, modern UI.

---

## Overview

This project is a centralized dashboard that offers the following features:

- **Movies**: Fetch and display trending movies and their details using the TMDb API.
- **News**: Fetch the latest world news headlines using the GNews API.
- **Songs**: Search and play top songs using the Deezer API (via custom backend integration).

Each section is modular, well-styled, and built with clean component-based architecture.

---

## Project Architecture

### Frontend (React.js + Next.js  + Tailwind CSS)
- Built with **React.js** for UI and state management.
- **Tailwind CSS** for responsive design and fast prototyping.
- Axios for API requests.
- Component-based structure with reusable and maintainable code.

### Backend (Node.js + Express)
- Created to fetch song data from the **Deezer API** and bypass CORS issues.
- Designed as a lightweight microservice for the songs module.

---

## How to Run the Project Locally

### Prerequisites
- Node.js installed (v16 or later)
- Git installed
- Internet connection for APIs

### 1. Clone the Repository
```bash
git clone https://github.com/himanshuXDebug/media-explorer.git
cd multimedia-dashboard
```
### 2. Install Frontend Dependencies
 - cd frontend
 - npm install
### 3. Start the Frontend
 - npm run dev
### 4. Setup Backend for Songs API
 - cd ../backend
 - npm install
### 5. Start the Backend Server
 - node index.js
The backend will run on http://localhost:5000, and the frontend typically on http://localhost:3000.

NOTE : 
Deployment Notes
The project can be deployed on Vercel (frontend) and Render/Heroku/Railway (for backend).

Note:
In the shared deployed link (Vercel), the Songs section will not work because Vercel does not support running Node.js backend servers. You must host the backend separately (e.g., on Render or Railway) and connect it via URL.
