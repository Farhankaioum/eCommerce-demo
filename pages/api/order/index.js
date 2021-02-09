const fs = require('fs');

const path = 'helpers/data/order.json';

export default function handler(req, res) {
  
  if (req.method === "POST") {

    let orderData = loadData();

    if(!isObjectEmpty(orderData)){

      let PrevOrder = JSON.parse(orderData);
      let newOrder = JSON.parse(req.body);

      let orderId = PrevOrder.length + 1
      newOrder.id = orderId;

      fs.writeFile(
        path,
        JSON.stringify([...PrevOrder, newOrder]),
        (err) => {
          if (err) console.log(err);
        }
      );

      res.status(200).json({id: newOrder.id});

    }else{

      fs.writeFile(
        path,
        JSON.stringify(newOrder),
        (err) => {
          if (err) console.log(err);
        }
      );
      
      res.status(200).json({id: newOrder.id});
    }
  }
  else{ // get request

    let data = loadData();
    res.status(200).json({orders: JSON.parse(data)});

  }
}

const storeData = ( data) => {

    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
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