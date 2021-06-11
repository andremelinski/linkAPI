const mongoose = require('mongoose')
//  Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
// 1- criar com os valores do retorno e depois agrega
const userSchema = new mongoose.Schema({
     numero: {
          type: Number,
          required: true,
     },
     idPedido: {
          type: Number,
          required: true
     },
     volumes: [{ 
          servico: { type: String},
          codigoRastreamento: { type: String },
     }],
     value: {
          type: Number,
          required: true
     },
     orgName: {
          type: String,
          required: true
     },
     date: {
          type: String,
          required: true
     },
},{
     timestamps: true,
});

const Orders = mongoose.model('Orders', userSchema)

module.exports = Orders