let c1 = require('./counter.js');
delete require.cache[require.resolve('./counter')]
let c2 = require('./counter.js');// executes again
let c3 = require('./counter.js');
/* .Եթե ուզում ես module-ը նորից execute անել, պետք է ջնջես այն cache-ից՝ */