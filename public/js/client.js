(function (){
    var socket;
    connect();

    function connect(){
        socket = io.connect('//');
        connecting();

        //  [socket hooks]
        socket.on('connect', function(){
            connected();
        });

        socket.on('disconnect', function(){
            disconnected()
        });
        //  [/socket hooks]
    }

    function connecting(){
        $('body').append('<p>Connecting...</p>');
    }

    function connected(){
        $('body').append('<p>Connected.</p>');
    }

    function disconnected(){
        $('body').append('<p>Disconnected!</p>');
    }
}());