FROM nginx:alpine

# Copiar archivos de la aplicación
COPY . /usr/share/nginx/html

# Configurar nginx
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Habilitar compresión
    gzip on;
    gzip_types text/css application/javascript application/json;

    # Cacheo de assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # PWA Service Worker
    location /sw.js {
        add_header Cache-Control "no-cache";
    }

    # Manifest
    location /manifest.json {
        add_header Cache-Control "no-cache";
    }

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
