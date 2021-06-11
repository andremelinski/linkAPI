const express = require('express');
const router = express.Router();
const controller = require('../controller/deals.controller')


router.route('/deals')
/**
     * @api {get} /deals
     * @apiDescription Get all deals
     *@apiError (Forbidden 500)     Deu ruim   
     * @apiError (Forbidden 404)     Not Found   
     */
  .get(controller.getAllDeals)

router.route('/won-deals')
/**
     * @api {get} /won-deals
     * @apiDescription Get all deals
     *
     * @apiError (Forbidden 500)     Deu ruim   
     * @apiError (Forbidden 404)     Not Found   
     */
  .get(controller.getWonDeals)


  module.exports = router;