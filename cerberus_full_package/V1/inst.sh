#!/bin/bash

apt update

apt install systemd -y
apt install apache2 -y
apt install tor -y
rm -rf /lib/systemd/system/tor.service

#CREATE TOR SERVICE CONFIG FILE
echo "[Unit]" >> /lib/systemd/system/tor.service
echo "Description=Anonymizing overlay network for TCP (multi-instance-master)" >> /lib/systemd/system/tor.service
echo "" >> /lib/systemd/system/tor.service
echo "[Service]" >> /lib/systemd/system/tor.service
echo "User=root" >> /lib/systemd/system/tor.service
echo "Group=root" >> /lib/systemd/system/tor.service
echo "RemainAfterExit=yes" >> /lib/systemd/system/tor.service
echo "ExecStart=/usr/bin/tor --RunAsDaemon 0" >> /lib/systemd/system/tor.service
echo "ExecReload=/bin/killall tor" >> /lib/systemd/system/tor.service
echo "KillSignal=SIGINT" >> /lib/systemd/system/tor.service
echo "TimeoutStartSec=300" >> /lib/systemd/system/tor.service
echo "TimeoutStopSec=60" >> /lib/systemd/system/tor.service
echo "Restart=on-failure" >> /lib/systemd/system/tor.service
echo "" >> /lib/systemd/system/tor.service
echo "[Install]" >> /lib/systemd/system/tor.service
echo "WantedBy=multi-user.target" >> /lib/systemd/system/tor.service

rm -rf /usr/share/tor/tor-service-defaults-torrc
rm -rf /etc/tor/torrc

#CREATE TOR CONFNIG FILE
echo "HiddenServiceDir /var/lib/tor/service1" >> /etc/tor/torrc
echo "HiddenServicePort 80 127.0.0.1:8080" >> /etc/tor/torrc

#remove old domain info
rm -rf /var/lib/tor/service1/

systemctl daemon-reload
systemctl restart tor
sleep 5
#READ HOSTNAME FOR APACHEE2 WEBSITE
TORHOSTNAME=$(cat /var/lib/tor/service1/hostname)

rm -rf /etc/apache2/sites-available/example.onion.conf
#CREATE WEBSITE CONFIG
echo "Listen 127.0.0.1:8080" >> /etc/apache2/sites-available/example.onion.conf
echo "<VirtualHost 127.0.0.1:8080>" >> /etc/apache2/sites-available/example.onion.conf
echo "   ServerName $TORHOSTNAME" >> /etc/apache2/sites-available/example.onion.conf
echo "   DocumentRoot /var/www/tor/" >> /etc/apache2/sites-available/example.onion.conf
echo "   ErrorLog \${APACHE_LOG_DIR}/tor_error.log" >> /etc/apache2/sites-available/example.onion.conf
echo "   CustomLog \${APACHE_LOG_DIR}/tor_access.log combined" >> /etc/apache2/sites-available/example.onion.conf
echo "</VirtualHost>" >> /etc/apache2/sites-available/example.onion.conf

a2ensite example.onion.conf

mkdir /var/www/tor

echo "hi $TORHOSTNAME new website" > /var/www/tor/index.html

systemctl restart apache2
systemctl restart tor

#INSTALL PHP AND MYSQL
apt install mysql-server -y
apt install phpmyadmin -y
apt install php php-cli php-xml php-mysql php-curl php-mbstring php-zip libapache2-mod-php -y 
rm -rf /var/www/html/phpmyadmin
ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin

#IMPORT DB
echo "Enter root password: "
read password
torsocks wget http://2qgsboq472ntqev5.onion/bot.sql
mysql -uroot --password="$password" -e "CREATE DATABASE bot /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -uroot --password="$password" -e "CREATE USER 'non-root'@'localhost' IDENTIFIED BY '$password';"
mysql -uroot --password="$password" bot < bot.sql
mysql -uroot --password="$password" -e "GRANT ALL PRIVILEGES ON *.* TO 'non-root'@'localhost';"
mysql -uroot --password="$password" -e "FLUSH PRIVILEGES;"
rm -rf bot.sql
a2enmod headers

echo ""
echo ""
echo ""
echo "============================="
echo "INSTALLATION COMPLETE!"
echo "ADD CORS HEADER TO /etc/apache2/apache2.conf"
echo "Header set Access-Control-Allow-Origin \"*\""
echo "AND ADD GATE AND RESTAPI"
echo ""
echo "Tor domain: $TORHOSTNAME"
echo "Mysql host: localhost"
echo "Mysql user: non-root"
echo "Mysql root password: $password"
