const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
    },
    user:{
        type:String,
        require:true,
    }
});

module.export = mongoose.model("Like",likeSchema);