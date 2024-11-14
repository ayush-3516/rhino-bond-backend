# Rhino Bond Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Rhino Bond Backend is a comprehensive NestJS-based platform for managing user engagement, rewards, and community interactions. The system provides robust APIs for handling challenges, events, points, rewards, and user activities.

### Key Features

- **User Management**: Firebase-based authentication with JWT tokens
- **Challenge System**: Create and manage various types of challenges (daily, weekly, monthly)
- **Event Management**: Comprehensive event lifecycle handling
- **Points & Rewards**: Flexible point system with configurable rewards
- **Analytics**: Track user engagement and platform metrics
- **Leaderboards**: Dynamic leaderboard system with multiple categories
- **Notifications**: Real-time notification system for user engagement
- **Activity Tracking**: Detailed tracking of user interactions
- **Referral System**: User referral management with rewards

## Technology Stack

- **Framework**: NestJS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Firebase + JWT
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Testing**: Jest

## Project Structure

```
src/
├── controllers/     # API endpoints and request handling
├── services/        # Business logic implementation
├── dtos/           # Data Transfer Objects for validation
├── entities/       # Database models and schemas
├── guards/         # Authentication and authorization guards
├── decorators/     # Custom decorators
├── interfaces/     # TypeScript interfaces
├── config/         # Configuration files
└── utils/          # Helper functions and utilities
```

## Installation

```bash
# Install dependencies
$ npm install

# Set up environment variables
$ cp .env.example .env
```

## Configuration

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/rhino-bond

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=24h

# App
PORT=3000
NODE_ENV=development
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The API documentation is available at `/api/docs` when running the server. It provides detailed information about all available endpoints, request/response schemas, and authentication requirements.

### Main API Sections

- `/api/auth` - Authentication endpoints
- `/api/challenges` - Challenge management
- `/api/events` - Event operations
- `/api/points` - Points and rewards
- `/api/users` - User management
- `/api/settings` - Platform settings
- `/api/analytics` - Analytics and reporting
- `/api/notifications` - Notification management
- `/api/leaderboards` - Leaderboard operations
- `/api/activities` - Activity tracking
- `/api/referrals` - Referral system

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Security

The platform implements several security measures:

- Firebase Authentication
- JWT token validation
- Role-based access control
- Input validation using class-validator
- MongoDB injection prevention
- Rate limiting
- CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is MIT licensed.

## Acknowledgments

Built with [Nest](https://github.com/nestjs/nest) framework.
