# Short-URL

A URL shortening service built with Node.js, Express, and MongoDB.

## Features

- URL shortening with custom or auto-generated short codes
- User authentication and registration
- JWT-based authentication
- MongoDB database integration
- EJS templating for views
- Responsive web interface

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
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Start the application:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Enter a long URL to get a shortened version
4. Share the shortened URL with others

## API Endpoints

- `GET /` - Home page
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /url` - Create shortened URL
- `GET /:shortId` - Redirect to original URL

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
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS templating
- **URL Shortening**: nanoid, shortid

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 