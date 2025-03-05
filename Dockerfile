FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000
EXPOSE 3001
CMD ["npm", "run", "start:all"]
