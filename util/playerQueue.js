exports.createInstance = function(){
    //  private
    var queue = []
      , find = function(player){
            var i, n;
            n = queue.length;
            for(i=0; i<n; i++){
                if(queue[i].id === player.id){
                    return i;
                }
            }
            return -1;
        };

    //  public
    return {
        push: function(player){
            if(find(player) === -1){
                queue.push(player)
            }
        },
        pop: function(){
            return queue.splice(0,1)[0];
        },
        getSize: function(){
            return queue.length;
        },
        stringify: function(){
            return queue.toString();
        }
    };
};