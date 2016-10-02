BOARD_DIVS = [];
for (var i = 0; i < 20; i++) {
  BOARD_DIVS.push(new Array(10));
}
BOARD = [];
for (var i = 0; i < 20; i++) {
  BOARD.push([1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1]);
}
for (var i = 20; i < 23; i++) {
  BOARD.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
}

TETRIMINOS_IND = { 0: "L", 1: "J", 2: "I", 3: "S", 4: "Z", 5: "O"};

TETRIMINOS = {};
TETRIMINOS["L"] = [[[0,1,0,0], [0,1,0,0], [0,1,1,0], [0,0,0,0]],
[[1,1,1,0], [0,0,1,0], [0,0,0,0], [0,0,0,0]],
[[0,1,1,0], [0,0,1,0], [0,0,1,0], [0,0,0,0]],
[[0,1,0,0], [0,1,1,1], [0,0,0,0], [0,0,0,0]]];
TETRIMINOS["J"] = [[[0,0,1,0], [0,0,1,0], [0,1,1,0], [0,0,0,0]],
[[1,0,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
[[0,1,1,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]],
[[0,0,0,1], [0,1,1,1], [0,0,0,0], [0,0,0,0]]];
TETRIMINOS["I"] = [[[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
[[1,1,1,1], [0,0,0,0], [0,0,0,0], [0,0,0,0]]];
TETRIMINOS["S"] = [[[0,1,1,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
[[1,0,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]]];
TETRIMINOS["Z"] = [[[0,1,1,0], [0,0,1,1], [0,0,0,0], [0,0,0,0]],
[[0,0,1,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]]];
TETRIMINOS["O"] = [[[0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]]];

MOVE_LEFT = false;
MOVE_RIGHT = false;
ROTATE = false;

ACTIVE_PIECE = null;

TIMER = 0;

$("document").ready(function(){
  for (var i = 0; i < BOARD_DIVS.length; i++){
    for (var j = 0; j < BOARD_DIVS[i].length; j++) {
      $("div.board").append("<div id=" + i + "_" + j + " class='boardsquare'></div>");
      BOARD_DIVS[i][j] = "div#" + i + "_" + j;
    }
  }

  $(document).keydown(function(key){
    if(key.which == 37)
      MOVE_LEFT = true;
    if(key.which == 39){
      MOVE_RIGHT = true;
    }
    if(key.which == 38)
      ROTATE = true;
    if(key.which == 32)
      ACTIVE_PIECE = null;
  });

  game_loop();

});

function game_loop(){
  if(ACTIVE_PIECE == null){
    switch (Math.floor((Math.random() * 5) + 1)) {
      case 0:
        ACTIVE_PIECE = new Tetrimino("I", pos = [0, 4]);
        break;
      case 1:
        ACTIVE_PIECE = new Tetrimino("J", pos = [0, 4]);
        break;
      case 2:
        ACTIVE_PIECE = new Tetrimino("L", pos = [0, 4]);
        break;
      case 3:
        ACTIVE_PIECE = new Tetrimino("O", pos = [0, 4]);
        break;
      case 4:
        ACTIVE_PIECE = new Tetrimino("S", pos = [0, 4]);
        break;
      case 5:
        ACTIVE_PIECE = new Tetrimino("Z", pos = [0, 4]);
        break;
    }

  }
  if(MOVE_RIGHT){
    move_right();
  }
  if(MOVE_LEFT){
      move_left();
  }
  if(ROTATE){
    ACTIVE_PIECE.rotate();
  }

  if (TIMER > 1000){
    drop_piece();
    TIMER = 0;
  }

  draw_piece();

  MOVE_RIGHT = false;
  MOVE_LEFT = false;
  ROTATE = false;
  TIMER += 10;
  window.setTimeout(game_loop, 10);
}

function move_right(){
  var can_move = true;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(ACTIVE_PIECE.current_shape[i][j] == 1){
        if(ACTIVE_PIECE.position[1] + j + 1 > 9)
          can_move = false;
      }
    }
  }
  if(can_move){
      ACTIVE_PIECE.position[1] += 1;
    }
}

function move_left(){
  var can_move = true;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(ACTIVE_PIECE.current_shape[i][j] == 1){
        if(ACTIVE_PIECE.position[1] + j - 1 < 0)
          can_move = false;
      }
    }
  }
  if(can_move){
      ACTIVE_PIECE.position[1] -= 1;
    }
}

function drop_piece(){
  var can_fall = true;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(ACTIVE_PIECE.current_shape[i][j] == 1){
        if(ACTIVE_PIECE.position[0] + i + 1 > 19)
          can_fall = false;
      }
    }
  }
  if(can_fall){
      ACTIVE_PIECE.position[0] += 1;
    }
}

function draw_piece(){
  $(".tetPiece").remove();
  for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if(ACTIVE_PIECE.current_shape[i][j] == 1){
          var par = BOARD_DIVS[i + ACTIVE_PIECE.position[0]][j + ACTIVE_PIECE.position[1]];
          $(par).html("<div class='tetPiece'></div>");
        }
      }
  }
}

  function clear_piece(pieceToClear, whereToClear){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if(pieceToDraw[i][j] == 1){
            var par = BOARD_DIVS[i + whereToDraw[0]][j + whereToDraw[1]];
            $(par).html("<div class='tetPiece'></div>");
          }
        }
    }
}

function check_collisions(mino, pos){
  for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if(mino[i][j] == 1){
          if(pos[0] + i > 19 || pos[1] + j > 9)
            return true;
        }
      }
    }
}

function Tetrimino(type, pos = [0, 0]){
  this.shapes = TETRIMINOS[type],
  this.form = 0,
  this.current_shape = this.shapes[this.form],
  this.position = pos;
};

Tetrimino.prototype.rotate = function () {
   var new_form = this.form + 1;
   if(new_form >= this.shapes.length)
     new_form = 0;
   if(!check_collisions(this.shapes[new_form], this.position))
     this.form = new_form;
}
