# Project Setup Instructions

## Environment Configuration

Before running the project, you need to set up your environment variables:

```bash
# Copy the template and fill in your values
cp .env.example .env
```

Edit the `.env` file and update:
- `MONGO_URI`: MongoDB connection string (replace `your-database-name` with your preferred database name)
- `API_PORT`: Server port (default: 3000)
- `VITE_API_URL`: URL to your API server (default: http://localhost:3000)

## Running the Project

### Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

This will start:
- API server on port 3000
- Client application on port 5173

Note: This assumes you have MongoDB running locally on port 27017

### Manual Setup
If you prefer to run without Docker:

1. Install dependencies:
```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

2. Start MongoDB (required for server)

3. Run the applications:
```bash
# Server (in server directory)
npm start

# Client (in client directory)
npm run dev
```

## Access Points
- Frontend: http://localhost:5173
- API: http://localhost:3000

## Prerequisites
- MongoDB must be installed and running locally on port 27017