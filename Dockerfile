#todo - split in two steps to remove TS files from the image
FROM node:slim as build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY shared ./../shared
COPY server ./
RUN npm run build
CMD ["npm", "run", "start"]