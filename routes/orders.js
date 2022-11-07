const router = require("express").Router();
const e = require("express");
const Order = require("../models/Order");

const { 
    verifyToken, 
    verifyTokenAndAuth, 
    verifyTokenAndAdmin 
} = require("./verifyToken");


// create order
router.post("/new", async (req, res) => {
    const newOrder = new Order({
        clientName: req.body.name,
        clientPhone: req.body.phone,
        clientEmail: req.body.email,
        clientType: req.body.type
    });

    // send the order to DB
    try {
        const findOrderWithEmail = await Order.findOne({ clientEmail: newOrder.clientEmail });
        const findOrderWithPhone = await Order.findOne({ clientPhone: newOrder.clientPhone });
        
        if(findOrderWithEmail || findOrderWithPhone){
            return res.status(401).json('Order with email or username already exists!') 
        }else{
            await newOrder.save()
            return res.status(201).json("Замовлення прийнято! Будь ласка, очікуйте на дзвінок.");
        }

    } catch (e) {
        return res.status(500).json("Помилка:"+ e);
    }
    

});

// get new orders
router.get("/getnews", verifyTokenAndAdmin,  async (req, res) => {
    try {

        const newOrders = await Order.find({
            isNew: true
        });

        return res.status(200).json(newOrders);
        
    } catch (e) {
        return res.status(500).json(e);
    }
});

// update order status
router.put("/update/status/:orderId", verifyTokenAndAdmin, async (req, res) => {
    try {

        await Order.findByIdAndUpdate(req.params.orderId, 
            {
                $set: req.body
            }
            // {new: true} if we need updated object
        );

        return res.status(200).json("order status was updated successfully");
        
    } catch (e) {
        return res.status(500).json(e);
    }
})


// Update order data;
router.put("/update/:orderId", verifyTokenAndAdmin, async (req, res) => {
    try{

        await Order.findByIdAndUpdate(req.params.orderId, {
            $set: req.body
        })

        return res.status(200).json("Успішне редагування!");

    }catch(e){
        return res.status(500).json(e);
    }
})

// change new status in order
router.put('/notnew/:orderId', verifyTokenAndAdmin,  async (req, res) => {
    try {
        
        await Order.findByIdAndUpdate(req.params.orderId, 
            {
                $set: req.body
            }
        );

        return res.status(200).json("This post not new anymore :)");

    } catch (e) {
        return res.status(500).json(e);
    }
})

// get order by Id
router.get('/order/:orderId', verifyTokenAndAdmin,  async (req, res) => {
    
    try{

        const order = await Order.find({
            _id: req.params.orderId
        });

        return res.status(200).json(order);

    }catch(e) {
        return res.status(500).json(e);
    }
});

// get all orders
router.get("/orders", verifyTokenAndAdmin, async (req, res) => {

    const lastOrders = req.query.last; // get last orders with limit 5;

    try{

        let orders;

        if(lastOrders) {
            orders = await Order.find().sort({createdAt: -1}).limit(5);
        }else{
            orders = await Order.find().sort({createdAt: -1});
        }

        return res.status(200).json(orders);

    } catch(e) {
        return res.status(500).json(e);
    }
});

// remove order by Id
router.delete('/remove/:orderId', verifyTokenAndAdmin,  async (req, res) => {
    try{

        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json("Order was deleted.");

    } catch(e){
        return res.status(500).json(e);
    }
});


// get current orders
router.get('/getcurrent', verifyTokenAndAdmin, async (req, res) => {
    try{

        
       // get current year and month
       const currentYear = new Date().getFullYear();
       const currentMonth = new Date().getMonth() + 1;

       const start = new Date(currentYear+"-"+currentMonth+"-01");
       const end = new Date(currentYear+"-"+currentMonth+"-31");
       
        // fetch orders in current month
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        })
        
        res.status(200).json({length: orders.length});

    }catch(e){
        return res.status(500).json(e);
    }
})


// get orders in last month
router.get('/getlastmonth', verifyTokenAndAdmin, async (req, res) => {
    try{

        
       // get current year and month
       const currentYear = new Date().getFullYear();
       const currentMonth = new Date().getMonth();

       const start = new Date(currentYear+"-"+currentMonth+"-01");
       const end = new Date(currentYear+"-"+currentMonth+"-31");
       
        // fetch orders in current month
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        })
        
        res.status(200).json({length: orders.length});

    }catch(e){
        return res.status(500).json(e);
    }
})


// get finished orders in current month
router.get('/getcurrentfinished', verifyTokenAndAdmin,  async (req, res) => {
    try{

        
       // get current year and month
       const currentYear = new Date().getFullYear();
       const currentMonth = new Date().getMonth() + 1;

       const start = new Date(currentYear+"-"+currentMonth+"-01");
       const end = new Date(currentYear+"-"+currentMonth+"-31");
       
        // fetch orders in current month
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        }).find({
            isFinish: true
        })
        
        res.status(200).json({length: orders.length});

    }catch(e){
        return res.status(500).json(e);
    }
})


// get finished orders in last month
router.get('/getlastmonthfinished', verifyTokenAndAdmin, async (req, res) => {
    try{

        
       // get current year and month
       const currentYear = new Date().getFullYear();
       const currentMonth = new Date().getMonth();

       const start = new Date(currentYear+"-"+currentMonth+"-01");
       const end = new Date(currentYear+"-"+currentMonth+"-31");
       
        // fetch orders in current month
        const orders = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        }).find({
            isFinish: true
        })
        
        res.status(200).json({length: orders.length});

    }catch(e){
        return res.status(500).json(e);
    }
});


// get orders with flag isWait
router.get('/getordersiswait', verifyTokenAndAdmin,  async (req, res) => {
    try{

        
        // fetch orders with flag isWait
        const orders = await Order.find({
            isWait: true
        }).sort({
            createdAt: -1
        })
        
        res.status(200).json(orders);

    }catch(e){
        return res.status(500).json(e);
    }
})


// get orders with flag isFinish
router.get('/getordersisfinish', verifyTokenAndAdmin,  async (req, res) => {
    try{

        
        // fetch orders with flag isWait
        const orders = await Order.find({
            isFinish: true
        }).sort({
            createdAt: -1
        })
        
        res.status(200).json(orders);

    }catch(e){
        return res.status(500).json(e);
    }
})


// get orders with flag inWork
router.get('/getordersinwork', verifyTokenAndAdmin,  async (req, res) => {
    try{

        
        // fetch orders with flag isWait
        const orders = await Order.find({
            inWork: true
        }).sort({
            createdAt: -1
        })
        
        res.status(200).json(orders);

    }catch(e){
        return res.status(500).json(e);
    }
})


module.exports = router;