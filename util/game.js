//  TODO: 15 sec. violation timer needed..
exports.createInstance = function(gameId, url, player1, player2){
    //  private
    var self
      , boardData = [[0,0,0],[0,0,0],[0,0,0]]
      , players = [player1, player2]
      , activePlayer = 0
      , bindSocketHooks = function(socket, playerIndex){
            socket.on('move', function(moveData){
                //  TODO: check if playerIndex === activePlayer, if not send a warning
                //  TODO: check if move is valid, if not send a warning
                //  TODO: make move, update board data
                //  TODO: check if the active player wins or it is a draw
                //  TODO: if game is over update clients, prompt for rematch...
            });
            socket.on('chat', function(chatData){
                socket.broadcast.to(gameId).emit('chat', chatData);
            });
            socket.on('request-rematch', function(){
                //  TODO: logic here please...
            });
            socket.on('disconnect', function(){
                //  TODO: logic here please...
            });
        };

    bindSocketHooks(players[0].socket, 0);
    bindSocketHooks(players[1].socket, 1);

    //  public
    self = {
        id: gameId,
        url: url,
        player1: player1,
        player2: player2,
        toString: function(){
            return "\n{\n\tid: "+this.id+",\n\turl: "+this.url+"\n}"
        }
    };

    return self;
};