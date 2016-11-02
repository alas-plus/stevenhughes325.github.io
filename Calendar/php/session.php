<?php

// request variables
$sess = $_REQUEST["sess"];
$info = $_REQUEST["info"];

session_id($sess);
session_start();

echo $_SESSION["user"];

?>
