import React from 'react';
import { useContext } from 'react';
import Router from "next/router";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

import {localStorageData} from '../functions';
import styles from '../styles/Cart.module.css';
import {deleteProductFromCart} from '../functions';
import { AppContext } from '../components/context/AppConext';
import SelectBoardSize from '../components/SelectBoardSize';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Cart = ()=> {

    const [ cart, setCart ] = useContext( AppContext );

    // delete item from cart
    const deleteProduct = (productId) => {

        if(confirm('Are you sure, want to remove this item from cart?')){
            
            let updatedProduct = deleteProductFromCart(productId);

            setCart(updatedProduct);
        }
        
    }

    const classes = useStyles();

    let carts = localStorageData('shopping-cart')

    return (
        <>
        <CssBaseline />
        <Container maxWidth="xl" className={styles.container}>
            { Object.keys(carts).length == 0  && <span className={styles.message}>No item into your shopping cart</span>}
            { Object.keys(carts).length != 0  && 
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { carts.products.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell component="th" scope="row">
                                    <img className={styles.productImg} src={product.image} alt="product-img"/>
                                    <h2>{product.name}</h2>
                                </TableCell>
                                <TableCell align="right" style={{ verticalAlign: 'top'}}>{product.price}</TableCell>
                                <TableCell align="right" style={{ verticalAlign: 'top' }}>
                                    <SelectBoardSize total={product.availableItem} selectNum={product.qty} product={product}/>
                                </TableCell>
                                <TableCell align="right" style={{ verticalAlign: 'top' }}>{product.totalPrice}</TableCell>
                                <TableCell align="right" style={{ verticalAlign: 'top' }}>
                                    <button type="button" className={styles.btnDanger} onClick={() => { deleteProduct(product.productId)}}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={styles.div}>
                <div className={styles.totalAmount}>
                    Total amount: <span className={styles.red}>{carts.totalProductsPrice}</span>
                </div>
                <div >
                    <Button className={styles.checkoutBtn} variant="contained" fullWidth color="primary" onClick={() => Router.push("/checkout")}>
                        Process to Checkout
                    </Button>
                </div>
            </div>
        </>
            }
        </Container>
        </>
    );
}

export default Cart