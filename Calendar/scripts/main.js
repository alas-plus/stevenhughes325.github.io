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
        "Welcome " + this.responseText + document.getElementById("login_div").innerHTML +
        "<input type='button' value='Add an Event' onclick='showEvDialog()'>";
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

function showEvDialog(){
  document.getElementById("event_edit").style.display = "block";
}

function editEvent(){
  var eID = event.target.id.split('_')[1];
  var edit_event_xhttp = new XMLHttpRequest();
  // add a function to call when the state changes successfully.
  edit_event_xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      // If the request is successful, set the table to the response
      var resp = this.responseText.split(';');
      document.getElementById('ev_id').value = resp[0];
      document.getElementById('ev_title').value = resp[1];
      document.getElementById('ev_desc').value = resp[2];
      document.getElementById('ev_date').value = resp[3];
      showEvDialog();
    }
  };
  // The request variables
  var pString = "sess=" + SESSION_COOKIE + "&id=" + eID + "&mode=1";
  // Open the connection with the server asychronously
  edit_event_xhttp.open("POST", "./php/event.php", true);
  // Set a request header for POST
  edit_event_xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the request
  edit_event_xhttp.send(pString);

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
      location.reload();
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
    // The request variables
    var pString = "id=" + id + "&date=" + date + "&title=" + title + "&desc=" + desc + "&mode=0" + "&sess=" + SESSION_COOKIE;
    // Open the connection with the server asychronously
    event_xhttp.open("POST", "./php/event.php", true);
    // Set a request header for POST
    event_xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Send the request
    event_xhttp.send(pString);
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

function userLogin(){
  // Called when Login is clicked. Attempts to log the user in with the given
  // credentials
  var username = document.getElementById("username").value,
    password = document.getElementById("password").value;
    if ( username.trim() === '' || password.trim() === ''){
      document.getElementById("login_error").innerHTML =
        "Please provide a valid username and password";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
      document.getElementById("login_error").innerHTML = "";
      var xhttp = new XMLHttpRequest();
      // add a function to call when the state changes successfully.
      xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          // If the request is successful, set the table to the response
          if(this.responseText.indexOf("ERROR:") > -1){
              document.getElementById("login_error").innerHTML = this.responseText;
          } else {
              location.reload();
          }
        }
      };
      // The request variables
      // Mode is create or login
      var pString = "user=" + username + "&pass=" + password + "&mode=" + "1";
      // Open the connection with the server
      xhttp.open("POST", "./php/login.php", true);
      // Set a request header for POST
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // Send the request
      xhttp.send(pString);
    }
}

function userSignup(){
  // Called when sign up is clicked. Attempts to create a user in with the given
  // credentials
  var username = document.getElementById("username").value,
    password = document.getElementById("password").value;
    if ( !valUser(username) || !valPass(password)){
      document.getElementById("login_error").innerHTML =
        "Invalid username or password. Spaces are forbidden";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
      document.getElementById("login_error").innerHTML = "";
      var xhttp = new XMLHttpRequest();
      // add a function to call when the state changes successfully.
      xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          // If the request is successful, set the table to the response
          if(this.responseText.indexOf("ERROR:") > -1){
              document.getElementById("login_error").innerHTML = this.responseText;
          } else {
              location.reload();
          }
        }
      };
      // The request variables
      // Mode is create or login
      var pString = "user=" + username + "&pass=" + password + "&mode=" + "0";
      // Open the connection with the server
      xhttp.open("POST", "./php/login.php", true);
      // Set a request header for POST
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // Send the request
      xhttp.send(pString);
    }
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
    alert("All Passwords require lowercase and uppercase letters, a number , and may not contain spaces.");
    return false;
  }
  if (p.length < 8){
    alert("All Passwords require lowercase and uppercase letters, a number , and may not contain spaces.");
    return false;
  }
  if (!regex_number.test(p) || !regex_caps.test(p) || !regex_lower.test(p)){
    alert("All Passwords require lowercase and uppercase letters, a number , and may not contain spaces.");
    return false;
  }
  return true;
}
