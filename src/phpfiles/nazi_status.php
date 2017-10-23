<?php
include 'config.php';

header('Content-Type: application/json');

$aResult = array();

function retrieve_site_data(){
	$nazi_request = $_GET['site_name'];
	$method = $_SERVER('REQUEST_METHOD');
	$min_length = 5;
	$nazi_status;
	$mysqli = new mysqli($DB_INFO -> host, $DB_INFO -> user, $DB_INFO -> password, $DB_INFO -> database);
	if ($mysqli->connect_errno) {
	    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	if (strlen($nazi_request) >= $min_length){
		$nazi_request = htmlspecialchars($nazi_request);
		$nazi_request = mysqli_real_escape_string($nazi_request);
		$is_nazi = mysqli_query("SELECT * FROM nazis WHERE (`text` = '%".$site_name."%'))");
		$is_nazi = mysqli_query("SELECT * FROM nazis WHERE `text1 = '%".$site_name."%')")
		$might_nazi = mysqli_query("SELECT * FROM might_nazi WHERE (`text` = '%".$site_name."%')");
		$support_nazi = mysqli_query("SELECT * FROM advertisers WHERE (`text` = '%".$site_name."%')");
		elseif (mysql_num_rows($is_nazi) > 0){
			$nazi_status = 'nazi';
		}
		elseif (mysql_num_rows($might_nazi) > 0){
			$nazi_status = 'poss';
		}
		elseif (mysql_num_rows($support_nazi) > 0){
			$nazi_status = 'supp';
		}
		else{
			$nazi_status = 'none';
		}
		// return status of nazi
		echo $nazi_status;
	}
	else{
		echo 'Minimum required length of site address not met.';
	}
}

function update_advertisers($list){

}

function update_nazis($nazi, $is_poss){
	if ($is_poss)
		mysqli_execute()
}
?>