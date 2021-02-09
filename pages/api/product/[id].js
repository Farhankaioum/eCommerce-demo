const fs = require('fs');

const path = 'helpers/data/products.json';

export default function ordertHandler({ query: { id } }, res) {
    
    let productData = loadData();

    if(!isObjectEmpty(productData)){

        let products = JSON.parse(productData);
        let filterProduct = products.filter((product) => {
            return product.id == id;
        });

        if(filterProduct.length <= 0){
            res.status(404);
        }
        else{
            res.status(200).json(filterProduct[0]);
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