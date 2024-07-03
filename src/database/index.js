const { default: mongoose } = require("mongoose")

const connectToDB = async()=>{
    const connectionURL = "mongodb+srv://apoorvtandon814:zzoI30dkH0ZvgjZd@cluster0.zwykc1o.mongodb.net/"
    mongoose.connect(connectionURL).then(()=>console.log('MONGO DB CONNECTED')).catch(error=>console.log(error));
};

export default connectToDB