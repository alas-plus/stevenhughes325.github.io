<?php

// request variables
$month = $_REQUEST["month"];
$year = $_REQUEST["year"];
// Call the function to make the calendar table and echo the result
echo genCal($month, $year);

function genCal($mon = '', $yr = ''){
  // timestamp for date
  $timestamp = mktime(0, 0, 0, $mon, 1, $yr);
  // The number of days in the month
  $daysInMonth = date("t", $timestamp);
  // The day of the week the month starts on
  $monStarts = date("w", $timestamp);
  // The Current day of the month
  $cday = 1;
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
        $table .= "\n<td>$cday</td>";
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
