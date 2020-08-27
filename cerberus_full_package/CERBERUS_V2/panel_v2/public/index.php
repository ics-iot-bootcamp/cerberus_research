<?php
require_once 'config.php';
if(isset($_GET['logout'])) {
	logOut();
}
$notvalidkey = false;
$SubscribeEnded = false;

if(isset($_POST['key'])) {
	$_SESSION['key'] = $_POST['key'];
	
	$notvalidkey = !$database->has("users", ["privatekey" => $_SESSION['key'] ]);
}

$SubscribeEnded = !GetValidSubscribe() && isset($_SESSION['key']);

if(GetValidSubscribe()) { 
	$urllink = $database->get("users", "url", [
		"privatekey" => $_SESSION['key']
	]);
	setcookie('restApiUrl', $urllink);
	echo file_get_contents('index.html');
}
else {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="/css/roboto.css">
    <link rel="stylesheet" href="/css/Akronim.css">
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/toastr.css">
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/main.css">
    <style>
body, html {
    background-color: #1e1d2b !important;
    background-image: url(/img/logo_black.png) !important;
    background-size: cover !important;
}
.centered {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
    background-color: #20283a;
    background-clip: border-box;
    border: 1px solid #00ffbf  !important;
    border-radius: 0.25rem;
    padding: 0px 20px;
	width: 300px;
	height: 250px;
}
.form-control {
    display: block;
    height: calc(1.5em + 9.12rem + 2px) !important;
    padding: 0.375rem 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #ecf5ff;
    background-color: #343247;
    background-clip: padding-box;
    border: 1px solid #00ffbf;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	width: 100%;
	height: 50%;
	resize:none;
    font-family: monospace;
    font-size: 18px;
}
.errorkey {
	color: red;
    margin-top: 2px;
	display: block;
	max-width: 150px;
}
    </style>
</head>
<body>
    <form class="centered" method="post" action="/">
        <h5 style="margin-top: 10px;">Enter key</h5>
        <textarea class="form-control" name="key" placeholder="Enter authorize key"></textarea>
		<?php if($notvalidkey) { ?>
		<p class="errorkey" style="color: red;margin-top: 2px;">Key not valid</p>
		<?php } ?>
		<?php if(!$notvalidkey && $SubscribeEnded) { ?>
		<p class="errorkey" style="color: red;margin-top: 2px;">Your subscription has ended</p>
		<?php } ?>
        <p style="margin-top: 10px; text-align: right;"><input class="btn btn-outline-info" type="submit"></p>
    </form>
</body>
</html>
<?php 
}
?>