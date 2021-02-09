const fs = require('fs');

const path = 'helpers/data/products.json';

export default function handler(req, res) {

  fs.writeFile(
    path,
    req.body,
    (err) => {
      if (err) console.log(err);
    }
  );

  res.status(200).json();
}