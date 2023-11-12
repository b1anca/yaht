# Yet Another Habits Tracker

## Requirements

- Docker (recommended)
- Node.js and npm (for local setup)

## Recommended Setup with Docker

Docker simplifies the setup process and ensures consistency across environments. Follow these steps to set up the application using Docker:

### Initial setup

1. Copy the sample environment file:
```sh
cp .env.sample .env
```

2. Build the Docker image:
```sh
docker build -t yaht-app . 
```

### Running the Application

To run the application using Docker:
```sh
docker run -it --rm --name yaht-app -p 3000:3000 -v $(pwd):/app -v /app/node_modules yaht-app
```

Access the application at http://localhost:3000.


## Running Locally (Alternative Method)

If you prefer to run the application without Docker, ensure you have Node.js and npm installed. Then, follow these steps:

1. Install dependencies:
```sh
npm install
```

2. Start the application:
```sh
npm start
```

3. Access the application at http://localhost:3000.