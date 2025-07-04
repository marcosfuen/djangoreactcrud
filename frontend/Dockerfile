# FROM node:alpine as build

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build


# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

# pull official base image
FROM node:alpine

# set work directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

# RUN npm install -g serve
RUN npm install

# copy react project
COPY . .

#exose port
EXPOSE 5173
# build react project
# RUN npm run dev -- --host
# CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npm", "run", "dev"]