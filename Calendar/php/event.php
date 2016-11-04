<?php

// request variables
$date = null;
$title = null;
$desc =  null;
$mode = $_REQUEST["mode"];
$sess = $sess = $_REQUEST["sess"];
$id = $_REQUEST["id"];
if ($mode == 1) {
  session_id($sess);
  session_start();
  getEvent($id);
} else {
  session_id($sess);
  session_start();
  $date = $_REQUEST["title"];
  $title = $_REQUEST["date"];
  $desc =  $_REQUEST["desc"];
  if(is_null($id)){
    echo  InsertEvent($date, $title, $desc);
  } else {
    echo UpdateEvent($id, $date, $title, $desc);
  }
}

function getEvent($id){
  // DB connection variables
  $db_host = "localhost";
  $db_user = "id86089_shughes";
  $db_pass = "tshughes325";
  $db_name = "id86089_caldb";
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  $sql = "SELECT * FROM events WHERE id = '$id'";
  $res = $conn->query($sql);
  if ( $res->num_rows > 0 ) {
    $row = $res->fetch_assoc();
    echo $row["id"] . ";" . $row["title"] . ";" . $row["details"] . ";" . $row["eDate"];
  }
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

function UpdateEvent($i, $w, $t, $d){
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
  $up_sql = "UPDATE events SET title='$t', details='$d', eDate='$w' WHERE id='$i'";
  if($conn->query($up_sql) === TRUE){
    echo "SUCCESS";
  } else {
    echo $up_sql;
  }
}

?>
