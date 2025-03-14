# E-commerce Mobile App Installation Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on App Store or Google Play)
- MongoDB Atlas account (or local MongoDB installation)

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
     ```

4. **Start the Expo development server**

   ```bash
   npm start
   ```

5. **Access the application**

   - Scan the QR code with your mobile device using the Expo Go app
   - Or press 'a' to open on an Android emulator
   - Or press 'i' to open on an iOS simulator
   - Or press 'w' to open in a web browser

## MongoDB Setup

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in
   - Create a new cluster (the free tier is sufficient for development)

2. **Set up database access**
   - Create a database user with read/write permissions
   - Add your IP address to the IP access list (or use 0.0.0.0/0 for development)

3. **Get your connection string**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your credentials
   - Add this string to your `.env` file

## Build for Production

To create a standalone app:

```bash
eas build
```

You'll need an Expo account and EAS CLI installed (`npm install -g eas-cli`).

## Project Structure

- `/app` - Expo Router screens and navigation
- `/assets` - Images, fonts, and other static assets
- `/src/models` - MongoDB schemas and models
- `/src/api` - API functions for database operations
- `/src/lib` - Utility functions and database connection
- `/src/utils` - Helper utilities (including Cloudinary integration)

## Features

- Product browsing with filtering and search
- Shopping cart functionality
- User authentication with MongoDB
- Camera and gallery integration for profile photos
- Order tracking and history
- Responsive design for various mobile devices
