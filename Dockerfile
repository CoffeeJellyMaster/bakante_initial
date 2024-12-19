# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the frontend package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend for production
RUN npm run build

# Expose port (Vite's default preview port is 5173)
EXPOSE 5173

# Command to run the frontend
CMD ["npm", "run", "preview"]
