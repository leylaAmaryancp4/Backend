let counter1 = require('./counter.js');
let counter2 = require('./counter.js');
let counter3 = require('./counter.js');

require.cache;

/* 1.Երբ Node.js–ը առաջին անգամ կանչում է require('./counter.js'), այն գտնում է ֆայլը, 
կարդում, էկզեկյուտ անում և հետո պահում է cache–ում:
Ուշադրություն, որ "Counter executed: 1" տպվեց միայն մեկ անգամ։ 
2.Երկրորդ և երրորդ require-ները չեն կրկնում էկզեկյուշնը։
Նրանք պարզապես վերադարձնում են արդեն cache–ում պահված module.exports։*/