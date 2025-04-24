const post = require("../model/postSchema")


const getPost=async()=>{
    try{
        const products = post.find();
        if(!products) return "no products availlable";
        return products;
    }catch(Error){
        res.status(400).json({
            status:"failed",
            message:"products not fetched"
        })
    }
}

export default { getPost }