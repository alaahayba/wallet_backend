FROM node:14.16.0-alpine3.13
# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . . 
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]

