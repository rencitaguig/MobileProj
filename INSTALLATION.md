# E-commerce Mobile App Installation Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on App Store or Google Play)

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

   If using Supabase (optional):
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
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

## Build for Production

To create a standalone app:

```bash
eas build
```

You'll need an Expo account and EAS CLI installed (`npm install -g eas-cli`).

## Project Structure

- `/app` - Expo Router screens and navigation
- `/assets` - Images, fonts, and other static assets
- `/src/frontend` - Frontend React Native components and logic
- `/src/backend` - Backend services, controllers, and models (mock implementation)

## Features

- Product browsing with filtering and search
- Shopping cart functionality
- User authentication (mock implementation)
- Camera and gallery integration for profile photos
- Order tracking and history
- Responsive design for various mobile devices
