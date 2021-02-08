import { useRouter } from 'next/router'
import Router from "next/router";

import Invoice from '../../components/Invoice'

import { localStorageData } from '../../functions'

const Order = ({order}) => {

    const router = useRouter();
    let id = router.query.id;
    let orderItem = null;

    const navigateErrorPage = () => {
        Router.push(`/404"`);
    }

    try{

        let allOrders = localStorageData('user-orders');

        let filterOrder = allOrders.orders.filter(function(item){
            return parseInt(item.id, 10) == parseInt(id, 10)
        });

        orderItem = filterOrder[0];

    }catch
    {
        navigateErrorPage();
    }
    

    return (
        <div>
            <Invoice data={orderItem}/>
        </div>
    )
}

// export async function getStaticProps({params:{id}}) {

//     let allOrders = localStorageData('user-orders');

//     const filtered = allOrders.orders.filter((p) => p.id === id);

//     return {
//       props:{
//         order:filtered
//       }
//     }

//    }

//    export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: { id: '1' } },
//       ],
//       fallback: true
//     };
//   }

export default Order