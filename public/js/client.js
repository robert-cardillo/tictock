var game = (function (){
    var socket;

    function connect_socket(){
        //  'force new connection': true enables socket.connect() after a socket.disconnect()
        socket = io.connect(null,{'force new connection':true});  // TODO: socket server URI needed..
        socket_connecting();

        //  [socket hooks]
        socket.on('connect', function(){
            console.log('connect event..');
            socket_connected();
        });

        socket.on('disconnect', function(){
            socket_disconnected();
        });

        socket.on('error', function(err){
            socket_error(err);
        });

        socket.on('warning', function(data){
            $('body').append('<p>'+data.message+'</p>');
        });
        //  [/socket hooks]
    }

    function disconnect_socket(){
        socket.disconnect();
    }

    function socket_connecting(){
        $('body').append('<p>Connecting...</p>');
    }

    function socket_connected(){
        $('body').append('<p>Connected.</p>');
    }

    function socket_disconnected(){
        $('body').append('<p>Disconnected!</p>');
    }

    function socket_error(err){
        $('body').append('<p>Error!!!</p>');
    }

    return {
        connect: function(){
            connect_socket();
        },
        disconnect: function(){
            disconnect_socket();
        },
        findOppenent: function(){
            socket.emit('findOpponent', null);
        }
    };
}());

$(function(){   //  alias for $(document).ready(function(){...})
    //  actions
    game.connect();

    //  hooks
    $('#findOpponentBtn').click(function(event){
        game.findOppenent();
        $('body').append('<p>Searching for an opponent, please wait...</p>');
    })
});