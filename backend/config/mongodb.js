// import mongoose from "mongoose";



// const connectDB = async () => {

//   mongoose.connection.on('connected', ()=>{
//       console.log('connection available');
      
//   })

//   await mongoose.connect(`${process.env.MONGODB_URI}/KiddiesPlace`)

// }

// export default connectDB;

import mongoose from "mongoose"

 const connectDB = async ()=> {
    await mongoose.connect(`${process.env.MONGODB_URI}/KiddiesPlace`).then(()=>console.log("DB Connected"));

}

export default connectDB;