<?php 
require_once 'config.php';

if(GetValidSubscribe()) {

	$urllink = $database->get("users", "domain", [
		"privatekey" => $_SESSION['key']
	]);

	$licensedays = $database->get("users", "end_subscribe", [
		"privatekey" => $_SESSION['key']
	]);
	$licensedays = round(abs(strtotime($licensedays) - time())/60/60/24);

	header('Content-Type: application/json');
	echo '{"domain":"'.$urllink.'","license":"'.$licensedays.'"}';
}
else { 
	die('you are not authorized');
}
?>