<html>
	<head>
		<title>Le super chat !</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script type="text/javascript" src="js/mustache.js"></script>
	</head>
	<body>
		<div id="fond">
			<div id="login">
				<form action="" id="loginform">
					<h1>Bienvenue</h1>
					<p>Chat Node Js avec socket.io</p>
					<input id="username" placeholder="username" type="text"/>
					<input id="mail" type="mail" placeholder="mail"/>
					<input type="submit" value="envoyer"/>
				</form>
			</div>
		</div>
		<div id="users">
			
		</div>

		<div id="messages" style="display:none;">
			<div class="message" id="msgtpl" style="display:none;">
				<img src="{{user.avatar}}">
				<p><strong>{{user.username}}</strong></p>
					<p>{{message}}</p>
					<span class="date">{{h}}:{{m}}</span>
			</div>
		</div>

		<form action="" id="form" style="display:none;">
			<input type="text" id="message"/>
			<input type="submit" id="send" value="Envoyer" class="submit"/>
		</form>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script type="text/javascript" src="http://localhost:8080/socket.io/socket.io.js"></script>
		<script type="text/javascript" src="js/client.js"></script>
	</body>
</html>