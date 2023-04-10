const app = require('./app');
const mongoose = require('./config/connection');

mongoose();

const port = process.env.PORT || 5001;

app.listen(port ,(error)=>{
    if(error){
        console.log('Error Occurred: ' , error);
    }else{
        console.log(`Server Is Running On Port ${port}`);
    }
});