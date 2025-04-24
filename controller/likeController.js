const Post = require("../model/postSchema");
const Like = require("../model/likeSchema");

exports.likepost = async (req,res)=>{
    try{
        const {post, user}  =req.body;

        const likepost = new Like({
            post,user
        });
        const savedLike = await Like.save();
        // update teh post collection on ths

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{Likes:savedLike._id}},{new:true})

        res.json({
            post:updatedPost,
        })

    }catch(e){
        res.json({
            message:e.message
        })
    }
}
exports.unlikepost = async (req,res)=>{
    try{
        const {post, like}  =req.body;

        const unlikepost = await Like.findByIdAndDelete({post:post,_id:like});

        const updatePost =await Post.findByIdAndUpdate(post,{$pull:{Likes:unlikepost._id}},{new:true})

        res.json({
            post:updatedPost,
        })

    }catch(e){
        res.json({
            message:e.message
        })
    }
}