import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice.js'
import { useNavigate } from 'react-router-dom'

const OEditProduct = () => {
  const { items, status, error } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const handleClick = (id, e) => {
    e.preventDefault();
    // Navigate to edit product page or open edit modal
    navigate(`/owner/editproduct/${id}`);
  }


  return (
    <div className='flex flex-wrap rounded-2xl bg-[#eaf1f1] '>
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' &&
        items.map((product) => (
          <div key={product._id} onClick={(e)=>handleClick(product._id,e)} className='w-[300px] h-[300px] bg-white m-5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3'>
            <div>
              <img className='w-[200px] h-[200px] rounded-2xl' src={import.meta.env.VITE_BASE_URL + `/image/${product.productImage}`} alt="" />
            </div>
            <div key={product._id} className="">
              <h3>{product.name}</h3>
              {/* <p>{product.description}</p> */}
              <p>Price: ${product.price}</p>
              {/* Add edit functionality here */}
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default OEditProduct