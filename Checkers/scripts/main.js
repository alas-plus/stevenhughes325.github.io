ACTIVE_PIECE = null;
BLACK_TURN = true;
BLUE_PIECES = [];
WHITE_PIECES = [];

$(document).ready(function(){
  $("div.board").ready(function(){
      var borw = true;
      var color = "black";
      for(var i = 0; i < 8; i += 1){
        for(var j = 0; j < 8; j += 1){
          borw = !borw;
          if(borw){
            color = "black";
          }else{
            color = "red";
          }
          var curr_id = i + "_" + j;
          var curr_class = color + "_square"
          $("div.board").append('<div id="' + i + '_' + j + '" class="' + color + '_square"/>')
        }
        borw = !borw;
      }
      // Create black pieces
      var d_tile = 1;
      var x = 0;
      for(var i = 0; i < 3; i += 1){
        for(var j = 0; j < 8; j += 1){
          if((j % 2) == d_tile){
            var tgt_square = i + "_" + j;
            var tgt_piece = "blue_" + x;
            BLUE_PIECES.push(tgt_piece);
            $( "div#" + tgt_square  ).html('<div id="' + tgt_piece + '" class="blue_piece"/>');
            $( "div#" + tgt_piece ).click(function(){
              if(BLACK_TURN){
                check_move($(this));
              }
            });
            x += 1;
          }
        }
        if(d_tile == 1){
          d_tile = 0;
        }else{
          d_tile = 1;
        }
      }
      // Create white pieces
      var d_tile = 0;
      var x = 0;
      for(var i = 5; i < 8; i += 1){
        for(var j = 0; j < 8; j += 1){
          if((j % 2) == d_tile){
            var tgt_id = i + "_" + j;
            var tgt_piece = "white_" + x;
            WHITE_PIECES.push(tgt_piece);
            $( "div#" + tgt_id  ).html('<div id="' + tgt_piece + '" class="white_piece"/>');
            $( "div#" + tgt_piece ).click(function(){
              if(!BLACK_TURN){
                check_move($(this));
              }
            });
            x += 1;
          }
        }
        if(d_tile == 1){
          d_tile = 0;
        }else{
          d_tile = 1;
        }
      }
    });
});

function check_move(dToCheck){
  clear_moves();
  ACTIVE_PIECE = dToCheck;
  var dPieceColor = dToCheck.prop("id").split("_")[0];
  var isKing = dToCheck.css("background-image") != "none";
  var par_xy = dToCheck.parent().prop("id").split("_");
  par_xy[0] = parseInt(par_xy[0]);
  par_xy[1] = parseInt(par_xy[1]);
  var neighbors = [];
  if(par_xy[0] != 0){
    if(par_xy[1] != 0 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] + 1));
  }
  if(par_xy[0] != 7){
    if(par_xy[1] != 0 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] + 1));
  }
  for(var e = 0; e < neighbors.length; e += 1){
    if($( "div#" + neighbors[e]  ).html() == ""){
      var s_class = $( "div#" + neighbors[e]  ).prop("class");
      $( "div#" + neighbors[e]  ).removeClass(s_class);
      $( "div#" + neighbors[e]  ).addClass("move_square");
    }else if ($( "div#" + neighbors[e]  ).html().indexOf(dPieceColor) == -1) {
      // Means there is an opposing piece in a neighboring space
      // Need to check for valid jumps
      check_jump(dToCheck, $( "div#" + $( "div#" + neighbors[e]  ).children().prop("id")));
    }
  }
  $( ".move_square" ).click(function(){
    move_piece($(this));
  });
}

function check_jump(movingPiece, tgtPiece){
  var dPieceColor = movingPiece.prop("id").split("_")[0];
  var isKing = movingPiece.css("background-image") != "none";
  var movXY = movingPiece.parent().prop("id").split("_");
  var foundJumps = false;
  movXY[0] = parseInt(movXY[0]);
  movXY[1] = parseInt(movXY[1]);
  var par_xy = tgtPiece.parent().prop("id").split("_");
  par_xy[0] = parseInt(par_xy[0]);
  par_xy[1] = parseInt(par_xy[1]);
  var neighbors = [];
  if(par_xy[0] != 0){
    if(par_xy[1] != 0 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] + 1));
  }
  if(par_xy[0] != 7){
    if(par_xy[1] != 0 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] + 1));
  }
  for(var e = 0; e < neighbors.length; e += 1){
    var neighXY = neighbors[e].split("_");
    neighXY[0] = parseInt(neighXY[0]);
    neighXY[1] = parseInt(neighXY[1]);
    if($( "div#" + neighbors[e]  ).html() == "" &&
    Math.abs(neighXY[0] - movXY[0]) == 2 &&
    Math.abs(neighXY[1] - movXY[1]) == 2){
      var s_class = $( "div#" + neighbors[e]  ).prop("class");
      $( "div#" + neighbors[e]  ).removeClass(s_class);
      $( "div#" + neighbors[e]  ).addClass("move_square");
      $( "div#" + neighbors[e]  ).html(tgtPiece.prop("id"));
      foundJumps = true;
    }
  }
  return foundJumps;
}

function only_check_jump(movingPiece, tgtPiece){
  var dPieceColor = movingPiece.prop("id").split("_")[0];
  var isKing = movingPiece.css("background-image") != "none";
  var par_xy = tgtPiece.parent().prop("id").split("_");
  par_xy[0] = parseInt(par_xy[0]);
  par_xy[1] = parseInt(par_xy[1]);
  var neighbors = [];
  if(par_xy[0] != 0){
    if(par_xy[1] != 0 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] + 1));
  }
  if(par_xy[0] != 7){
    if(par_xy[1] != 0 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] + 1));
  }
  return neighbors;
}

function only_check_move(dToCheck){
  var dPieceColor = dToCheck.prop("id").split("_")[0];
  var isKing = dToCheck.css("background-image") != "none";
  var par_xy = dToCheck.parent().prop("id").split("_");
  par_xy[0] = parseInt(par_xy[0]);
  par_xy[1] = parseInt(par_xy[1]);
  var neighbors = [];
  if(par_xy[0] != 0){
    if(par_xy[1] != 0 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "white" || isKing))
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] + 1));
  }
  if(par_xy[0] != 7){
    if(par_xy[1] != 0 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7 && (dPieceColor == "blue" || isKing))
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] + 1));
  }
  var valid_multi = []
  for(var e = 0; e < neighbors.length; e += 1){
    var neighborPiece = $( "div#" + neighbors[e]  );
    if (neighborPiece.html() != "" &&
    neighborPiece.html().indexOf(dPieceColor) == -1) {
      // Means there is an opposing piece in a neighboring space
      // Need to check for valid jumps
      valid_multi.push($("div#" + neighborPiece.children().prop("id")));
    }
  }
  return valid_multi;
}

function clear_moves(){
  $(".move_square").off("click");
  var even_row = true;
  for(var i = 0; i < 8; i += 1){
    for(var j = 0; j < 8; j += 1){
      if(even_row){
        if(j % 2 == 1){
          var tgt_square =   $( "div#" + (i + "_" + j));
          tgt_square.removeClass("move_square");
          tgt_square.addClass("black_square");
          if(tgt_square.html().indexOf("div") == -1)
            tgt_square.html("");
        }
      }else{
        if(j % 2 == 0){
          var tgt_square =   $( "div#" + (i + "_" + j));
          tgt_square.removeClass("move_square");
          tgt_square.addClass("black_square");
          if(tgt_square.html().indexOf("div") == -1)
            tgt_square.html("");
        }
      }
    }
    even_row = !even_row;
  }
}

function move_piece(sqToMove){
  var piece_html = ACTIVE_PIECE.parent().html();
  var pieceColor = ACTIVE_PIECE.prop("id").split("_")[0];
  var followUpAttack = false;
  var killed = false;
  var squareRow = parseInt(sqToMove.prop("id").split("_")[0]);
  if ((squareRow == 0 || squareRow == 7) &&
  ACTIVE_PIECE.css("background-image") == "none") {
    ACTIVE_PIECE.css("background-image", "url('./media/crown.png')");
    piece_html = ACTIVE_PIECE.parent().html();
  }
  ACTIVE_PIECE.parent().html("");
  if(sqToMove.html() != ""){
    var pieceToKill = sqToMove.html();
    $( "div#" + pieceToKill ).remove();
    var pos = BLUE_PIECES.indexOf(pieceToKill);
    if (pos == -1) {
      pos = WHITE_PIECES.indexOf(pieceToKill);
      WHITE_PIECES.splice(pos, 1);
    }else{
      BLUE_PIECES.splice(pos, 1);
    }
    killed = true;
  }
  sqToMove.html(piece_html);
  if(piece_html.indexOf("white") > -1){
    sqToMove.children().click(function(){
      if(!BLACK_TURN){
        check_move($(this));
      }
    });
  }else{
    sqToMove.children().click(function(){
      if(BLACK_TURN){
        check_move($(this));
      }
    });
  }
  clear_moves();
  ACTIVE_PIECE = $("div#" + ACTIVE_PIECE.prop("id"));
  if(killed){
    var followUp = only_check_move(ACTIVE_PIECE);
    if(followUp.length > 0){
      for(var i = 0; i < followUp.length; i += 1){
        if(check_jump($("div#" + ACTIVE_PIECE.prop("id")), $("div#" + followUp[i].prop("id")))){
          followUpAttack = true;
        }
      }
      $( ".move_square" ).click(function(){
        move_piece($(this));
      });
    }
  }
  if(followUpAttack){
    $("." + pieceColor + "_piece").off("click");
  }else{
    if(pieceColor == "blue"){
        $("." + pieceColor + "_piece").click(function(){
          if(BLACK_TURN){
            check_move($(this));
          }
        });
    }else{
      $("." + pieceColor + "_piece").click(function(){
        if(!BLACK_TURN){
          check_move($(this));
        }
      });
    }
    BLACK_TURN = !BLACK_TURN;
    if(BLUE_PIECES.length == 0){
      $("div.commentary").html("Red Wins!!!");
    }else if(WHITE_PIECES.length == 0){
      $("div.commentary").html("Black Wins!!!");
    }else if(BLACK_TURN){
      $("div.commentary").html("Black's turn!");
    }else{
      $("div.commentary").html("Red's turn!");
    }
  }
}
