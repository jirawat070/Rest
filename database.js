const pgp = require('pg-promise')();
var db = pgp('postgres://zyenusgppnblre:ffd912c16f1f131cc08a6079470346b92bd1a09ef31d5c4c2d9a1b651add4180@ec2-54-243-147-162.compute-1.amazonaws.com:5432/deli4r3tvtu87f?ssl=true');

function getAllProducts(req, res) {
    db.any('select * from products')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL products'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            res.status(500)
                .json({
                    status: 'failed',
                    data: data,
                    message: 'Failed to Retrieved ALL products'
                });
        })
}

function getProductByID(req, res) {
    db.any('select * from products where product_id =' + req.params.id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved products id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.status(500)
                .json({
                    status: 'failed',
                    data: data,
                    message: 'Failed to Retrieved  products id' + req.params.id
                });
        })
}

function insertProduct(req, res) {
    db.none('insert into products(product_id, title, price, created_at, tags)' +
        'values(${product_id}, ${title}, ${price}, ${created_at}, ${tags})',
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one product'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}

function updateProduct(req, res) {
    db.any('update products set product_id = ${product_id}, title=${title}, price=${price}, tags=${tags}' + 'where product_id =' + req.params.id ,req.body)
        
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Update one product'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}

function deleteProduct(req, res) {
    db.any('delete from products where product_id =' + req.params.id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'delete products id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.status(500)
                .json({
                    status: 'failed',
                    data: data,
                    message: 'Failed to delete  products id' + req.params.id
                });
        })
}


//fn ที่อยากให้ข้างนอกเห็นเอาไปใช้
module.exports = {
    getAllProducts,
    getProductByID,
    insertProduct,
    updateProduct,
    deleteProduct
};