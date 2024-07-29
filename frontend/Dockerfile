# Frontend Dockerfile
# Use the official Node.js image as a parent image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Expose the port on which the app will run
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
