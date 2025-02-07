# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Set config
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package*.json ./

# Install packages
RUN npm ci

# Copy local code to the container image.
COPY . ./
RUN npm install primevue
# Build the app.
RUN npm run build

# Use the Caddy image
FROM caddy

# Create and change to the app directory.
WORKDIR /app

# Copy files to the container image.
COPY --from=build /app/dist ./dist