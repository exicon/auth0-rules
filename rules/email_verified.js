function (user, context, callback) {
  console.log(context.connectionStrategy);
  if (context.connectionStrategy === 'samlp'){
    return callback(null, user, context);
  }

  if (!user.email_verified) {
    return callback(new UnauthorizedError('Please verify your email before logging in.'));
  } else {
    return callback(null, user, context);
  }
}
