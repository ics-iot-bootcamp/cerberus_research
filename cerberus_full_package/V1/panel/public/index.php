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
<style>
html body {
    background: #1e1d2b;
    color: white;
}
.centered {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
    background-color: #20283a;
    background-clip: border-box;
    border: 1px solid #007bff !important;
    border-radius: 0.25rem;
    padding: 0px 20px;
	width: 300px;
	height: 250px;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
    float: right;
    margin-bottom: 20px;
	position: absolute;
	bottom: 0px;
	right: 25px;
}
.form-control {
    display: block;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #ecf5ff;
    background-color: #343247;
    background-clip: padding-box;
    border: 1px solid #385572;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	width: 90%;
	height: 50%;
	resize:none;
}
.btn-outline-info:hover {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
}
.btn-outline-info {
    color: #17a2b8;
    border-color: #17a2b8;
}
h5 {
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 12px;
    margin-top: 6px;
    overflow-wrap: break-word;
    text-align: left;
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
        <h5>Enter key</h5>
        <textarea class="form-control" name="key" placeholder="Enter authorize key"></textarea>
		<?php if($notvalidkey) { ?>
		<p class="errorkey" style="color: red;margin-top: 2px;">Key not valid</p>
		<?php } ?>
		<?php if(!$notvalidkey && $SubscribeEnded) { ?>
		<p class="errorkey" style="color: red;margin-top: 2px;">Your subscription has ended</p>
		<?php } ?>
        <p><input class="btn btn-outline-info" type="submit"></p>
    </form>
</body>
</html>
<?php 
}
?>