# Pokemon Personality Analysis Application

A full-stack Pokemon personality analysis application built with React, Node.js, and MongoDB that determines personality traits based on your Pokemon team composition and user interactions. The purpose of this app is to let the user be aware that we developers can achieve a lot by analysing data you don't even know is important.

## Tech Stack

### Frontend

- **React 19.1.1** - Modern React with hooks and functional components
- **Vite 7.2.7** - Fast development server and build tool
- **React Router Dom 7.9.5** - Client-side routing and navigation
- **Tailwind CSS 4.1.18** - Utility-first CSS framework for styling

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework for REST API
- **MongoDB 7.0.0** - NoSQL database for data persistence
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management
- **Nodemon 3.1.10** - Development auto-restart

### Infrastructure

- **Docker & Docker Compose** - Containerization and orchestration
- **Mongo Express** - MongoDB administration interface
- **PokeAPI** - External Pokemon data integration

## Project Structure

```
/
├── images/
│   ├── server/
│   │   ├── controllers/    # Route handlers and request logic
│   │   │   └── userController.js
│   │   ├── database/       # Database connection and configuration
│   │   │   └── connection.js
│   │   ├── repositories/   # Data access layer
│   │   │   └── userRepository.js
│   │   ├── routes/         # API route definitions
│   │   │   └── userRoutes.js
│   │   ├── services/       # Business logic and external services
│   │   │   ├── database.js
│   │   │   ├── personalityService.js
│   │   │   └── pokemonService.js
│   │   ├── Dockerfile
│   │   ├── index.js        # Server entry point
│   │   └── package.json
│   └── client/
│       ├── src/
│       │   ├── components/ # Reusable React components
│       │   │   ├── ProtectedAdminRoute.jsx
│       │   │   └── UserProfile.jsx
│       │   ├── constants/   # Application constants and data
│       │   │   └── constants.js
│       │   ├── pages/      # Page-level components
│       │   │  
│       │   ├── App.jsx     
│       │   ├── main.jsx    
│       │   └── index.css  
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── LICENSE
│       ├── package.json
│       ├── vite.config.js
│       └── README.md
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore patterns
├── CODE_OF-CONDUCT.md    # Community guidelines
├── docker-compose.yml    # Development environment configuration
├── prompts_used.md       # Documentation of prompts used
└── readme.md            # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for version control

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Dev5-MatteoGiambarresi
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

3. **Configure your environment variables**
   Edit the `.env` file and set the following values:

   ```env
   # API Configuration
   API_PORT=3000
   VITE_API_URL=http://localhost:3000

   # MongoDB Configuration
   # Note: Docker will override this with mongodb://mongo:27017/PokemonUsers
   MONGO_URI=mongodb://localhost:27017/PokemonUsers

   # For MongoDB (optional - only needed if using authentication)
   MONGO_INITDB_ROOT_USERNAME=
   MONGO_INITDB_ROOT_PASSWORD=

   # Mongo Express Configuration
   ME_CONFIG_BASICAUTH_ENABLED=true
   ME_CONFIG_BASICAUTH_USERNAME=
   ME_CONFIG_BASICAUTH_PASSWORD=
   ```

4. **Start the application**
   ```bash
   docker compose up --build
   ```

### Access Points

Once the application is running, you can access:

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB Admin**: http://localhost:8081
- **MongoDB Database**: localhost:27017

### Development

The development environment includes:

- Hot reload for both frontend and backend
- Volume mounting for live code changes
- MongoDB with persistent data storage in `./_volumes/db`
- Mongo Express for database administration (authentication disabled by default)

### Available Scripts

#### Backend

- `npm run start` - Start development server with nodemon

#### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- **User Registration & Authentication**: Create accounts and secure login system
- **Pokemon Team Selection**: Choose your Pokemon team from the PokeAPI database
- **Personality Analysis**: Analyze personality based on Pokemon team composition
- **Dynamic Questioning**: Personality-based questionnaires tailored to results
- **Admin Dashboard**: Administrative interface for managing user data
- **External API Integration**: Real-time Pokemon data from PokeAPI
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Data Persistence**: User data and results stored in MongoDB

## Personality Types

The application analyzes six personality types based on Pokemon team characteristics:

- **Aggressive**: High attack stats, fire/dragon/electric types
- **Calm**: Balanced stats, water/psychic/normal types
- **Anxious**: High speed, ghost/bug/ice types
- **Loyal**: Moderate stats, normal/fighting/fairy types
- **Naive**: Curious and playful characteristics
- **Timid**: Cautious personality with psychic/ghost types

## Architecture

The application follows a layered architecture:

- **Frontend**: React SPA consuming REST APIs with modern hooks and functional components
- **Backend**: Express.js with MVC pattern
  - Controllers handle HTTP requests and business logic
  - Services contain business logic and external API integration
  - Repositories manage data access to MongoDB
  - Routes define API endpoints
- **Database**: MongoDB for data persistence with Mongo Express for administration
- **Infrastructure**: Docker containers for isolation and portability
- **External Services**: PokeAPI integration for real-time Pokemon data

## How It Works

1. **User Registration**: Users create an account with username
2. **Team Selection**: Users select 6 Pokemon from PokeAPI for their team
3. **Personality Analysis**: The system analyzes Pokemon stats, types, and characteristics using the PersonalityService
4. **Interactive Questionnaire**: Users answer personality-specific questions based on their calculated personality type
5. **Results**: Personality type is determined and stored in the MongoDB database
6. **Admin Access**: Administrators can login to view and manage user data through the admin dashboard

## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Retrieve user data
- `POST /personality` - Calculate and save personality results
- `GET /admin` - Admin dashboard (protected route)

## External APIs

- **PokeAPI**: https://pokeapi.co/api/v2/
  - Fetches Pokemon data including stats, types, and descriptions
  - Used for team selection and personality analysis