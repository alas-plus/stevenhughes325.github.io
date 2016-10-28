<?php

// request variables
$user = $_REQUEST["user"];
$pass = $_REQUEST["pass"];
$mode = $_REQUEST["mode"];

// DB connection variables
$db_host = "localhost";
$db_user = "id86089_shughes";
$db_pass = "tshughes325";
$db_name = "id86089_caldb";

if ($mode == 1) {
  // Call the function to attempt to log the user in
  echo user_login($user, $pass);
} else {
  echo signup($user, $pass);
}

function user_login($u, $p){
  // References to the db login details
  global $db_host, $db_user, $db_pass, $db_name;
  // Connection object for the DB
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  // Ensure the connection was successful
  if ($conn->connect_error) {
    die("Unable to connect to databse: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM users WHERE username = '$u' LIMIT 1";
  $res = $conn->query($sql);
  if ($res->num_rows > 0) {
    // rsult was found
    $sql2 = "SELECT * FROM users WHERE username = '$u' AND password = '$p' LIMIT 1";
    $res2 = $conn->query($sql2);
    if ($res2->num_rows != 0) {
      echo "Found combo";
    } else {
      echo "Invalid Password";
    }
  } else {
    echo "User not found...";
  }
}

?>
