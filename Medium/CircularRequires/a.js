console.log("A starts");
require('./b');
console.log("A ends");

/*Ինչ տեղի է ունենում քայլ առ քայլ

Node.js սկսում է a.js → տպում "A starts"

a.js կանչում է require('./b') → Node.js սկսում է b.js

տպում է "B starts"

b.js կանչում է require('./a')

a.js արդեն execution–ում է, Node.js տեսնում է, որ այն պաշտպանված cache–ում է (partially loaded)

Քանի որ a.js–ը արդեն սկսված է, Node.js ոչ մի նոր execution չի անում a.js–ի համար, և B.js շարունակում է իր execution–ը

B.js տպում է "B ends"

a.js շարունակում է իր execution–ը՝ տպում "A ends"
*/