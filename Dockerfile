# Development stage
FROM node:20.11.1-alpine3.19 as development

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Add node_modules/.bin to PATH for running vite directly
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy the application code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:1.25.4-alpine3.18 as production

# Copy built files from the development stage
COPY --from=development /usr/src/app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port defined in nginx.conf
EXPOSE 81

# Command to run the server
CMD ["nginx", "-g", "daemon off;"]
