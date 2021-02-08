import styles from '../../styles/Home.module.css'
import {useState} from 'react'
import React from 'react';
import _ from 'lodash';
import AddToCartButton from '../../components/cart/AddToCartButton'

const Product = ({product})=> {

    if (!product) return <div>Loading...</div>

    const [count, setCount] = useState(1);
    const [availableQty, setAvailableQty] = useState(product.quantity);

    const available = product.quantity > 0 ? true : false;

    const updateAvailableProduct = () => {
      console.log('count ', availableQty - count);
      setAvailableQty(parseInt(availableQty - count))
    }

    return (
        <div className={styles.containerFluid}>
            <div>
              <div className={styles.imgdiv}>
                <img className={styles.img} src={product.imageUrl}></img>
              </div>
              <div className={styles.detailsDiv}> 
                  <h2 className={styles.h2}>{product.name}</h2>
                  <p className={styles.price}>TK: {product.price}</p>
                  <p className={styles.detail}>{product.about}</p>
                  {
                    available === true &&
                  <> 
                    {/* <p className={styles.quantity}>Quantity: 
                        <input type="number" className={styles.quantitySub} onChange={(e) => { setCount(e.target.value) }} value={count} min="1" max={product.quantity}/>
                    </p> */}
                    <p className={styles.avlProduct}>Product Available: <span className={styles.avlProductSpan}>{availableQty}</span></p>
                    <p className={styles.quantity}>Quantity: 
                      <select onChange={(e) => {  setCount(e.target.value)}} defaultValue={'1'}  className={styles.selectBoardSize}>
                        { _.range(1, availableQty + 1).map(value => 

                            <option key={value} value={value}>{value}</option>
                        )}
                      </select>
                    </p>
                     
                    <AddToCartButton onClick={() => updateAvailableProduct}  product={product} qty={count}/>
                  </>
                  }

                  {
                    available !== true &&
                    <>
                    <p className={styles.quantity}>Availability: 
                      <span className={styles.quantitySub}>Out of Stock</span>
                    </p>
                    <button className={available===true ? styles.btn : styles.btnDisable} type="button">Add to Cart</button>
                    </>
                  }
                  
              </div>
            </div>
            
        </div>
    )
}

export async function getStaticProps({params:{id}}) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await res.json();

    return {
      props:{
        product:data
      }
    }

   }

   export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: '1' } },
      ],
      fallback: true
    };
  }


export default Product