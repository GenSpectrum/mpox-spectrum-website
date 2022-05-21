## Build app ##

FROM node:14-buster AS builder
WORKDIR /build

COPY package.json .
COPY package-lock.json .
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm --quiet ci

COPY . .
RUN npm set progress=false && \
    npm config set depth 0 && \
    export REACT_APP_WEBSITE_HOST=https://mpox.gen-spectrum.org && \
    export REACT_APP_LAPIS_HOST=https://mpox-lapis.gen-spectrum.org/v1 && \
    npm --quiet run build


## Serve via nginx ##

FROM nginx:stable as server

COPY --from=builder /build/build /app
COPY docker_resources/nginx-mpox-spectrum.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
