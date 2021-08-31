const mongoose = require('mongoose')

const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () => {  
    try {
      await  mongoose.connect(db)
        console.log("MongoDB Connected......")
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}




// const connectDB =  () => {
//     mongoose.connect(db).then(()=> console.log("MongoDB Connected"))
//       .catch((err) => {
//           console.log(err.message)
//           process.exit(1)
//         })
// }

module.exports = connectDB