#todo - split in two steps to remove TS files from the image
FROM node:18.15.0-slim as build

ENV IS_DOCKER true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

#build front-end
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY shared ./../shared
COPY client ./
RUN npm run release

# build back-end
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY shared ./../shared
COPY server ./
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]