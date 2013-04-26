var game = (function (){
    var socket;
    connect_socket();

    function connect_socket(){
        socket = io.connect();  // TODO: socket server URI needed..
        socket_connecting();

        //  [socket hooks]
        socket.on('connect', function(){
            socket_connected();
        });

        socket.on('disconnect', function(){
            socket_disconnected();
        });

        socket.on('error', function(err){
            socket_error(err);
        });
        //  [/socket hooks]
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
        publicVar: 73,
        publicMethod: function(){
            console.log(socket);
        }
    };
}());