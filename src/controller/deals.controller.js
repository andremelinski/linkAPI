const axios = require('axios');
require('dotenv').config();

/**
 * Getting WON Deals
 * Pagination with start = 0
 * @public
 */
exports.getWonDeals = async (req, res) => {
  try {
       const response = await axios.get(`https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${process.env.PIPEDRIVE_TOKEN}`);
      //  console.log(response.data)
       const {data} = response.data
      return res.send(data);
    
  } catch (error) {
       console.error(error)
    return (error.message);
  }
};

/**
 * Getting all Deals
 * @public
 */
exports.getAllDeals = async (req, res) => {
  try {

       const response = await axios.get(`https://api.pipedrive.com/v1/deals?api_token=${process.env.PIPEDRIVE_TOKEN}`);
      return res.json(response.data);
    
  } catch (error) {
       console.error(error)
    return (error.message);
  }
};