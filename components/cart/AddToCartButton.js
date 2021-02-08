import { useContext } from 'react';
import { AppContext } from '../context/AppConext';

import {addFirstProduct, updateCart} from '../../functions';
import styles from '../../styles/Home.module.css'

const AddToCartButton = (props) => {

    const [ cart, setCart ] = useContext( AppContext );

    const handleAddToCartClick = () => {
        
        if(process.browser){
            let existingCart = localStorage.getItem('shopping-cart');

            if(existingCart){

                existingCart = JSON.parse( existingCart );
                
                const updatedCart = updateCart(existingCart, props.product, props.qty);

                setCart( updatedCart );
            }
            else{
                const newCart = addFirstProduct(props.product, props.qty);
                setCart(newCart);
            }
        }
    }

    return (
        <>
            <button className={styles.btn} onClick={handleAddToCartClick}>Add to Cart</button>
        </>
    )
}

export default AddToCartButton