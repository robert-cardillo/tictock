exports.createInstance = function(matchMaker, socketId, name, socket){
    //  private
    var self;

    socket.on('findOpponent', function(){
        matchMaker.enqueuePlayer(self);
    });

    //  public
    self = {
        id: socketId,
        name: name,
        socket: socket,
        toString: function(){
            return "\n{\n\tid: "+this.id+",\n\tname: "+this.name+"\n}"
        }
    };

    return self;
};