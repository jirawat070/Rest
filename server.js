var express = require('express');
var app = express();
var db = require('./database');
var cors = require('cors')
app.use(cors())


var bodyParser = require('body-parser');
app.use(bodyParser.json()); //สำคัญ
app.use(bodyParser.urlencoded({
    extended: true
}));


// index page
app.get('/', function (req, res) {
    res.send('Express is running');
});
var output = {
    status: 'success',
    message: 'REST API is working'

}

app.get('/api/json'
    , function (req, res) {
        res.status(500).json(output);
    });

//product
app.get('/api/products/',db.getAllProducts);
app.get('/api/products/:id', db.getProductByID);
app.post('/api/products', db.insertProduct);
app.put('/api/products/:id', db.updateProduct);
app.delete('/api/products/:id', db.deleteProduct);

//user
app.get('/api/users', db.getUser);
app.get('/api/user/:id', db.getUserByID);
app.post('/api/user', db.insertUser);
app.put('/api/user/:id', db.updateUser);
app.delete('/api/user/:id', db.DeleteUser);

//purchase
app.get('/api/purchase', db.getPurchase);
app.get('/api/purchase/:id', db.getPurchaseByID);
app.post('/api/purchase', db.insertPurchase);
app.put('/api/purchase/:id', db.updatePurchase);
app.delete('/api/purchase/:id', db.DeletePurchase);

//Purchase_item
app.get('/api/purchase_item', db.getPurchase_item);
app.get('/api/purchase_item/:id', db.getPurchase_itemByID);
app.post('/api/purchase_item', db.insertPurchase_item);
app.put('/api/purchase_item/:id', db.updatePurchase_item);
app.delete('/api/purchase_item/:id', db.DeletePurchase_item);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});