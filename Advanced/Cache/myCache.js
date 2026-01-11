myCache = {
_stor : {},

Adding:function add(key, value){
    this._stor[key] = value;
    console.log(`Added: ${key} = ${value}`);

},

Retriving:function MyRetrive(key){
    if(key in this._stor){
        console.log(`"Retrived:" ${this._stor[key]}`);
        return this._stor[key];
    }else{
        console.log("Key not found")
        return null;
    }


},

Deleting:function Mydelete(key,value){
    if(key in this._stor){
        delete this._stor[key];
        console.log(`deleted ${key}`)
}else{
    console.log("Key not found");

}
}
}

myCache.Adding("name", "Leyla");
myCache.Adding("name", "Jhon");
myCache.Adding("age", 20);
myCache.Retriving("age");
myCache.Deleting("name", "Jhon");
console.log(myCache._stor);

