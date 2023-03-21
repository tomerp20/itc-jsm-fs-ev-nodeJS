const bcrypt = require('bcrypt');
bcrypt.hash('12345678', 5, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash)
});


//Encryption is reversible

//Hashing, isn't reversible