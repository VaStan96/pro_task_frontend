FROM nginx:latest

# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY build /usr/share/nginx/html

EXPOSE 80