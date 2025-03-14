# E-commerce App Installation Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

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
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `/src/frontend` - Frontend React components and logic
- `/src/backend` - Backend services, controllers, and models
- `/src/components/ui` - UI components from Shadcn UI library

## Features

- Product browsing with filtering and sorting
- Shopping cart functionality
- User authentication (mock implementation)
- Responsive design for mobile and desktop
