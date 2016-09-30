BOARD = [[]];
for (var i = 0; i < 20; i++) {
  BOARD.push(new Array(10));
}

$("document").ready(function(){
  for (var i = 0; i < BOARD.length; i++) {
    for (var j = 0; j < BOARD[i].length; j++) {
      $("div.board").append("<div id=" + i + "_" + j + " class='boardsquare'></div>");
      BOARD[i][j] = $("div#" + i + "_" + j);
    }
  }

});

}
