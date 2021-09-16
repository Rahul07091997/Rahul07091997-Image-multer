const express = require('express')
const app = express()
const ejs = require('ejs');
const port = process.env.PORT || 8080
const Product = require('./modal/modal')
const multerInstance = require('./multer')
require('./db/config')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static('./public'));
// app.use('/files', express.static("files"));


app.get('/', (req, res) => {
    res.render("index");
})

app.post('/single', multerInstance.upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        const products = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.file.filename
        })
        
        console.dir(req.path)
        console.log(products);
        await products.save()  
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            status: false,
        })
    }
})

app.get('/all', async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
})

app.put('/update', async(req, res) => {
   try {
    var id = req.params.id;
    var products = await Product.findByIdAndUpdate(id);
    res.status(200).json({
        status: true,
        data: products,
    })
   } catch (error) {
    console.log(error)
    res.status(500).json({
        error: error,
        status: false,
    })
   }

})

app.delete('/delete', async(req, res) => {
    try {
        var id = req.params.id
        var products = await Product.findByIdAndDelete({id});
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (error) {
        console.log(error)
    res.status(500).json({
        error: error,
        status: false,
    })
    }
})


app.listen(port, (err) => {
    if (err) throw err
    console.log(`server is running at ${port}......`);
})