# E-commerce Mobile App

## Overview
A comprehensive React Native e-commerce application for a clothing store with MongoDB for data storage and Cloudinary for image management.

## Features
- **Product Management**: Full CRUD operations for clothing items with photo upload capabilities
- **User Authentication**: Registration, login, and profile management with photo uploads
- **Order Processing**: Complete transaction flow with status updates
- **Review System**: Allow verified purchasers to leave ratings and reviews on products
- **Advanced Features**: Search functionality with category and price filtering

## Tech Stack
- **Frontend**: React Native, Expo
- **Database**: MongoDB
- **Image Storage**: Cloudinary (placeholder implementation)
- **State Management**: Context API

## Getting Started
See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

### Quick Start
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB connection in `.env` file
4. Start the development server: `npm start`

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
```

## Database Schema
The application uses MongoDB with the following collections:
- **Products**: Clothing items with details like name, price, category, etc.
- **Users**: User accounts with authentication information
- **Orders**: Purchase records with items, shipping details, and status

## API Endpoints
The application provides API endpoints for:
- Product management (CRUD operations)
- User authentication and profile management
- Order processing and tracking

## Mobile Features
- Camera integration for profile and product photos
- Gallery access for image uploads
- Push notifications for order updates
