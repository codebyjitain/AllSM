import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getOrdersATO, updateOrder } from '../../redux/slices/orderSlice'
import { toast } from 'react-toastify'


const OOrders = () => {

  const dispatch = useDispatch()
  const [orders, setOrders] = useState(null)
  const [openPanel, setOpenPanel] = useState(false)
  const [delivery_status, setDelivery_status] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [openProductPanel, setOpenProductPanel] = useState(false)

  useEffect(() => {
    const ok = async () => {
      const checkOrders = await dispatch(getOrdersATO())
      setOrders(checkOrders.payload.data.orders)
    }
    ok()
  }, [dispatch])


  const handleUpdate = async (id, e) => {
    e.preventDefault()

    try {
      const orderData = {
        'orderId': id,
        'delivery_status': delivery_status,
        'paymentStatus': paymentStatus,
        'paymentMethod': paymentMethod
      }
      const check = await dispatch(updateOrder(orderData))
      console.log(check);
      if (check.payload?.status === 200) {
        toast.success(check.payload.data.message)
      }
      else {
        toast.error(check.payload.message)
      }
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }


  return (
    <div className='bg-[#eaf1f1] w-full min-h-screen rounded-2xl'>
      {orders?.map((order) => (
        <div key={order._id} className='flex flex-col gap-2 p-4'>
          <div className='bg-white rounded-xl cursor-pointer p-4'>
            <h2 className='text-lg font-bold mb-3' onClick={() => {
              setOpenPanel(openPanel === order._id ? null : order._id);
            }} >Order Id: {order._id} </h2>

            {openPanel === order._id && (
              <div className='flex flex-col gap-2'>
                <h2 >Order Date: {order.createdAt.split("T")[0]}</h2>

                {/* show product */}
                <div className='flex w-full p-2 items-center border text-lg rounded justify-between'>
                  <label htmlFor="" className='font-bold'>Show Product</label>
                  <input type="checkbox" onClick={() => {
                    setOpenProductPanel(!openProductPanel)
                  }} />
                </div>

                {openProductPanel && (

                  order.products.map((product) => (
                    <div key={product._id} className='flex flex-col bg-[#eaf1f1] p-4 rounded-xl md:flex-row md:justify-between items-center gap-2'>
                      <div>
                        <img className='rounded-xl' src={product.product.productImage} alt="" />
                      </div>
                      <div>

                        <h2 className='text-lg font-bold'>Product Brand: {product.product.brand}</h2>
                        <h2 className='capitalize text-lg font-bold'>Product Name: {product.product.name}</h2>
                        <h2 className='text-lg font-bold'>Product Price: {product.product.price}</h2>
                        <h2 className='text-lg font-bold'>Product Quantity: {product.quantity}</h2>
                      </div>
                    </div>
                  ))
                )}

                {/* update delivery status */}
                <label htmlFor="" className='font-bold'>Update Delivery Status : </label>
                <select value={delivery_status} onChange={(e) => setDelivery_status(e.target.value)} className='p-2 border rounded-xl'>
                  <option value={order.delivery_status}>{order.delivery_status}</option>

                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
                    .filter((m) => m !== order.delivery_status)
                    .map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                </select>


                <label htmlFor="" className='font-bold'>Update Payment Status : </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="p-2 border rounded-xl"
                >
                  <option value={order.paymentStatus}>{order.paymentStatus}</option>

                  {["Pending", "Completed", "Failed"]
                    .filter((m) => m !== order.paymentStatus)
                    .map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                </select>

                {paymentStatus === "Completed" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Update Payment Method:</label>

                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="p-2 border rounded-xl"
                    >
                      <option value={order.paymentMethod}>{order.paymentMethod}</option>

                      {["Credit Card", "Debit Card", "Cash On Delivery"]
                        .filter((m) => m !== order.paymentMethod)
                        .map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                    </select>

                  </div>
                )}



                <button className='bg-zinc-700 p-2 text-white rounded-xl text-lg' onClick={(e) => handleUpdate(order._id, e)}>Update Status</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OOrders