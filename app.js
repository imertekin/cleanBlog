const express=require('express')
const mongoose=require('mongoose')
const fileUpload=require('express-fileupload')
const dotenv=require('dotenv')
const methodOverride = require('method-override');
const Post=require('./models/Post')
const PostController=require('./controller/postController')

const app=express()
dotenv.config()
// Db Connect

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('DB CONNECTED!')
  }).catch((err)=> {
    console.log(err)
  })



//Middleware
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// file upload packages from the express-fileupload
app.use(fileUpload())

// we use methodOverride package for the convert other methods
app.use(
    methodOverride('_method',{
        methods:['POST','GET']
    })
)

// Check the request path
app.use(function(req,res,next){ //
    console.log('Request:', req.path)
    next(); 
})


//Routes
app.get('/',PostController.getAllPost)

app.get('/about',PostController.getAbout)

app.get('/add-post',PostController.getAddPost)

app.post('/add-post',PostController.postAddPost)

app.get('/posts/:id',PostController.getByIdPost)

app.get('/posts/edit/:id',PostController.getEditPage)

app.put('/posts/:id',PostController.putByIdPost)

app.delete('/posts/:id',PostController.deletePost)



// Listen Port
app.listen(process.env.PORT|| 3000,()=>{
    console.log('Server Started')
})