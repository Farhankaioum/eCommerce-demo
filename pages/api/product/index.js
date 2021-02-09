const fs = require('fs');

const path = 'helpers/data/products.json';

export default function handler(req, res) {
  
    let data = loadData();
    res.status(200).json(JSON.parse(data));

}

const loadData = () => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }

const storeData = ( data) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  