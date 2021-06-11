const Order = require('../model/Order')

module.exports = {
     async savingOrdertoDB(orders){
      //  console.log(orders)
    await orders.map(async ({ numero, idPedido, volumes, value, orgName, date }) => {
      try{
        const order = await new Order({
          numero,
          idPedido,
          volumes,
          value,
          orgName,
          date
        });
        await order.save();
        return order;
      }catch(e){
        console.error(e.message)
        return e.message;
      }
      }
    );
     }
}