(function($){
  var socket = io.connect('http://localhost:8080');
  var msgtpl = $('#msgtpl').html();
  $('#msgtpl').remove();

  // Envoie des données au serveur
  $('#loginform').submit(function(event){
    event.preventDefault();
    socket.emit('login', {
      username : $('#username').val(),
      mail     : $('#mail').val()
    })
  });

  // Confirme la connexion
  socket.on('logged', function(){
    $('#fond').fadeOut();
    $('#users').fadeIn();
    $('#messages').fadeIn();
    $('#form').fadeIn();
  });

  // Message
  $('#form').submit(function(event){
    event.preventDefault();
    socket.emit('newMessage', {message: $('#message').val()})
    $('#message').val('');
    $('#message').focus();
  });
  socket.on('newMessage', function(message){
    $('#messages').append('<div class="message">'+ Mustache.render(msgtpl, message) +'</div>');
    $('#messages').animate({scrollTop : $('#messages').prop('scrollHeight')}, 500);
  });

  // Connexion
  socket.on('newUser', function(user){
    //alert('nouvel utilisateur');
    $('#users').append('<div id="'+ user.id +'" class="connecter"><img src="'+ user.avatar +'"><p class="username">'+ user.username +'</p></div>')
  });

  // Deconnexion
  socket.on('disconnectUser', function(user){
    $('#'+user.id).remove();
  });

})(jQuery);