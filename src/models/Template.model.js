const mongoose = require('mongoose')
const { Schema } = mongoose;

const TemplateModel = new Schema({
    is_premium:{
        type:Boolean,
        required:true
    },
    file_path: String,
    type:{
        type:String,
        enum: {
            values: ['CV', 'Lettre motivation'],
            message: '{VALUE} is not supported'
        }
    },
    categorie: [String],
    style_path: String,
    preview: String,
    downloads: {
        type: Number,
        default: 0
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Template',TemplateModel)