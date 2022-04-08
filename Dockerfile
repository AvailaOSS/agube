# Node build
FROM node:16.14.2 AS nodebuilder

WORKDIR /availa-agube

# Install dependencies
COPY package*.json .
COPY .npmrc .
RUN npm ci

# Copy code
COPY . .

# Delete .npmrc
RUN rm .npmrc

# Build
RUN npm run build

# Delete nginx files
RUN rm -r nginx

# NGINX publish
FROM nginx:1.21

# Copy config
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Permissions
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
RUN chown -R nginx:nginx /usr/share/nginx/html

# User
USER nginx

# Copy Node build
COPY --from=nodebuilder /availa-agube/dist/agube-fe /usr/share/nginx/html