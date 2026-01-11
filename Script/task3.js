//simple buffer 
let buffer =Buffer.from("Hello world",'utf-8') 
 console.log(buffer);

  // Encoding & Decoding

 //conver to string
 let utf8buffer = buffer.toString('utf-8');
 console.log(utf8buffer);

 //conver to hex string
 let hexString = buffer.toString('hex');
 console.log(hexString);

 //conver to base64 string
 let base64Str = buffer.toString('base64');
 console.log(base64Str)


 //conver hex string  back to a buffer
let backBuffer = Buffer.from(hexString, 'hex');
 console.log(backBuffer);

 // Decode the buffer back to a readable string (UTF-8);
  let decodedString = backBuffer.toString('utf-8');
  console.log(decodedString);


  //Task! Allocating and Modifying Buffers
  //Allocate a buffer of a fixed size.
  let buf = Buffer.alloc(10);
  console.log(buf)

  for(let i = 0; i < buffer.length; ++i){
    buf[i] = i * 10;
  }
    console.log(buf);//0 - 90 hex formatov 


//Երբ դու տպում ես buffer-ը որպես string (buf.toString()),
//  Node.js-ը դիտարկում է այդ բայթերը UTF-8 character code-ների ձևով։

/*Buffer stores raw bytes (0–255).Hex is a compact representation for bytes One byte = 8 bits

In hex, each byte becomes 2 characters Example: binary 01001000 → hex 48

Hex is easier for humans to readBinary is too long: Decimal is confusing for bytes.

Hex is the standard for low-level debugging.ASCII/UTF-8 characters map nicely to hex "H" → ASCII code 72 → hex 48 */


