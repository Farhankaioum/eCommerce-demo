const fs = require('fs');

const path = 'helpers/data/order.json';

export default function ordertHandler({ query: { id } }, res) {
    
    let orderData = loadData();

    if(!isObjectEmpty(orderData)){

        let orders = JSON.parse(orderData);
        let filterOrder = orders.filter((order) => {
            return order.id == id;
        });

        if(filterOrder.length <= 0){
            res.status(404);
        }
        else{
            res.status(200).json(filterOrder[0]);
        }
    }

    res.status(404);

  }

const loadData = () => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
}

function isObjectEmpty(obj) {
return Object.keys(obj).length === 0;
}