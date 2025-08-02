# Short-URL

A secure URL shortening service built with Node.js, Express, and MongoDB.

## Features

- URL shortening with custom or auto-generated short codes
- User authentication and registration with password hashing
- JWT-based authentication with expiration
- MongoDB database integration
- EJS templating for views
- Responsive web interface
- **Security Features:**
  - Password hashing with bcrypt
  - Rate limiting to prevent abuse
  - Security headers with Helmet.js
  - Input validation and sanitization
  - URL validation to prevent open redirects
  - Secure cookie configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd Short-URL
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=8001
NODE_ENV=development
```

**⚠️ Security Note:** 
- Change the `JWT_SECRET` to a strong, random string in production
- Use environment variables for all sensitive configuration
- Set `NODE_ENV=production` in production environment

4. Start the application:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Security Features

### Authentication & Authorization
- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Tokens**: Secure JWT tokens with 24-hour expiration
- **Secure Cookies**: HttpOnly cookies with secure flags in production

### Input Validation
- **URL Validation**: All URLs are validated to prevent open redirect attacks
- **Email Validation**: Basic email format validation
- **Password Strength**: Minimum 6 characters required
- **Input Sanitization**: Protection against malicious input

### Rate Limiting
- **API Protection**: 100 requests per 15 minutes per IP address
- **Brute Force Protection**: Prevents automated attacks

### Security Headers
- **Helmet.js**: Comprehensive security headers
- **XSS Protection**: Built-in XSS protection
- **Content Security Policy**: Configured for EJS templates

### Database Security
- **MongoDB Injection Protection**: Mongoose provides built-in protection
- **Input Validation**: All database inputs are validated

## Usage

1. Open your browser and navigate to `http://localhost:8001`
2. Register a new account or login with existing credentials
3. Enter a long URL to get a shortened version
4. Share the shortened URL with others

## API Endpoints

- `GET /` - Home page
- `POST /user` - User registration
- `POST /user/login` - User login
- `POST /url` - Create shortened URL
- `GET /url/:shortId` - Redirect to original URL
- `GET /url/analytics/:shortId` - Get URL analytics

## Project Structure

```
Short-URL/
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── models/         # Database models
├── routes/         # Route definitions
├── service/        # Business logic
├── views/          # EJS templates
├── connect.js      # Database connection
├── index.js        # Main application file
└── package.json    # Project dependencies
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **Frontend**: EJS templating
- **URL Shortening**: nanoid, shortid
- **Security**: Helmet.js, express-rate-limit, express-validator

## Security Checklist

- ✅ Password hashing with bcrypt
- ✅ JWT token expiration
- ✅ Rate limiting
- ✅ Security headers
- ✅ Input validation
- ✅ URL validation
- ✅ Secure cookies
- ✅ Environment variables for secrets
- ✅ Error handling
- ✅ SQL injection protection (MongoDB)

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 