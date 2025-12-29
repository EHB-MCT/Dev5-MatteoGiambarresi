# Pokemon Personality Analysis Application

A full-stack application that analyzes personality traits based on Pokemon team composition. Built with React, Node.js, and MongoDB.

## Prerequisites
- Docker and Docker Compose installed

## Step-by-Step Setup Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Dev5-MatteoGiambarresi
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```
The `.env` file is pre-configured with default settings. No changes are required.

### 3. Start the Application with Docker
```bash
docker compose up --build
```
This command will:
- Build and start all containers (frontend, backend, MongoDB, Mongo Express)
- Set up the database automatically
- Start the development servers with hot reload

### 4. Verify the Application is Running
Wait for the containers to start completely. You should see output indicating all services are running.

### 5. Access the Application
Open your web browser and navigate to:
- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB Admin Interface**: http://localhost:8081

## Testing the Application

### Normal User Flow
1. Go to http://localhost:5173
2. Enter a username and start the personality analysis
3. Select your Pokemon team
4. Answer the personality questions

### Admin Access Flow
1. Go to http://localhost:5173
2. Type "Admin" in the username input field
3. You will be redirected to the admin login page
4. Enter admin credentials:
   - Username: `admin`
   - Password: `password123`
5. Access the admin dashboard to view user data

### Database Access
To access the MongoDB database directly:
1. Go to http://localhost:8081
2. Login with:
   - Username: `admin`
   - Password: `pass`
3. Browse the `PokemonUsers` database and collections

## File Structure Overview
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── constants/      # App constants
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── repositories/      # Data access
│   └── package.json
├── docker-compose.yml      # Container configuration
└── .env.example           # Environment variables
```

## Stopping the Application
To stop all containers:
```bash
docker compose down
```
## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Retrieve user data
- `POST /personality` - Calculate and save personality results
- `GET /admin` - Admin dashboard (protected route)

## External APIs

- **PokeAPI**: https://pokeapi.co/api/v2/
  - Fetches Pokemon data including stats, types, and descriptions
  - Used for team selection and personality analysis

## Sources and References

This project was developed using the following sources and references:

### MongoDB Documentation
- **MongoDB $set Operator**: https://www.mongodb.com/docs/manual/reference/operator/update/set/
  - **Used in**: `images/server/repositories/userRepository.js` lines 60, 73, 86, 99
  - **Purpose**: Updates user data fields (pokemonTeam, timer, clicks, personality) in MongoDB documents

- **MongoDB $inc Operator**: https://www.mongodb.com/docs/manual/reference/operator/update/inc/
  - **Used in**: `images/server/repositories/userRepository.js` line 140
  - **Purpose**: Increments Pokemon selection count in rankings collection

### Development Tools and AI Assistance
- **OpenCode AI**: https://opencode.ai
  - **Used for**: Code assistance, documentation generation, and development support
  - **Applied throughout**: Backend services documentation and method implementation

### ChatGPT Conversations
- **ChatGPT Session 1**: https://chatgpt.com/share/692c2db8-4b88-8002-a504-0b33edeab92c
  - **Topic**: Initial development guidance and architecture decisions
  - **Applied**: Project structure planning and implementation approach

- **ChatGPT Session 2**: https://chatgpt.com/c/69317083-8444-8325-8f57-dd88173dc02a
  - **Topic**: Advanced development problem-solving
  - **Applied**: Complex feature implementation and debugging

### JavaScript References
- **Array.find()**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  - **Used in**: `images/server/services/pokemonService.js` line 20
  - **Purpose**: Finds English language description entry in Pokemon species data

- **Array.reduce()**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  - **Used in**: `images/server/services/personalityService.js` lines 71, 82
  - **Purpose**: 
    - Line 71: Initializes personality scores object with zero values
    - Line 82: Finds the personality type with the highest score

- **Conditional Operator**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
  - **Used in**: 
    - `images/server/services/pokemonService.js` line 21: Ternary for description fallback
    - `images/server/services/personalityService.js` line 83: Comparison for finding max score
  - **Purpose**: Conditional expressions for concise conditional logic

- **Object.keys()**: https://www.w3schools.com/jsref/jsref_object_keys.asp
  - **Used in**: `images/server/services/personalityService.js` lines 71, 77
  - **Purpose**: Iterates over personality configuration object keys for scoring

- **Array.join()**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
  - **Note**: Available for future use in string concatenation operations

### React References
- **React Router Link**: https://api.reactrouter.com/v7/functions/react_router.Link.html
  - **Used in**: Various React components for navigation
  - **Purpose**: Client-side routing between application pages

- **React JSX Expressions**: https://www.w3schools.com/react/react_jsx_expressions.asp
  - **Used throughout**: All React components
  - **Purpose**: Embedding JavaScript expressions in JSX for dynamic content

### HTML References
- **HTML Ordered List**: https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/ol
  - **Note**: Available for future implementation of numbered lists in UI components
