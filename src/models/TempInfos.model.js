const mongoose = require('mongoose')
const { Schema } = mongoose;

const TempInfosModel = new Schema({ 
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    template: {
      type: Schema.ObjectId,
      ref: 'Template',
      required: true
    }
})

module.exports = mongoose.model('TempInfos',TempInfosModel)