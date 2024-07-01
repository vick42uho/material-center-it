# Stage 1: Build the React application with Vite
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application to the container
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the built application using nginx
FROM nginx:stable-alpine

# Copy the built files from the build stage to nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration file to the appropriate directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
