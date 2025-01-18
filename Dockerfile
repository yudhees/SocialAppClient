
# Use the official Node.js image
FROM node:23-alpine

# Set the working directory
WORKDIR /app/client

# COPY .env ./ 
COPY .. .

# Install dependencies
RUN npm install -g serve

RUN npm install

RUN npm run build

ENV VITE_SERVER_URL=https://socialappserver.choreoapps.dev

RUN addgroup -g 10014 choreo && \
    adduser --disabled-password --no-create-home --uid 10014 --ingroup choreo choreouser

USER 10014

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3001"]
