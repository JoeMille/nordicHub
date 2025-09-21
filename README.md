# Nordic Hub - Signal Processing Web Application

A web application for processing and visualizing signals from Nordic devices, built with Django REST API backend and React frontend.

## Project Overview

This application provides a dashboard interface for monitoring and analyzing signal data received from Nordic semiconductor devices. Users can log in to access real-time signal processing capabilities and visualization tools.

## Tech Stack

- **Backend**: Django 4.x, Django REST Framework
- **Frontend**: React 18, TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Django Auth + JWT tokens
- **Signal Processing**: NumPy, SciPy (planned)

## Project Structure

```
nordic-hub/
├── backend/           # Django REST API
│   ├── config/        # Django settings and configuration
│   ├── apps/          # Django applications
│   │   ├── authentication/  # User auth and management
│   │   └── signal_processing/  # Nordic device signal handling
│   └── static/        # Static files
└── frontend/          # React TypeScript application
    ├── src/
    │   ├── components/    # React components
    │   ├── services/      # API communication
    │   └── styles/        # CSS styling
    └── public/        # Static assets
```

## Development Tasks

### Phase 1: Project Setup ✅
- [x] Initialize Django project structure
- [x] Set up React TypeScript frontend
- [x] Configure basic project structure
- [ ] Create and document development environment setup

### Phase 2: Backend Development
- [ ] Configure Django settings for development/production
- [ ] Set up Django REST Framework
- [ ] Implement authentication app
  - [ ] User registration/login models
  - [ ] JWT token authentication
  - [ ] API endpoints for auth
- [ ] Implement signal processing app
  - [ ] Nordic device data models
  - [ ] Signal data ingestion endpoints
  - [ ] Data processing utilities

### Phase 3: Frontend Development
- [ ] Set up React routing (React Router)
- [ ] Create landing page component
- [ ] Implement login/authentication flow
- [ ] Build dashboard for signal visualization
- [ ] Set up API service layer
- [ ] Add responsive styling

### Phase 4: Integration & Features
- [ ] Connect frontend to Django API
- [ ] Implement real-time data updates (WebSockets)
- [ ] Add signal processing visualization
- [ ] User session management
- [ ] Error handling and loading states

### Phase 5: Production & Deployment
- [ ] Configure production settings
- [ ] Set up database migrations
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Deployment configuration

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration
- `GET /api/auth/user/` - Get current user

### Signal Processing
- `GET /api/signals/` - List signal data
- `POST /api/signals/` - Upload new signal data
- `GET /api/signals/{id}/` - Get specific signal
- `POST /api/signals/process/` - Process signal data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## Commands to run locally in development

(In seperate terminals, make sure to activate venv in backend)
python3 manage.py simulate_data --sensor temperature --interval 1.0       #to set simulator running 
python3 manage.py runserver                                               # run your local django server
npm start                                                                 # runs react front end 