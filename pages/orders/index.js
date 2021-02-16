import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
    () => import('../../components/MyOrder'),
    { ssr: false }
  )

const Orders = ({orders}) => {

    return (
        <div>
            <DynamicComponent orders={orders}/>
        </div>
    );
}

export async function getServerSideProps(){
    const res = await fetch(`http://localhost:3000/api/order`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': '*',
      },
    });
    const data = await res.json();
    return {
      props:{
        orders:data
      }
    }
   }

export default Orders