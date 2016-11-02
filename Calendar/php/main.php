<?php

// request variables
$month = $_REQUEST["month"];
$year = $_REQUEST["year"];
$sess = $_REQUEST["sess"];

if ($sess != null){
  session_id($sess);
  session_start();
}

// DB connection variables
$db_host = "localhost";
$db_user = "id86089_shughes";
$db_pass = "tshughes325";
$db_name = "id86089_caldb";

// Call the function to make the calendar table and echo the result
echo genCal($month, $year);

function genCal($mon = '', $yr = ''){
  // References to the db login details
  global $db_host, $db_user, $db_pass, $db_name, $sess;
  // timestamp for date
  $timestamp = mktime(0, 0, 0, $mon, 1, $yr);
  // The number of days in the month
  $daysInMonth = date("t", $timestamp);
  // The day of the week the month starts on
  $monStarts = date("w", $timestamp);
  // The Current day of the month
  $cday = 1;
  $conn = null;
  $events = array();
  if ($sess != null) {
    // If the user is logged in
    $dStart = date("Y-m-d", $timestamp);
    $dEnd = date("Y-t-d", $timestamp);
    $u = $_SESSION["user"];
    // Connection object for the DB
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    $sql = "SELECT * FROM events WHERE user = '$u'";
    // eDate >= '$dStart' AND eDate <= '$dEnd' AND
    $res = $conn->query($sql);
    echo $res->num_rows;
    if ( $res->num_rows > 0 ) {
      while($row = $res->fetch_assoc()) {
        array_push($events, array($row["id"], $row["title"], $row["details"], $row["eDate"]));
      }
    }
  }
  // The table and headers are always the same
  $table = "<table>
  <tr class='daysOweek'>
  <th>Sunday</th>
  <th>Monday</th>
  <th>Tuesday</th>
  <th>Wednesday</th>
  <th>Thursday</th>
  <th>Friday</th>
  <th>Saturday</th>
  </tr>";
  // Loop while the week still has at least 1 day in this month.
  while($cday <= $daysInMonth ){
    // Start a row for the week
    $table .= "\n<tr class='week'>";
    // Loop through each day
    for($x = 0; $x < 7; $x++){
      if (($cday == 1 and $x != $monStarts) or $cday >  $daysInMonth) {
        // If its the first of the month and today is not the day the month
        // starts, add an empty cell
        // or if the current day isn't in the current month
        $table .= "\n<td class='empty'></td>";
      }
      else {
        // Add a cell for the current day
        $table .= "\n<td>\n$cday\n";
        if(count($events) > 0){
          for ($i=0; $i < count($events); $i++) {
            if ($events[$i][3] == date("Y-m-d", mktime(0, 0, 0, $mon, $cday, $yr))) {
              $table .= "<div class='tiny_event' id='event_" . $events[$i][0] . "' onclick='editEvent()'>" . $events[$i][1] . "</div>";
            }
          }
        }
        $table .= "</td>";
        $cday += 1;
      }
    }
    // Close off the week
    $table .= "\n</tr>";
  }
  // Close off the table
  $table .= "\n</table>";
  // Return the table html
  return $table;
}

 ?>
