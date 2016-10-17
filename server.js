var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req, res){

});

httpServer.listen('8080');

var io = require('socket.io').listen(httpServer);
var users = {};
var messages = [];
var limite = 2;


io.sockets.on('connection', function(socket){
	var me = false;

	/* Boucle sur les utilisateurs déjà connecter */
	for(var k in users){
		socket.emit('newUser', users[k]);
	}
	for(var k in messages){
		socket.emit('newMessage', messages[k]);
	}

	// Recu message
	socket.on('newMessage', function(message){
		message.user = me;
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		messages.push(message);
		if(messages.length > limite){
			messages.shift();
		}
		io.sockets.emit('newMessage', message);
	});

	/* Connexion */
	socket.on('login', function(user){
		//console.log(user);
		me = user;
		me.id = user.mail.replace('@','-').replace('.','-');
		me.avatar = 'https://gravatar.com/avatar/'+ md5(user.mail) +'?s=50';
		socket.emit('logged');
		users[me.id] = me;
		io.sockets.emit('newUser', me);
	})

	/* Deconnexion */
	socket.on('disconnect', function(){
		if(!me) {
			return false;
		}
		delete users[me.id];
		io.sockets.emit('disconnectUser', me);
	});
});