const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
const multer = require('multer');
const path= require('path');
const fs = require('fs');



require('dotenv').config()

const app= express()
const port= process.env.PORT || 5000
const connection = process.env.CONNECTION;


app.use(bodyParser.json());
app.use(cors({
  origin:["https://maccess001.onrender.com","http://127.0.0.1:3000"],
}));

//Import Models
const WatchModel = require('./models/watch');
const WalletModel = require('./models/wallet');
const SunglassModel = require('./models/sunglass')
const OrderModel = require('./models/order')


app.get('/', async(req, res)=>{
    res.send("Server is Okay")
});


// GET products - watch
app.get('/watch', async(req, res)=>{
    try{
        WatchModel.find({}).then((data)=>{
            res.send({status:'watch products', data:data})
        });
    }catch(error){
        console.log(error);
    }
});

// GET products - wallet
app.get('/wallet', async(req, res)=>{
    try{
        WalletModel.find({}).then((data)=>{
            res.send({status:'Wallet products', data:data})
        });
    }catch(error){
        console.log(error);
    }
});

// GET products - sunglass
app.get('/sunglass', async(req, res)=>{
    try{
        SunglassModel.find({}).then((data)=>{
            res.send({status:'Sunglass products', data:data})
        });
    }catch(error){
        console.log(error);
    }
});


//GET product details --watch

app.get('/watch/:id', async(req,res)=>{
    const productId = req.params.id;
    try{
      const product= await WatchModel.findById(productId);
      //console.log(product);
      res.send({data:product})
    }catch(err){
      console.log((err));
    }
  });

//GET product Detaits -- wallet
app.get('/wallet/:id', async(req,res)=>{
const productId = req.params.id;
try{
    const product= await WalletModel.findById(productId);
    //console.log(product);
    res.send({data:product})
}catch(err){
    console.log((err));
}
});

// GET product Detail -- sunglass
app.get('/sunglass/:id', async(req,res)=>{
const productId = req.params.id;
try{
    const product= await SunglassModel.findById(productId);
    //console.log(product);
    res.send({data:product})
}catch(err){
    console.log((err));
}
});


// Handle Image using MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./productImage");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });

  
const upload =multer({storage: storage})

// POST products
app.post("/product",upload.single("image"),async (req, res)=>{
    //console.log(req.body);
    const imageName= req.file.filename;
    const productname= req.body.productName;
    const productprice= req.body.productPrice;
    const productquantity= req.body.productQuantity;
    const productcategory= req.body.productCategory;
    const productbrand = req.body.productBrand
    const productmaterial = req.body.productMaterial;
    const productmeasurement = req.body.productMeasurement;
    const productdescription = req.body.productDescription;
    //insert data into model
    try{

      if(productcategory ==='watch'){
        await WatchModel.create({
          name:productname,
          price:parseFloat(productprice),
          image:imageName,
          quantity: parseInt(productquantity),
          material:productmaterial,
          measurement: productmeasurement,
          description: productdescription,
          brand: productbrand,
        });

      }
      else if(productcategory ==='wallet'){
        await WalletModel.create({
          name:productname,
          price:parseFloat(productprice),
          image:imageName,
          quantity: parseInt(productquantity),
          material:productmaterial,
          measurement: productmeasurement,
          description: productdescription,
          brand: productbrand,
        });

      }
      else{
        await SunglassModel.create({
          name:productname,
          price:parseFloat(productprice),
          image:imageName,
          quantity: parseInt(productquantity),
          material:productmaterial,
          measurement: productmeasurement,
          description: productdescription,
          brand: productbrand,
        });
      }

      res.send("Product uploaded successfully")
      console.log("Uploaded to mongodb successfully");
    }
    catch(error){
      console.log("Error");
      res.json({status:error})
    }
});


// UPDATE products

//UPDATE watch product
app.put("/watch/:id", upload.single("image"), async(req, res)=>{
    const productId = req.params.id;
    console.log(req.body);
    try{
        const productname= req.body.productName;
        const productprice= req.body.productPrice;
        const productquantity= req.body.productQuantity;
        const productdescription = req.body.productDescription;
        const productmeasurement = req.body.productMeasurement;
        const productmaterial = req.body.productMeasurement;
        const productbrand = req.body.productBrand
        if (req.file){
            const imageName= req.file.filename;
            const updatedProduct = await WatchModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                image:imageName,
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated with image to mongodb successfully");
        }
        else{
            const updatedProduct = await WatchModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated without image to mongodb successfully");
        }
        
        }catch(error){
            console.log("Error");
            res.json({status:error})
    }
});

//UPDATE wallet products
app.put("/wallet/:id", upload.single("image"), async(req, res)=>{
    const productId = req.params.id;
    console.log(req.body);
    try{
        const productname= req.body.productName;
        const productprice= req.body.productPrice;
        const productquantity= req.body.productQuantity;
        const productdescription = req.body.productDescription;
        const productmeasurement = req.body.productMeasurement;
        const productmaterial = req.body.productMeasurement;
        const productbrand = req.body.productBrand
        if (req.file){
            const imageName= req.file.filename;
            const updatedProduct = await WalletModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                image:imageName,
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated with image to mongodb successfully");
        }
        else{
            const updatedProduct = await WalletModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated without image to mongodb successfully");
        }
        
        }catch(error){
            console.log("Error");
            res.json({status:error})
    }
});

// UPDATE sunglass product
app.put("/sunglass/:id", upload.single("image"), async(req, res)=>{
    const productId = req.params.id;
    console.log(req.body);
    try{
        const productname= req.body.productName;
        const productprice= req.body.productPrice;
        const productquantity= req.body.productQuantity;
        const productdescription = req.body.productDescription;
        const productmeasurement = req.body.productMeasurement;
        const productmaterial = req.body.productMeasurement;
        const productbrand = req.body.productBrand
        if (req.file){
            const imageName= req.file.filename;
            const updatedProduct = await SunglassModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                image:imageName,
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated with image to mongodb successfully");
        }
        else{
            const updatedProduct = await SunglassModel.findByIdAndUpdate(productId,
            {
                name:productname,
                price:parseFloat(productprice),
                quantity: productquantity,
                material:productmaterial,
                measurement: productmeasurement,
                description: productdescription,
                brand: productbrand,
            }, { new: true });
            res.json(updatedProduct);
            console.log("Updated without image to mongodb successfully");
        }
        
        }catch(error){
            console.log("Error");
            res.json({status:error})
    }
});

//DELETE products

app.delete('/watch/:id', async(req,res) =>{
    const productId = req.params.id;
    try{
      const result = await WatchModel.findByIdAndDelete(productId);
      res.json("Item deleted");
      res.send("Item deleted");
    }catch(error){
      res.json("Item is not deleted");
      res.send("Item is not deleted");
    }
});

app.delete('/wallet/:id', async(req,res) =>{
    const productId = req.params.id;
    try{
        const result = await WalletModel.findByIdAndDelete(productId);
        res.json("Item deleted");
        res.send("Item deleted");
    }catch(error){
        res.json("Item is not deleted");
        res.send("Item is not deleted");
    }
});

app.delete('/sunglass/:id', async(req,res) =>{
    const productId = req.params.id;
    try{
        const result = await SunglassModel.findByIdAndDelete(productId);
        res.json("Item deleted");
        res.send("Item deleted");
    }catch(error){
        res.json("Item is not deleted");
        res.send("Item is not deleted");
    }
});

//POST a ORDER

app.post('/order', async(req, res)=>{
  
    for (const item of req.body.cartItems){   
      if (item.category ==='watch'){
        try{
            const product = await WatchModel.findByIdAndUpdate(item.product_id,
              {
                $inc: { quantity: -item.quantity } //  $inc for atomic quantity updates
              },
              { new: true });
          }catch(error) {
            console.log(error);
            res.send(error)
          }
      }
      else if (item.category ==='wallet'){
        try{
            const product = await WalletModel.findByIdAndUpdate(item.product_id,
              {
                $inc: { quantity: -item.quantity } //  $inc for atomic quantity updates
              },
              { new: true });
          }catch(error) {
            console.log(error);
            res.send(error)
          }
      }
      else{
        try{
            const product = await SunglassModel.findByIdAndUpdate(item.product_id,
                {
                $inc: { quantity: -item.quantity } //  $inc for atomic quantity updates
                },
                { new: true });
            }catch(error) {
            console.log(error);
            res.send(error)
            }
      }
    }
  
    try{
      const {cartItems, email, address}= req.body
      const order_placed= cartItems.map((item)=>({
        ...item,
        status:'pending',
        email,
        address,
      }))
      await OrderModel.insertMany(order_placed);
      console.log("Order placed successfully");
      res.json({ message: 'Orders created successfully' });
      
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error creating orders' });
    }
  })



//Update an Order

app.put('/order/:id', async(req, res)=>{
    order_id = req.params.id
    order_message = req.body.message;
    order_status = req.body.status;
    order_delivery_date = req.body.deliveryDate
    try{
        const update_order = await OrderModel.findByIdAndUpdate(order_id,{
            message: order_message,
            status: order_status
        },
        {new:true});
        res.send("Order updated Successfully");
    }

    catch(error){
        console.log(error);
        res.send("order update Failed")
        
    }
});

app.get('/view-order', async(req,res)=>{
  try{
    await OrderModel.find({})
    .then((data)=>{res.send({order:data})});
  }
  catch(error){
    console.log(error);
    res.send("Failed to fetch")
  }
} )


//IMAGE API
//Image API
app.use('/images', express.static(path.join(__dirname, 'productImage')));

app.get('/images/:imageId', async (req, res) => {
  try {
    const imagePath = req.params.imageId;

    // Check if the image file exists within the static directory
    const filePath = path.join(__dirname, 'productImage', imagePath);
    const fileExists = await fs.existsSync(filePath);

    if (!fileExists) {
      return res.status(404).send('Image not found');
    }

    // Send the image file directly
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching image');
  }
});


const start = async()=>{
    try{
        await mongoose.connect(connection)
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })

    }catch(error){
        console.log("ERRRRRRROR ============");
        console.log(error);

    }
}
start()