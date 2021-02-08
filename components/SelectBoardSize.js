import React from 'react';
import _ from 'lodash';
import { useContext } from 'react';
import { AppContext } from '../components/context/AppConext';

import { updateCart, localStorageData } from '../functions'

const SelectBoardSize = ({total, selectNum, product})=> {

    const [ cart, setCart ] = useContext( AppContext );

    // change cart info
    const updateCartInfo = (e) => {

        if(process.browser){

            let existingCardData = localStorageData('shopping-cart');

            const updatedCart = updateCart(existingCardData, product, e.target.value, true);
            setCart( updatedCart );
        }

       
    }

    return (
        <select onChange={updateCartInfo} defaultValue={selectNum}  className="select-board-size">
            { _.range(1, total + 1).map(value => 

                 <option key={value} value={value}>{value}</option>
            )}
        </select>
    );
}

export default SelectBoardSize;