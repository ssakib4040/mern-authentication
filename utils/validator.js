exports.validateUsername = (username) => {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_\.]+$/.exec(username);
  const valid = !!res;
  return valid;
};

exports.validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

exports.validatePassword = (password) => {
  var passCheck = password.toString().length;

  return passCheck >= 8;
};
