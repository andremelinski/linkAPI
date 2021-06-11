const axios = require('axios');
require('dotenv').config();
const jsontoxml = require('jsontoxml') //must be sent a xml file to Bling;

//  url https://bling.com.br/Api/v2/pedido/json/?apikey=${blingKey}&xml=${xml}`);"

const blingKey = process.env.BLING_TOKEN
const bling_url = require("../url/bling") 
const date = new Date();
const dateNow = date.toLocaleDateString();
// recebe todas os deals do tipo WON e coloca essas infos. Necessario mudar a quantidade quando utiliza
module.exports = {
     async create(deals){
          const orders = deals.map(async deal =>{
          const xml = jsontoxml({
               pedido: [
                    {
                         name: 'cliente',
                         children: [
                         { name: 'nome', text: deal.org_id.name ? deal.org_id.name : 'Company' },
                         { name: 'tipoPessoa', text: 'F' },
                         { name: 'endereco', text: 'R. dos bobos' },
                         { name: 'ie_rg', text: '99999999' },
                         { name: 'numero', text: '10' },
                         { name: 'bairro', text: 'Por ai 3' },
                         { name: 'cep', text: '01234-567' },
                         { name: 'cidade', text: 'Curitiba' },
                         { name: 'uf', text: 'PR' },
                         { name: 'fone', text: '9999999999' },
                         { name: 'email', text: deal.creator_user_id.email || 'admin@mailinator.com' },
                         ],
                    },
                    {
                    name: 'transporte',
                    children: [
                    { name: 'transportadora', text: 'Nuvem Transportadora' },
                    { name: 'tipo_frete', text: 'R' },
                    { name: 'servico_correios', text: 'Teletransporte' },
                    {
                         name: 'dados_etiqueta',
                         children: [
                         { name: 'nome', text: 'Aqui' },
                         { name: 'endereco', text: 'Rua dos bobos' },
                         { name: 'numero', text: '1' },
                         { name: 'complemento', text: 'nao tem' },
                         { name: 'municipio', text: 'Sao Paulo' },
                         { name: 'uf', text: 'SP' },
                         { name: 'cep', text: '00.000-000' },
                         { name: 'cidade', text: 'Curitiba' },
                         ]
                    },
                    {
                         name: 'volumes',
                         children: [
                         {
                              name: 'volume',
                              children: [
                                   {name: 'servico', text: 'Teletransporte'},
                                   {name: 'codigoRastreamento', text: 'Codigo124'}
                              ],
                         },
                         ],
                    },
                    ]},
                    {
                    name: 'itens',
                    children: [
                         { name: 'item',
                         children: [
                              { name: 'codigo', text: 50 },
                              { name: 'descricao', text: `Falha de modo random (?)` },
                              { name: 'un', text: 'Un' },
                              { name: 'qtde', text: 80 },
                              { name: 'vlr_unit', text: deal.value || 10 },
                         ]}
                    ]},
                    {
                    name: 'parcelas',
                    children: [{
                    name: 'parcela',
                    children: [{ 
                         name: 'vlr', text: deal.value || 0
                    }],
                    }],
                    }
               ]
          }, false);

          try{
               const orderData = await axios.post(`${bling_url}?apikey=${blingKey}&xml=${xml}`)
               if(orderData.data !== undefined){

                    const { pedido } = orderData.data.retorno.pedidos[0];
                    const finalOrder ={
                         ...pedido,
                         value: deal.value,
                         numero: parseInt(pedido.numero),
                         orgName: deal.org_id.name,
                         date: dateNow
                    }
                    return finalOrder;
               }
          } catch (error) {
               console.log("96 order")
               console.log(error.message)
               return e.message
          };
     })
     // array the won com o xml preenchido
     const CreatedOrders = await Promise.all(orders).then((res) => {
      return res;
    });
     return CreatedOrders;
     }
}