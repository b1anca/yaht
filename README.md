# Yet Another Habits Tracker

Because one more habits tracker is never too many.

## Requirements

- Docker or
- Node.js and npm

## Setup with Docker

### Initial setup

1. Copy the sample environment file:

```sh
cp .env.sample .env
```

2. Build the Docker image:

```sh
docker build -t yaht-app .
```

### Running the application

To run the application using Docker:

```sh
docker run -it --rm --name yaht-app -p 3000:3000 -v $(pwd):/app -v /app/node_modules yaht-app
```

Access the application at http://localhost:3000

## Running locally

If you prefer to run the application without Docker, ensure you have Node.js and npm installed. Then, follow these steps:

1. Install dependencies:

```sh
npm install
```

2. Start the application:

```sh
npm start
```
