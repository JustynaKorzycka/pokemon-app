FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY ./db/my-database.db /app/db/my-database.db
EXPOSE 3000
CMD ["npm", "run", "dev"]