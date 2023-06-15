const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errroHandler")
const Orders = require("../model/orders")
const { isAuthenticated, isSellerAuthenticated } = require("../middleware/auth")
const Product = require("../model/product")
const orders = require("../model/orders")
const Shop = require("../model/shop")
router.post("/create-order", catchAsyncError(async (req, res, next) => {
    try {
        const { cart, user, shippingAddress, totalPrice, paymentInfo } = req.body;
        console.log(req.body)
        const shopItemsMap = new Map();

        for (const item of cart) {
            const shopId = item.shopId;
            if (!shopItemsMap.has(shopId)) {
                shopItemsMap.set(shopId, []);
            }
            shopItemsMap.get(shopId).push(item);
        }

        // create an order for each shop
        const orders = [];

        for (const [shopId, items] of shopItemsMap) {
            const order = await Orders.create({
                cart: items,
                shippingAddress,
                user,
                totalPrice,
                paymentInfo,
            });
            orders.push(order);
        }
        res.status(201).json({
            success: true,
            orders,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}))
router.get("/get-all-order/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.body)
        const orders = await Orders.find({ 'user._id': req.params.id })
        console.log(orders)
        res.status(201).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get("/get-all-order-refund/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.body)
        const orders = await Orders.find({
            $or: [
                { status: "Processing refund" },
                { status: "Refunded" }
            ],
            'user._id': req.params.id
        })
        console.log(orders)
        res.status(201).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get("/get-all-order-seller/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.params.id)
        const orders = await Orders.find({ 'cart.shopId': req.params.id })
        console.log(orders)
        res.status(201).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.put(
    "/update-order-status/:id",
    isSellerAuthenticated,
    catchAsyncError(async (req, res, next) => {
        try {
            const { status } = req.body

            const order = await Orders.findById(req.params.id)
            if (status == "Transferred to delivery partner") {
                orders.cart.forEach(async (element) => {
                    const product = Product.findById(element._id)
                    product.stock -= product.qty
                    product.sold_out += product.qty
                    await product.save()
                });
            }
            order.status = status
            if (status == "Delivered") {
                order.deliveredAt = Date.now();
                order.paymentInfo.status = "Succeeded";
                const serviceCharge = order.totalPrice * .10;
                const seller = await Shop.findById(req.seller.id);

                seller.availableBalance = order.totalPrice - serviceCharge;

                await seller.save();
            }
            await order.save()
            res.status(201).json({
                success: true,
                order,
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
router.get("/get-all-order-seller-refunded/:id", catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.body)
        const orders = await Orders.find({ status: "Refunded", 'cart.shopId': req.params.id })
        console.log(orders)
        res.status(201).json({
            success: true,
            orders
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.put(`/order-refund/:id`, isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const order = await Orders.findById(req.params.id)
        if (!order) {
            throw new ErrorHandler("Order does not exist!", 400)
        }
        order.status = req.body.status
        await order.save()
        res.status(201).json({
            success: true,
            order,
            message: "Order Refund under Process"
        })
    } catch (error) {
        throw new ErrorHandler(error.message, 500)
    }
}))

router.put(`/order-refund-success/:id`, isSellerAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const order = await Orders.findById(req.params.id)
        if (!order) {
            throw new ErrorHandler("Order does not exist!", 400)
        }
        order.status = req.body.status
        await order.save()
        order.cart.forEach(async (item) => {
            const product = await Product.findById(item._id)
            product.stock += item.qty
            product.sold_out -= item.qty
            await product.save()
        })
        res.status(201).json({
            success: true,
            message: "Order Refund Successfull!"
        })
    } catch (error) {
        throw new ErrorHandler(error.message, 500)
    }
}))
module.exports = router