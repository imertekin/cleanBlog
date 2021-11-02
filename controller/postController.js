const Post=require('../models/Post')

// we pull all posts from the model
exports.getAllPost= async (req,res)=>{
    const post= await Post.find({})
    res.render('index',{
        posts:post
    })
}

// About page controller
exports.getAbout=(req,res)=>{
    res.render('about')
}

// New post PAGE controller
exports.getAddPost=(req,res)=>{
    res.render('add_post')
}

// New post services with the post request method
exports.postAddPost=(req,res)=>{
    Post.create({
        ...req.body
    })
    
    console.log("Post Created")
    res.redirect('/')
    
}

// A post detail page by id
exports.getByIdPost= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    res.render('post',{
        post:postById
    })
}

// A post edit PAGE by id 
exports.getEditPage= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    res.render('edit',{
        post:postById
    })
}


// A post edit services with the put request method
exports.putByIdPost= async(req,res)=>{
    const postById=await Post.findById(req.params.id)
    postById.title=req.body.title
    postById.detail=req.body.detail
    postById.save()

    res.redirect('/posts/'+req.params.id)
}

// A post delete services with the delete request method
exports.deletePost= async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
}