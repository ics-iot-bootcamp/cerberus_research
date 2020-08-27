<?php 

/*if($_SERVER['SERVER_NAME'] != 'reil424lawk6u65o.onion') {
	die('Welcome to my website');
	return;
}*/
require_once 'medoo.php';

session_start();

// Using Medoo namespace
use Medoo\Medoo;

$database = new Medoo([
	// required
    'database_type' => 'mysql',
    'database_name' => 'mmm_builder',
    'server' => 'localhost',
    'username' => 'root',
    'password' => '350638'
]);

function logOut() {
	session_destroy();
	header("Location: /mmm_builder");
	die();
}

function GetValidSubscribe() {
	global $database;
	
	if(!isset($_SESSION['key_log']))
		return false;
	
	$res = $database->get("users","end_subscribe", ["privatekey" => $_SESSION['key_log']]);
		
	if(!res)return false;
	
	return (time()<=strtotime($res));
}
?>
