import styles from '../styles/Invoice.module.css'

const Invoice = (data) => {
    let count = 0;
    
    return(

        <div className={styles.invoiceBox}>
            <table cellPadding="0" cellSpacing="0">
                <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <img src="/logo.png" className={styles.img}/>
                                </td>
                                <td className={styles.td}>
                                    Invoice #: 123<br/>
                                   <span className={styles.date}>{data.data.date}</span> <br/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr className={styles.information}>
                    <td colSpan="2">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    Online Buy, Inc.<br/>
                                    12345 Sunny Road<br/>
                                    Dhaka, CA 12345
                                </td>
                                
                                <td>
                                    {data.data.user.name}<br/>
                                    {data.data.user.phone}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr className={styles.heading}>
                    <td>
                        Payment Method
                    </td>
                    
                    <td></td>
                    <td></td>
                    <td> Cash #</td>
                </tr>
                <tr className={styles.details}>
                    <td>
                        Cash On Delivery
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        {data.data.totalPrice}
                    </td>
                </tr>

                <tr className={styles.heading}>
                    <td>
                        Item
                    </td>
                    <td>
                        Price
                    </td>
                    <td>
                        Quantity
                    </td>
                    <td>
                        Total Price
                    </td>
                </tr>
            
            {
                
                data.data.items.map(order => (

                <tr key={count++} className={styles.item}>
                    <td>
                        {order.name}
                    </td>
                    
                    <td>
                        {order.price}
                    </td>
                    <td>
                        {order.qty}
                    </td>
                    <td>
                        {order.totalPrice}
                    </td>
                </tr>
                ))
            }
            
            <tr className={styles.total}>
                <td></td>
                <td></td>
                <td colSpan="2">
                   Total: {data.data.totalPrice}.00 TK
                </td>
            </tr>
            </tbody>

            </table>
        </div>

    );
}

export default Invoice