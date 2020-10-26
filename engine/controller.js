import Game from "./game.js";

let game = new Game(4);
game.setupNewGame();


$(document).ready(function(){
    let game = new Game(4);
    game.setupNewGame();
    update(game.getGameState());
    

    game.onMove(function(state) {
        update(state);
    });
    game.onLose(function(state) {
        $(".result").html("Game Lost! :(")
    });
    game.onWin(function(state) {
        $(".result").html("Game Won! :)")
    });

    $(document).keydown(function(e) {
        if (e.which == 37) {
            game.move('left');
        }else if (e.which == 38) {
            game.move('up');
        }else if (e.which == 39) {
            game.move('right');
        }else if (e.which == 40) {
            game.move('down');
        }
    });

    $(".container").on("click", "button", function(event){
        event.preventDefault();
        game.setupNewGame();
        $(".result").html("");
        update(game.getGameState());
    })

});

export const update = function(state) {
    $(".score").html(`Score: ${state.score}`)

    for (var i = 0; i < 16; i++){
        $(`#${i}`).html(`${state.board[i]}`);
    }
   
};


