# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Environment variable API_URL configuration for flexible API endpoint management

### Changed
- Admin login flow with session-based authentication improvements

### Fixed
- Docker-compose configuration to resolve database connection issues

## [0.4.0] - 2025-12-22

### Added
- Pokemon sprite images to team selector
- Improved team selector structure and visual design
- Complete question sets for all 6 personality types (Loyal, Naive, Timid, Aggressive, Calm, Anxious)
- Loader to prevent errors during initial question loading
- MongoDB admin user initialization
- Team selection with random 20 Pokemon per render
- Clean and simple frontend design

### Fixed
- Package installation errors by reinstalling npm dependencies
- Dev server crash by downgrading Vite from 7.2.7 to 5.4.0
- Navigation logic moved to useEffect to prevent render-time state updates

## [0.3.0] - 2025-12-15

### Added
- Question answering UI implementation
- Top 5 most selected Pokemon display in UserProfile component
- Pokemon ranking functionality and routing
- Endpoint to retrieve all user teams
- Click-based scoring analysis into personality analysis
- Timer logic for user sessions

### Changed
- API refactored according to SOLID principles
- Personality calculation uses Object.keys and Object.values for dynamic scoring
- Update team endpoint returns personality data after team update

### Fixed
- Endpoint path correction for Pokemon ranking to match naming convention
- Duplicate username prevention in user registration

## [0.2.0] - 2025-12-10

### Added
- Admin page with user data display
- Questions page with personality-specific questions
- Personality checks for Aggressive, Calm, and Anxious types
- Personality analysis collection for storing results
- Pokemon stats (attack, defense, speed) for team analysis
- Team selection toggle and count display (limit 6)
- Pokemon list fetched from API instead of hardcoded array

### Changed
- User data stored in localStorage after username submission
- Team update endpoint updates personality in users collection

### Fixed
- Navigation between pages using React Router
- Team selection preventing more than 6 Pokemon

## [0.1.0] - 2025-12-01

### Added
- Initial project structure with client and server directories
- React frontend with Vite development server
- Express backend with MongoDB connection
- Docker containerization for both frontend and backend
- User registration and authentication system
- Basic Express server with root route
- MongoDB database integration
- Nodemon for development auto-restart

### Features
- User registration with username
- Basic frontend-backend connectivity
- Docker development environment

### Technical
- Frontend: React with Vite
- Backend: Node.js with Express
- Database: MongoDB
- Infrastructure: Docker & Docker Compose

--- 