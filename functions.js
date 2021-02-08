export const addFirstProduct = ( product, qty ) => {
    
    let productPrice = product.price;

	let newCart = {
		products: [],
		totalProductsCount: parseInt(qty),
		totalProductsPrice: parseInt(productPrice)
	};

    const newProduct = createNewProduct( product, qty );
    
	newCart.products.push( newProduct );

    localStorage.setItem( 'shopping-cart', JSON.stringify( newCart ) );

	return newCart;
};

const createNewProduct = ( product, qtyToBeAdded ) => {

	return  {
		productId: product.id,
		image: product.imageUrl,
		name: product.name,
		price: product.price,
		qty: parseInt(qtyToBeAdded),
		totalPrice: parseInt(product.price * qtyToBeAdded),
		availableItem: product.quantity
	};

};

// update product
export const updateCart = ( existingCart, product, qtyToBeAdded,  newQty = false) => {

	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, newQty );

	const addPrice = (total, item) => {
		total.totalPrice += item.totalPrice;
		total.qty += parseInt(item.qty);

		return total;
	};

	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
	let total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } );

	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: total.qty,
		totalProductsPrice: parseInt(total.totalPrice)
	};

	localStorage.setItem( 'shopping-cart', JSON.stringify( updatedCart ) );

	return updatedCart;
};


export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded, newQty) => {

	let productId = newQty === true ? product.productId : product.id;
	const productExitsIndex = isProductInCart( existingProductsInCart, productId );

	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];

		//updatedProduct.qty = qtyToBeAdded > updatedProduct.qty ? parseInt(updatedProduct.qty) + parseInt(qtyToBeAdded) : parseInt(qtyToBeAdded);
		if(newQty === true){
			updatedProduct.qty = parseInt(qtyToBeAdded);
		}else{
			updatedProduct.qty = parseInt(updatedProduct.qty) + parseInt(qtyToBeAdded);
		}
		
		updatedProduct.totalPrice =  parseInt(updatedProduct.price * updatedProduct.qty);

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let productPrice = product.price;
		const newProduct = createNewProduct( product, productPrice, parseInt(qtyToBeAdded) );
		newProduct.qty = parseInt(qtyToBeAdded);
		newProduct.totalPrice = parseInt(newProduct.qty * newProduct.price);
		existingProductsInCart.push( newProduct );

		return existingProductsInCart;
	}
};


const isProductInCart = ( existingProductsInCart, productId ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( productId == item.productId ) {
			return item;
		}
	};

	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};

export const deleteProductFromCart = (productId)=>{

	let existingCart = localStorageData('shopping-cart');

	const productExitsIndex = isProductInCart( existingCart.products, productId );

	
	if ( -1 < productExitsIndex ) {

		let updatedProducts = existingCart.products;

		let deleteProduct = updatedProducts[ productExitsIndex ];
		let qty = deleteProduct.qty;
		let price = deleteProduct.price;

		updatedProducts.splice(productExitsIndex, 1);
		existingCart.totalProductsCount = existingCart.totalProductsCount - qty;
		existingCart.totalProductsPrice = existingCart.totalProductsPrice - (price * qty);

		if(existingCart.totalProductsCount <= 0){
			localStorage.removeItem('shopping-cart');
		}else{
			localStorage.setItem( 'shopping-cart', JSON.stringify( existingCart ) );
		}

		



		return existingCart;

	}
	else{
		throw new Error('Product not found from cart');
	}
}

export const localStorageData = (key) =>{
	
	let existingData = {};

	if(process.browser){
		
		existingData = localStorage.getItem(key);

		if(existingData){

			existingData = JSON.parse( existingData );
		}
		else{
			existingData = {};
		}
	}
	
	return existingData;

}

// place user order
export const userOrderPlace = (data) => {

	 let oldOrderData = localStorage.getItem('user-orders');
     let newOrder = JSON.parse(data);

	// newOrder.date = `${new Date().getDate()}/ ${
	// 	new Date().getMonth() + 1
	// 	}/${new Date().getFullYear()}
	// 	-${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`;
        
        if (oldOrderData){

          oldOrderData = JSON.parse( oldOrderData );

		  newOrder.id = oldOrderData.orders.length + 1;
		  console.log(newOrder.id, oldOrderData.orders.length);
		  
		  oldOrderData.orders.push(newOrder);
          localStorage.setItem('user-orders' , JSON.stringify(oldOrderData)) 

        }
		else
		{
			let orderCart = {
				orders: []
			};
			orderCart.orders.push(newOrder);

          	localStorage.setItem('user-orders' , JSON.stringify(orderCart)) 
		}
		
	return newOrder.id;
}

export const date = () => {

	var monthNames = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");

	var today = new Date();
	var cDate = today.getDate();
	var cMonth = today.getMonth();
	var cYear = today.getFullYear();

	var cHour = today.getHours();
	var cMin = today.getMinutes();
	var cSec = today.getSeconds();
	var sign = cHour >= 12 ? 'pm' : 'am';

	let newDate = monthNames[cMonth] + " " +cDate  + ", " +cYear + " " +cHour+ ":" + cMin+ ":" +cSec + " " + sign;

	return newDate;
	
}