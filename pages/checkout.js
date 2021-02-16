import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";


import React, { useContext } from "react";
import Router from "next/router";

import {localStorageData, date, IsProductsAvailable, changingSomething} from '../functions';
import { AppContext } from '../components/context/AppConext';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    form: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 400,
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    table: {
        overflow: 'hidden',
        marginRight: '10px',
        marginLeft: '15px',
    },
    message: {
        marginTop: '30px',
        textAlign: 'center',
        letterSpacing: '1px',
        textTransform: 'capitalize'
    },
    noProduct: {
        textAlign: 'center',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: 'red',
        minHeight: '80vh',

    },
    title: {
        marginTop: '30px',
        letterSpacing: '1px',
        textTransform: 'capitalize'
    }
  }));

const Checkout = () => {

    const classes = useStyles();

    const [ cart, setCart ] = useContext( AppContext );

    let carts = localStorageData('shopping-cart');

    // order posting method
    const orderHandler = async event => {
        event.preventDefault() 
        
        var order = {
            user: {name: event.target.name.value, phone: event.target.phone.value, address: event.target.address.value},
            items: carts.products,
            totalPrice: carts.totalProductsPrice,
            totalQuantity: carts.totalProductsCount,
            date: date(),
            id: 1
        }

        //console.log('order ', order);

        let productAvailAble = await IsProductsAvailable(carts);
        let decision = await productAvailAble;

        let updatedProductInfo = await changingSomething();
        let changingInfo = await updatedProductInfo;
        
        if(decision) {

            const res = await fetch("http://localhost:3000/api/order", {
                method: "POST",
                body: JSON.stringify(order),
            })
            
            const result = await res.json();

            const productRes = await fetch("http://localhost:3000/api/updateProduct", {
                method: "POST",
                body: JSON.stringify(changingInfo),
            })
            const productUpdateResult = await productRes;

            localStorage.removeItem('shopping-cart');
            setCart('');

            Router.push(`/orders/${result.id}`);

        } else{
            alert('Product is not available, please try again later!');

            localStorage.removeItem('shopping-cart');
            setCart('');
            Router.push("/");
        }

      }
    
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={7}>
                    {
                        Object.keys(carts).length !== 0  && 
                    <>
                        <h2 className={classes.message}>Provide your information to confirm order</h2>
                        <Paper className={classes.paper}>

                            <form className={classes.form} onSubmit={orderHandler}>
                                <div>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        variant="outlined"
                                        required
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />
                                </div>
                                <div style={{ margin: "15px 0px 10px 0px"}}>
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Place Confirm
                                </Button>
                                
                                </div>
                            </form>
                        </Paper>
                    </>
                    }

                    {
                        Object.keys(carts).length == 0  && 
                        <div className={classes.noProduct}>
                           <h2>You have no products inside your cart to checkout</h2> 
                        </div>
                    }
                    
                </Grid>

                <Grid item md={4}>
                    { Object.keys(carts).length !== 0  && 
                        <>
                        <h3 className={classes.title}>Product Information</h3>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="left">Qty</TableCell>
                                        <TableCell align="left">Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    { carts.products.map((product) => (
                                        <TableRow key={product.productId}>

                                            <TableCell align="left" style={{ verticalAlign: 'top'}}>
                                                {product.name}
                                            </TableCell>

                                            <TableCell align="left" style={{ verticalAlign: 'top'}}>{product.qty}</TableCell>

                                            <TableCell align="left" style={{ verticalAlign: 'top' }}>{product.totalPrice}</TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </>
                    }
                </Grid>
            
            </Grid>
      </div>
    );
}

export default Checkout