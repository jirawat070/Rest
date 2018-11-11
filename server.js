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
app.get('/api/users/:id', db.getUserByID);
app.post('/api/users', db.insertUser);
app.put('/api/users/:id', db.updateUser);
app.delete('/api/users/:id', db.DeleteUser);

//purchase
app.get('/api/purchases', db.getPurchase);
app.get('/api/purchases/:id', db.getPurchaseByID);
app.post('/api/purchases', db.insertPurchase);
app.put('/api/purchases/:id', db.updatePurchase);
app.delete('/api/purchases/:id', db.DeletePurchase);

//Purchase_item
app.get('/api/purchase_items', db.getPurchase_item);
app.get('/api/purchase_items/:id', db.getPurchase_itemByID);
app.post('/api/purchase_items', db.insertPurchase_item);
app.put('/api/purchase_items/:id', db.updatePurchase_item);
app.delete('/api/purchase_items/:id', db.DeletePurchase_item);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});