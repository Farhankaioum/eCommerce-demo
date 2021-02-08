import Invoice from '../../components/Invoice'

const Order = ({order}) => {

    console.log('order id page: ', order);

    return (
        <div>
            <Invoice data={order}/>
        </div>
    )
}

export async function getStaticProps({params:{id}}) {

    const res = await fetch(`http://localhost:3000/api/order/${id}`);
    const data = await res.json();

    return {
      props:{
        order:data
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

export default Order