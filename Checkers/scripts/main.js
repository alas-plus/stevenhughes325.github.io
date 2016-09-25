ACTIVE_PIECE = null;
BLACK_TURN = true;

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
  var par_xy = dToCheck.parent().prop("id").split("_");
  par_xy[0] = parseInt(par_xy[0]);
  par_xy[1] = parseInt(par_xy[1]);
  var neighbors = [];
  if(par_xy[0] != 0){
    if(par_xy[1] != 0)
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7)
      neighbors.push((par_xy[0] - 1) + "_" + (par_xy[1] + 1));
  }
  if(par_xy[0] != 7){
    if(par_xy[1] != 0)
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] - 1));
    if(par_xy[1] != 7)
      neighbors.push((par_xy[0] + 1) + "_" + (par_xy[1] + 1));
  }
  for(var e = 0; e < neighbors.length; e += 1){
    if($( "div#" + neighbors[e]  ).html() == ""){
      var s_class = $( "div#" + neighbors[e]  ).prop("class");
      $( "div#" + neighbors[e]  ).removeClass(s_class);
      $( "div#" + neighbors[e]  ).addClass("move_square");
    }
  }
  $( ".move_square" ).click(function(){
    move_piece($(this));
  });
}

function clear_moves(){
  $(".move_square").off("click");
  var even_row = true;
  for(var i = 0; i < 8; i += 1){
    for(var j = 0; j < 8; j += 1){
      if(even_row){
        if(j % 2 == 1){
          var tgt_square = i + "_" + j;
          $( "div#" + tgt_square  ).removeClass("move_square");
          $( "div#" + tgt_square  ).addClass("black_square");
        }
      }else{
        if(j % 2 == 0){
          var tgt_square = i + "_" + j;
          $( "div#" + tgt_square  ).removeClass("move_square");
          $( "div#" + tgt_square  ).addClass("black_square");
        }
      }
    }
    even_row = !even_row;
  }
}

function move_piece(sqToMove){
  var piece_html = ACTIVE_PIECE.parent().html();
  ACTIVE_PIECE.parent().html("");
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
  BLACK_TURN = !BLACK_TURN;
}
