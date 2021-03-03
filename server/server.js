const exp = require('express');
const cors = require('cors')
const DB =require('./modules/db.js')

const app = exp(); 
app.use(cors());

app.get('/getall', (req,res) => {
    const {offset} = req.query
    DB.getall(offset)
    .then(data => {
        console.log("data",data);
        res.send(data)
    })
    .catch(err => {
        console.log(err);
        res.send({message:err.detail})
    })
})
app.get('/getCountCustomers', (req,res) => {
    
    DB.getCount()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.send({message:err.detail})
    })
})
    
 

app.get('/search', (req,res) => {
    const{q}=req.query
    DB.searchCustomer(q)
    .then(data => {
        console.log("data",data);
        res.send(data)
    })
    .catch(err => {
        console.log(err);
        res.send({message:err.detail})
    })
})


app.listen(3001)