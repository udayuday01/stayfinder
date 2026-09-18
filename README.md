# PlayPower Labs Airbnb-style Listing Clone

Desktop-first take-home starter built with React + Vite + Bootstrap and Java Spring Boot.
This is an original implementation based on the assignment requirements; it is not copied from the reference source.

## Requirements
- Node.js 20+
- Java 17+
- Maven 3.9+

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Run backend
```bash
cd backend
mvn spring-boot:run
```
API: http://localhost:8080/api/listing

The frontend gracefully falls back to local mock listing data if the backend is not running.

## Features
- Desktop property listing layout and responsive fallback
- Photo gallery grid, full-screen photo tour, single-photo lightbox
- Keyboard navigation: Escape, ArrowLeft, ArrowRight, Tab focus containment
- Save/favorite state persisted in localStorage
- Share using Web Share API or clipboard fallback
- Date/guest controls, live estimated total, client-side validation
- Amenities, host details, house rules, location sections
- Java REST API for listing details and booking quote validation
- Architecture diagram and AI workflow prompt log/config

## Important
Use the reference page as the source of truth for exact content, image selection, spacing, colors, and behavior. Replace illustrative data/images with assets you are permitted to use. The reservation endpoint is a demo quote only; it does not create a real booking or process payments.
Do not push the assignment to a public GitHub repository.
