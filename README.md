# 🌍 AI Trip Planner

> **AI-powered travel planning with personalized itineraries, built with a modern full-stack architecture and Gemini API integration.**

---

## 🚀 Project Overview

The **AI Trip Planner** is your ultimate travel companion, a full-stack web application that leverages the power of the Gemini API to craft detailed, personalized itineraries. Say goodbye to endless research – simply tell us your preferences, budget, and travel style, and let AI design your dream trip, saving you hours of planning time. This project showcases advanced AI integration, secure authentication, and a delightful, responsive user experience.

---

## 🏗️ Architecture (Beginner-Friendly)

The AI Trip Planner is built using a modern web stack. Here’s how all the parts work together:

### How It Works (Step-by-Step)

1.  **User interacts with the website** (the frontend, built with React) to enter their trip details (destination, days, budget, etc.).
2.  **Frontend sends the trip details** to the backend server (Node.js/Express) using a REST API.
3.  **Backend receives the request** and creates a special prompt for the AI (Gemini API) based on the user's input.
4.  **Backend sends the prompt** to the Gemini API, which is an advanced AI that generates a detailed travel plan.
5.  **Gemini API replies** with a personalized, day-by-day itinerary.
6.  **Backend saves the itinerary** in a database (MongoDB) and sends it back to the frontend.
7.  **Frontend displays the itinerary** in a beautiful, user-friendly way. Users can view, save, or revisit their trips.

### Visual Diagram

```mermaid
graph TD
A[User (Web Browser)] --> B[React Frontend]
B --> C[Express Backend]
C --> D[Gemini AI API]
D --> C
C --> E[MongoDB]
C --> B
B --> A```

