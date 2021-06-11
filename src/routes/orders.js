const express = require('express');
const router = express.Router();
const controller = require('../controller/Order.controller')


router.route('/deals')
/**
     * @api {get} /deals
     * @apiDescription Get all deals
     *@apiError (Forbidden 500)     Deu ruim   
     * @apiError (Forbidden 404)     Not Found   
     * @apiError (Forbidden 401)     Token Error   
     */
  .post(controller.orderCreation)

router.route('/all')
/**
     * @api {get} /won-deals
     * @apiDescription Get all deals
     *
     * @apiError (Forbidden 500)     Deu ruim   
     * @apiError (Forbidden 404)     Not Found   
     * @apiError (Forbidden 401)     Token Error   
     */
  .get(controller.listOrders)

    module.exports = router;