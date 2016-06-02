function(user, context, callback) {
  if (context.connectionStrategy !== 'samlp'){
    if (!user.email_verified){
      return callback(null, user, context);
    }
  }

  var api_user = {
    email: user.email
  };

  var options = {
    subject: user.user_id,
    expiresInMinutes: 60,
    audience: configuration.CLIENT_ID,
    issuer: 'https://exiconglobal.auth0.com'
  };
  var id_token = jwt.sign(api_user,
                          new Buffer(configuration.CLIENT_SECRET, 'base64'),
                          options);

  request.post({
    url: configuration.REGISTER_URL,
    headers: {
      'Authorization': 'Bearer ' + id_token
    }
  });
  callback(null, user, context);
}
