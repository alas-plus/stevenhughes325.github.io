<?php

// request variables
$date = $_REQUEST["title"];
$title = $_REQUEST["date"];
$desc =  $_REQUEST["desc"];
$mode = $_REQUEST["mode"];
$sess = $sess = $_REQUEST["sess"];
$id = null;
if ($mode == 1) {
  $id = $_REQUEST["id"];
} else {
  session_id($sess);
  session_start();
  echo  InsertEvent($date,$title, $desc);
}


function InsertEvent($w, $t, $d){
  // DB connection variables
  $db_host = "localhost";
  $db_user = "id86089_shughes";
  $db_pass = "tshughes325";
  $db_name = "id86089_caldb";
  $u = $_SESSION["user"];
  // Connection object for the DB
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  // Ensure the connection was successful
  if ($conn->connect_error) {
    die("Unable to connect to databse: " . $conn->connect_error);
  }
  $ins_sql = "INSERT INTO events (title, details, user, eDate) VALUES ('$t', '$d', '$u', '$w')";
  if($conn->query($ins_sql) === TRUE){
    echo "SUCCESS";
  } else {
    echo $ins_sql;
  }
}

?>
