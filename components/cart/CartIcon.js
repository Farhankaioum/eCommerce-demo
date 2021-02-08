import { useContext } from 'react';
import { AppContext } from "./../context/AppConext";
import Link from 'next/link';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { IconButton, Badge } from '@material-ui/core'

const CartIcon =()=> {

    const [ cart ] = useContext( AppContext );
    const productsCount = ( null !== cart && Object.keys( cart ).length ) ? cart.totalProductsCount : '';

	return (
		<>
			<Link href="/cart">
				<a>
					<IconButton>
						<Badge badgeContent={productsCount ? productsCount : 0} color="secondary">
							<ShoppingBasketIcon fontSize="large" />
						</Badge>
					</IconButton>
				</a>
			</Link>
		</>

	)
};

export default CartIcon;