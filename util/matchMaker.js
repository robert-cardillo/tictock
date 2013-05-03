/*
    @param io: socket.io server instance
 */
exports.createInstance = function(io){
    //  private
    var self
      , playerQueue = require('./playerQueue.js').createInstance()
      , playerList = {}
      , gameCount = 0
      , playerCount = 0
      , isSocketValid = function(socketId){
            return io.sockets.sockets[socketId] && !io.sockets.sockets[socketId].disconnected;
        }
      , tryMatch = function(){
            var player1
              , player2
              , p1IsValid
              , p2IsValid;

            process.nextTick(tryMatch);

            if(playerQueue.getSize() < 2){
                return;
            }

            player1 = playerQueue.pop();
            player2 = playerQueue.pop();

            p1IsValid = isSocketValid(player1.id);
            p2IsValid = isSocketValid(player2.id);

            if(p1IsValid && p2IsValid){
                gameCount++;
                console.log('lift off! we have a lift off!');
            }else{
                if(p1IsValid){
                    playerQueue.push(player1);  //  TODO: push with priority.. WONTDO: not necessary..
                }
                if(p2IsValid){
                    playerQueue.push(player2);  //  TODO: push with priority.. WONTDO: not necessary..
                }
            }
        };

    io.sockets.on('connection', function (socket) {
        //io.sockets.manager.rooms
        //io.sockets.sockets.[socket.id]
        self.addSocket(socket);
    });

    //  public
    self = {
        register: function(){
            process.nextTick(tryMatch);
        },
        addSocket: function(socket){
            playerCount++;
            playerList[socket.id] = require('./player.js').createInstance(this, socket.id, "player"+playerCount, socket);
        },
        enqueuePlayer: function(player){
            playerQueue.push(player);
        },
        isPlayerEnqueued: function(player){
            return playerQueue.exists(player);
        },
        stringifyQueue: function(){
            return playerQueue.stringify();
        }
    };

    return self;
};