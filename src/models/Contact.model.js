const mongoose = require('mongoose')
const { Schema } = mongoose;

const ContactModel = new Schema({ 
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    zip: String,
    socials: [{
        link: String,
        label: String
    }],
    summary: String,
    tempinfos: {
      type: Schema.ObjectId,
      ref: 'TempInfos',
      required: true
    }
})

module.exports = mongoose.model('Contact',ContactModel)