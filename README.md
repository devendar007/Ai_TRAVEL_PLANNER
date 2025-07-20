# 🌍 AI Trip Planner

> **AI-powered travel planning with personalized itineraries, built with a modern full-stack architecture and Gemini API integration.**

---

## 🚀 Project Overview

AI Trip Planner is a full-stack web application that leverages the power of the Gemini API to generate detailed, personalized travel itineraries based on user preferences, budget, and travel style. The project demonstrates advanced AI integration, secure authentication, and a delightful, responsive user experience.

---

## 🏗️ Architecture (Beginner-Friendly)

The AI Trip Planner is built using a modern web stack. Here’s how all the parts work together:

### How It Works (Step-by-Step)

1. **User interacts with the website** (the frontend, built with React) to enter their trip details (destination, days, budget, etc.).
2. **Frontend sends the trip details** to the backend server (Node.js/Express) using a REST API.
3. **Backend receives the request** and creates a special prompt for the AI (Gemini API) based on the user's input.
4. **Backend sends the prompt** to the Gemini API, which is an advanced AI that generates a detailed travel plan.
5. **Gemini API replies** with a personalized, day-by-day itinerary.
6. **Backend saves the itinerary** in a database (MongoDB) and sends it back to the frontend.
7. **Frontend displays the itinerary** in a beautiful, user-friendly way. Users can view, save, or revisit their trips.

### Visual Diagram

```mermaid
graph TD
  A[User (Web Browser)]
  B[React Frontend]
  C[Express Backend]
  D[Gemini AI API]
  E[MongoDB]

  A --> B
  B --> C
  C --> D
  D --> C
  C --> E
  C --> B
  B --> A
```

### What Each Part Does

- **React Frontend:** The part users see and interact with. Handles forms, themes, and displays results.
- **Express Backend:** The server that processes requests, talks to the AI, and manages user accounts and trips.
- **Gemini API:** The AI brain that creates smart, detailed travel plans.
- **MongoDB:** The database where user info and trip plans are stored securely.

---

## 🧠 How AI Integration Works

- **Gemini API** is used to generate custom, day-by-day travel itineraries.
- The backend crafts a prompt from user input (destination, days, companions, budget) and sends it to Gemini.
- Gemini responds with a detailed, hour-by-hour plan including:
  - Meal and activity recommendations
  - Estimated costs
  - Transportation tips
- The itinerary is stored in MongoDB and displayed in a modern UI.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Icons, React Toastify
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt, dotenv
- **AI:** Gemini API

---

## ✨ Features

- **AI-Powered Trip Planning:** Personalized, detailed itineraries via Gemini
- **Authentication:** Secure registration/login with JWT
- **Trip History:** View and manage past trips
- **Dark/Light Mode:** Theme toggle with persistent preference
- **Responsive Design:** Mobile-first, animated, and accessible

---

## 🗂️ Folder Structure

```
AI-Trip-Planner-/
├── client/      # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, PrivateRoute, etc.
│   │   ├── context/      # Auth, Trip, Theme providers
│   │   ├── pages/        # Home, Login, Register, PlanTrip, etc.
│   │   └── ...
│   └── public/
├── server/      # Express backend
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Auth & Trip APIs
│   ├── middleware/  # Auth middleware
│   └── ...
└── README.md
```

---

