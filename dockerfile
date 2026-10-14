FROM node:24.21

WORKDIR /app

COPY package.json package-lock.json ./  

COPY / .

RUN ls

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]