import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
    () => import('../../components/MyOrder'),
    { ssr: false }
  )

const Orders = () => {
    
    return (
        <div>
            <DynamicComponent/>
        </div>
    );
}

export default Orders