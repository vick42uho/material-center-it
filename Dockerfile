# Stage 1: Build the React app with Vite
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN yarn install

# Copy the source code
COPY . .

# Build the application
RUN yarn run build

# Stage 2: Serve the app using a lightweight server
FROM nginx:stable-alpine

# Copy the build output to Nginx's default HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
