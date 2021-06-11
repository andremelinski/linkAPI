const axios = require('axios');
require('dotenv').config();
const sharedFiles = require('../shared/orders.logic')
const CreateOrder = require('./order.deal');
const Order = require('../model/Order')
/**
 * Getting all Deals
 * @public
 */
module.exports.orderCreation = async (req,res) => {
     try{
          const response = await axios.get(`https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_TOKEN}`);
       const {data} = response.data
       if(data){
            const orders = await CreateOrder.create(data);
            
            await sharedFiles.savingOrdertoDB(orders);
            return res.json(orders).status(201);
       }
       return

     }catch(err){
          console.error(err.message)
          return err.message
     }

}

module.exports.listOrders = async (req,res) => {
     try{
          // First way
          // const response = await Order.aggregate([{
          // $group: 
          //    {
          //  _id: '$date',
          //  totalAmount: { $sum:  "$value" },
          //  count: { $sum: 1 }
          // }
          // }])

          // Second Way
          const response = await Order.aggregate([
               {
                    $project: {
                         yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                         totalAmount: "$value",
                    }
               },{
                    $group: 
                    {
                    _id: '$yearMonthDayUTC',
                    totalAmount: { $sum:  "$totalAmount" },
                    count: { $sum: 1 }
                    }
               }
          ])

       return res.json(response)

     }catch(err){
          console.error(err.message)
          return err.message
     }

}