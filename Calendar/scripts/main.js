SESSION_COOKIE = null,
USER = null;

function initialize() {
  var cookie = getCookie("PHPSESSID");
  if (cookie != false){
    SESSION_COOKIE = cookie.split('=')[1];
    var user_event_xhttp = new XMLHttpRequest();
    // add a function to call when the state changes successfully.
    user_event_xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        // If the request is successful, set the table to the response
        document.getElementById("login_div").innerHTML =
        "Welcome " + this.responseText + document.getElementById("login_div").innerHTML;
      }
    };
    // The request variables
    var pString = "sess=" + SESSION_COOKIE + "&info='username'";
    // Open the connection with the server asychronously
    user_event_xhttp.open("POST", "./php/session.php", true);
    // Set a request header for POST
    user_event_xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Send the request
    user_event_xhttp.send(pString);
  } else {
    SESSION_COOKIE = null;
    document.getElementById("login_div").innerHTML = "<form class='user_login'>\
      <label for='username'>Username:</label>\
      <input type='username' name='username' id='username' value=''>\
      <br>\
      <label for='password'>Password:</label>\
      <input type='password' name='password' id='password' value=''>\
      <br>\
      <span>\
      <input type='button' name='login' value='Login' onclick='userLogin()'>\
      <input type='button' name='signup' value='Sign Up' onclick='userSignup()'>\
      </span>\
    </form>" + document.getElementById("login_div").innerHTML;
  }
  defCal();
}

function editEvent(){
  console.log(event.target.id)
}

function subEvent(){
  var id = document.getElementById('ev_id').value,
  date = document.getElementById('ev_title').value,
  title = document.getElementById('ev_date').value,
  desc = document.getElementById('ev_desc').value;
  var event_xhttp = new XMLHttpRequest();
  // add a function to call when the state changes successfully.
  event_xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      // If the request is successful, set the table to the response
      console.log(this.responseText);
    }
  };
  if (id == "") {
    // The request variables
    var pString = "date=" + date + "&title=" + title + "&desc=" + desc + "&mode=0" + "&sess=" + SESSION_COOKIE;
    // Open the connection with the server asychronously
    event_xhttp.open("POST", "./php/event.php", true);
    // Set a request header for POST
    event_xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Send the request
    event_xhttp.send(pString);
  } else {
    console.log("TODO");
  }
}

function fetchCal() {
  // Function calls for the table to be made

  // Get the month and year from the form
  var monthSelect = document.getElementById("month_select");
  var month = monthSelect.options[monthSelect.selectedIndex].value;
  var year = document.getElementById("year_box").value;
  // Make sure the year is valid
  year = valYear(year);
  if(!year){
    // If an invalid year is entered, stop the request
    alert("Invalid year entry.");
    return false;
  }
  // Set the month displayed to the month being fetched
  document.getElementById("month_span").innerHTML =
  monthSelect.options[monthSelect.selectedIndex].innerHTML;
  // Create a request object
  var event_xhttp = new XMLHttpRequest();
  // add a function to call when the state changes successfully.
  event_xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      // If the request is successful, set the table to the response
      document.getElementById("calendar").innerHTML = this.responseText;
    }
  };
  // The request variables
  var pString = "month=" + month + "&year=" + year + "&sess=" + SESSION_COOKIE;
  // Open the connection with the server asychronously
  event_xhttp.open("POST", "./php/main.php", true);
  // Set a request header for POST
  event_xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the request
  event_xhttp.send(pString);
}

function defCal(){
  // Called on load to get the calendar for the current date
  var today = new Date();
  document.getElementById("month_select").value = today.getMonth() + 1;
  document.getElementById("year_box").value = today.getFullYear();
  fetchCal();
}

function valYear(yr){
  yr = parseInt(yr);
  if(typeof(yr) ==='number' && (yr%1)===0){
    // Is definately an integer
    return yr;
  }
  else{
    return false;
  }
}

function getCookie(cookie){
  var c_arr = document.cookie.split(';');
  for (var i = 0; i < c_arr.length; i++) {
    if(c_arr[i].split('=')[0] == cookie){
      return c_arr[i];
    }
  }
  return false;
}

function valUser(user){
  var u = user.trim();
  if (u.length < 3) {
    return false;
  }
  return true;
}

function  valPass(pass){
  var p = pass.trim(),
  regex_caps = /[A-Z]/,
  regex_lower = /[a-z]/,
  regex_number = /[0-9]/;
  if (p.indexOf(' ') > -1){
    alert("password space");
    return false;
  }
  if (p.length < 8){
    alert("password Length");
    return false;
  }
  if (!regex_number.test(p) || !regex_caps.test(p) || !regex_lower.test(p)){
    alert("password reg");
    return false;
  }
  return true;
}
