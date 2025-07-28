# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package metadata first and install dependencies
COPY package.json ./
# If you have a package-lock.json or yarn.lock, copy it as well
# COPY package-lock.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port defined by the server (default 3000)
EXPOSE 3000

# Set environment to production by default
ENV NODE_ENV=production

# Define the default command to start the API server
CMD ["node", "server.js"]
