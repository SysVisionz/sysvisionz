<?php
$DB_INFO = array(
	"user" => 'root',
	"password" => 'WrenitaTeemoHenna242',
	"database" => 'zuroff',
	"host" => '45.33.21.59'
);
$mysqli = new mysqli($DB_INFO['host'], $DB_INFO['user'], $DB_INFO['password'], $DB_INFO['database']);
$database_distinct= $mysqli->query("SELECT DISTINCT site FROM advert_week");
foreach ($database_distinct as $row)
{
	echo $row['site'];
}
?>