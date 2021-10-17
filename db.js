require('dotenv').config()
const mongoose = require('mongoose')

 module.exports.connect = () => { 
     return new Promise((resolve, reject) => {
         if(process.env.NODE_ENV === 'test') {
             const Mockgoose = require('mockgoose').Mockgoose
             const mockgoose = new Mockgoose(mongoose)

             mockgoose.prepareStorage()
             .then(() => {
                 mongoose.connect(
                     process.env.DATABASE_URL, {
                         useNewUrlParser: true
                     })
                     .then((res, err) => {
                         if(err) {
                             console.log(err)
                             return reject (err)
                         }
                         resolve()
                         console.log('Connected to mock DB')
                     })
             })
         } else {
             mongoose.connect(
                 process.env.DATABASE_URL, {
                     useNewUrlParser: true
                 })
                 .then((res, err) => {
                     if(err) {
                         console.log(err)
                         return reject (err)
                     }
                     resolve()
                     console.log('Connected to DB')
             })
         }         
     }
 )}