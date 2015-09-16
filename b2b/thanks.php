<?php

function check() {
	return
		!empty($_POST["name"]) &&
		// !empty($_POST["email"]) &&
		!empty($_POST["organization"]) &&
		// !empty($_POST["tel"]) &&
		!empty($_POST["product"]) &&
		!empty($_POST["amount"]) &&
		!empty($_POST["help"]) &&
		filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) &&
		preg_match("/^[0-9\-\+]{3,25}$/", $_POST["tel"]);
}

if (!check()) {
	header("Location: error.html");
	exit();
}

require_once('submit.php'); 
echo file_get_contents('thanks.html');