const express = require('express');
const fs = require('fs');
const path =  require('path');
const multer = require('multer')

const app = express();
const PORT = 3000;


//static files
app.use(express.static(path.join(__dirname,'public')));
 
//body parsing
app.use(express.urlencoded({extended:true}));

//file storage(multer)
const uploadDir = path.join(__dirname, 'public/uploads')
if(!fs.existsSync(uploadDir))fs.mkdirSync(uploadDir,{recursive:true});

const storage = multer.diskStorage({
    destination:uploadDir,
    filename:(req,file,cb)=>{
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
    limits:{fileSize: 2 * 1024 * 1024},
    fileFilter:(req,file,cb)=>{
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        cb(null, allowed.includes(file.mimetype));
    }
})


//data helpers
const usersFile = path.join(__dirname, 'data/users.json');

  function readUsers(){
    try{
    if(!fs.existsSync(usersFile)){
        fs.mkdirSync(path.dirname(usersFile),{recursive:true});
    fs.writeFileSync(usersFile,'[]');
    return [];
  }

  const data = fs.readFileSync(usersFile, 'utf-8').trim();
  if(!data)return [];

  return JSON.parse(data);
}catch(err){
    console.log(err);
    return [];
}

  }
  function writeUsers(users){
    try{
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        console.log('users.json updates')
    }catch(err){
        console.log(err);

  }
}

  //Register
  app.post('/api/register', upload.single('image'),(req,res)=>{
    const errors = [];
    const{
        fullName,
    email,
    password,
    phone,
    age,
    city,
    github,
    bio
  } = req.body;


  if(!fullName || fullName.length < 3)
    errors.push('Full name must be at least 3 characters');

  if (!/^\S+@\S+\.\S+$/.test(email))
    errors.push('Email is invalid');

  if(!password || password.length < 6)
    errors.push('Password must be at least 6 characters');

  if (phone && !/^[+\d]+$/.test(phone))
    errors.push('Phone number is invalid');

  if(age &&(age < 1 || age > 120))
    errors.push('Age is invalid');

     const users = readUsers();
     if(users.find(u=>u.email === email))
        errors.push('Email already registered')

     if(errors.length){
        return res.status(400).json({ok:false,errors})
     }

     const newUser = {
    fullName,
    email,
    password,
    phone,
    age,
    city,
    github,
    bio,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  res.json({
    ok:true,
    message:'Registered successfully',
    user:{
        fullName,
        email,
        imageUrl:newUser.imageUrl
    }
  })
})

//Login
app.post('/api/login', (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
ok:false,
error:'Email and password required'
        })
}

const users = readUsers();
const user = users.find(u=>u.email === email && u.password === password)
if(!user){
    return res.status(400).json({
        ok:false,
        error:'Invalid credentials'
    })
}

res.json({
    ok:true,
    message:'Login successful',
    user:{
        fullName:user.fullName,
        email:user.email
    }
})
})

//users list 
app.get('/api/users', (req, res) => {
  const users = readUsers().map(({ password, ...rest }) => rest);
  res.json(users);
});


// navigate anel hajord   ej
app.get('/', (req, res) => {
  res.redirect('/register.html');
});


 app.listen(PORT,()=>{
    console.log(`Server running on  http://localhost:${PORT}`)
 })
