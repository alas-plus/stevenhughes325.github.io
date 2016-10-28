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
  // Vreate a request object
  var xhttp = new XMLHttpRequest();
  // add a function to call when the state changes successfully.
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      // If the request is successful, set the table to the response
      document.getElementById("calendar").innerHTML = this.responseText;
    }
  };
  // The request variables
  var pString = "month=" + month + "&year=" + year;
  // Open the connection with the server asychronously
  xhttp.open("POST", "./php/main.php", true);
  // Set a request header for POST
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send the request
  xhttp.send(pString);
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
      console.log(username);
      console.log(password);
      var xhttp = new XMLHttpRequest();
      // add a function to call when the state changes successfully.
      xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          // If the request is successful, set the table to the response
          document.getElementById("login_error").innerHTML = this.responseText;
        }else {
          echo this.readyState;
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
