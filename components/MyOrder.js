import React from 'react';
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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    txt: {
        marginTop: '20px',
        textAlign: 'center',
        color: 'red'
    },
    link: {
        cursor: 'pointer'
    },
    container: {
        margin: "20px 0",
        minHeight: "80vh"
    }
  });

const MyOrder = ({orders}) => {

    console.log('orders from api ', orders);

    const classes = useStyles();

    return (
      <div>

          {
              Object.keys(orders).length === 0 ? 
               <div> 
                   <h2 className={classes.txt}>You have no orders history</h2>
               </div> 
                :
                <>
                <CssBaseline />
                <Container maxWidth="xl" className={classes.container}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Order Id</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Total Quantity</TableCell>
                                <TableCell align="right">Total Price</TableCell>
                                <TableCell align="right">Address</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orders.orders.map((order) => (
                                
                            <TableRow key={order.id} onClick={() => Router.push(`/orders/${order.id}`)} className={classes.link}>
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{order.date}</TableCell>
                                <TableCell align="right">{order.totalQuantity}</TableCell>
                                <TableCell align="right">{order.totalPrice}</TableCell>
                                <TableCell align="right">{order.user.address}</TableCell>
                            </TableRow>
                                
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                </>
          }
      </div>
    );
  }
   
  export default MyOrder;

