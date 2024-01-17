const crypto = require('crypto');

const jwtSecreteKey = crypto.randomBytes(32).toString('hex');
const activationKey = crypto.randomBytes(32).toString('hex');
console.log(jwtSecreteKey);
console.log(activationKey)