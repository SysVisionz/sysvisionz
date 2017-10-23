<?php

function sql_move_by_date($mysqli, $move_from, $type_diff, $num_diff, $move_to){
	$mysqli->query("INSERT INTO " . $move_to . " SELECT * FROM " . $move_from . " WHERE DATEDIFF ( " . $type_diff . ", NOW(), timestamp ) > " . $num_diff);
	$mysqli->query("DELETE FROM " . $move_from . " WHERE DATEDIFF (" . $type_diff . ", NOW(), timestamp ) > " . $num_diff);
}

function standard_deviation($array){
	$average = array_sum($array) / count($array);
	$step_array = [];
	foreach($array as $item){
		$result = abs($item - $average);
		$result = pow($result, 2);
		array_push($step_array, $result);
	}
	$average = array_sum($step_array) / count($step_array);
	$standard_deviation = sqrt($average);
	return $standard_deviation;
}

function sql_add_distinct($mysqli, $table){

}

function sql_count_each($mysqli, $column, $table){
	$distinct_vals = $mysqli->query("SELECT DISTINCT " . $column . " FROM " . $table);
	$distinct_array = ;
	while ($row = mysqli_fetch_array($distinct_vals))
	{
		$row[$column];
	}
}