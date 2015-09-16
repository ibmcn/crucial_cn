<?php

file_put_contents('leads.txt', json_encode($_POST) . "\n\n", FILE_APPEND);

function getClientIP() {

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    	return $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	    return $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
	    return $_SERVER['REMOTE_ADDR'];
	}
	return "";
}

$fields = array_merge(array(), $_POST);
$fields['ip'] = getClientIP();

if ( isset( $_SERVER["HTTP_REFERER"] ) ) {
    $fields["referer"] = $_SERVER["HTTP_REFERER"];
}

if( !isset( $fields['email'] ) || $fields['email'] == '') {
	header("Location: index.html?error");
	die();
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://lp.wpic-tools.com/api?api=submit");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 10000);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// User-Agent
if ( isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
}
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
$data = curl_exec($ch);
curl_close($ch);

?>
