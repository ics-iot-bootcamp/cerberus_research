#!/bin/bash

apt update

apt install nginx tor php-fpm -y
apt purge apache2 -y

#GET PHP FPM VERSION
FPMVERSION=$(find /run/php/ -name 'php7.*-fpm.sock' | head -n 1)

read -r -d '' PHPCONFIGFPM << EOM
    location ~ \.php$ { 
        try_files \$uri =404; 
        include /etc/nginx/fastcgi.conf;
        fastcgi_pass unix:$FPMVERSION; 
    }
EOM

#READ HOSTNAME FOR NGINX WEBSITE
TORHOSTNAME=$(cat /var/lib/tor/service1/hostname)

read -r -d '' DefaultNGINX << EOM
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html;
        server_name _;
        
        add_header Access-Control-Allow-Origin "*";
        
        $PHPCONFIGFPM
}
server {
        listen 8080 default_server;
        listen [::]:8080 default_server;
        root /var/www/tor;
        index index.html;
        server_name $TORHOSTNAME;
        
        add_header Access-Control-Allow-Origin "*";
        
        $PHPCONFIGFPM
}
EOM

echo "$DefaultNGINX" > /etc/nginx/sites-available/default

nginx -s reload
systemctl stop nginx
systemctl start nginx
systemctl restart tor
