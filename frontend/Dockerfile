FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN npm run build

# Use a minimal web server to serve the React app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 88

# Command to run the web server
CMD ["nginx", "-g", "daemon off;"]