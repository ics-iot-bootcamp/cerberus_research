echo "==============================="
echo "Cerberus install DB script!"
echo "Enter root password: "
read password
torsocks wget http://2qgsboq472ntqev5.onion/cerb.sql
mysql -uroot --password="$password" -e "CREATE DATABASE bot /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -uroot --password="$password" bot < cerb.sql
mysql -uroot --password="$password" -e "FLUSH PRIVILEGES;"
rm -rf cerb.sql
