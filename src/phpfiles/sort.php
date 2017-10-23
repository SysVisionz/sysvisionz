<?php
$DB_INFO = array(
	user => 'root',
	password => 'WrenitaTeemoHenna242',
	database => 'zuroff',
	host => '45.33.21.59'
)
$mysqli = new mysqli($DB_INFO -> host, $DB_INFO -> user, $DB_INFO -> password, $DB_INFO -> database);

if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
$entries_today= $mysqli -> query("SELECT DISTINCT site FROM entries_today");
while ($row = mysqli_fetch_array
	
}
sql_move_by_date($mysqli, "advert_week", "day", 7, "advert_month");
sql_move_by_date($mysqli, "advert_month", "month", 1, "advert_three");
sql_move_by_date($mysqli, "advert_three", "month", 3, "advert_six");
sql_move_by_date($mysqli, "advert_six", "month", 6, "advert_year");
$mysqli->query("DELETE FROM advert_year WHERE DATEDIFF (year, NOW(), timestamp ) > 1");



function 

?>