import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, updateProduct } from '../../redux/slices/productSlice'
import { useParams } from 'react-router-dom'
import ONavbar from '../../components/ownercomponents/ONavbar'
import { toast } from 'react-toastify'


const OEditProductPage = () => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [type, setType] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [quantity, setQuantity] = useState(1);


    const { product, status, error } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        if (id) {

            dispatch(getProductById(id))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || 0);
            setType(product.type || "");
            setOtherNames(product.otherNames || "");
            setQuantity(product.quantity || 1);
        }
    }, [product]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("otherNames", otherNames);
        formData.append("quantity", quantity);
        if (image) {
            formData.append('productImage', image);
        }
        dispatch(updateProduct({ id, formData }))

        toast.success("Product updated successfully!");
        
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
  <div className='w-[90%] mt-5 mb-5'>
    <ONavbar />
  </div>

  <div className='h-auto w-[90%] mb-10 bg-linear-to-r from-[#fefeff] to-[#e1ebed] rounded-2xl flex justify-center items-center'>
    {status === 'loading' && <p>Loading product...</p>}
    {status === 'failed' && <p>Error: {error}</p>}

    {status === 'succeeded' && product && (
      <div className='p-6 md:p-10 w-full flex flex-col gap-5'>
        <h2 className='text-2xl font-bold mb-3'>Edit Product</h2>

        {/* Images container */}
        <div className='flex flex-col md:flex-row w-full justify-between items-center gap-6'>

          {/* Previous Image */}
          <div className='flex flex-col items-center'>
            <label htmlFor="prevImage" className='text-xl font-bold mb-2'>Previous Image</label>
            <img
              src={product.productImage}
              alt={product.name}
              id="prevImage"
              className='w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-2xl object-cover'
            />
          </div>

          {/* New Image */}
          <div className='flex flex-col items-center'>
            <label htmlFor="newImage" className='text-xl font-bold block mb-2'>New Image Select</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className='border p-2 rounded'
            />

            {preview && (
              <img
                src={preview}
                alt="New Preview"
                className='w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-2xl mt-3 object-cover'
              />
            )}
          </div>

        </div>

        {/* Inputs Section */}
        <div className='flex flex-col md:flex-row w-full justify-between gap-6 mt-6'>

          {/* Left Side */}
          <div className='w-full md:w-[45%] flex flex-col gap-4'>

            {/* Name */}
            <div>
              <label className='block mb-2 font-semibold'>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block mb-2 font-semibold'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border p-2 rounded w-full'
                rows={8}
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label className='block mb-2 font-semibold'>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>

          </div>

          {/* Right Side */}
          <div className='w-full md:w-[45%] flex flex-col gap-4'>

            {/* Quantity */}
            <div>
              <label className='block mb-2 font-semibold'>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='border p-2 rounded w-full'
              />
            </div>

            {/* Other Names */}
            <div>
              <label className='block mb-2 font-semibold'>Other Names</label>
              <input
                type="text"
                value={otherNames}
                onChange={(e) => setOtherNames(e.target.value)}
                className='border p-2 rounded w-full'
                placeholder="Enter other names (comma separated)"
              />
            </div>

            {/* Product Type */}
            <div>
              <label className='block mb-2 font-semibold'>Type of Product*</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='border p-2 rounded w-full'
              >
                <option value="">Select Type</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Home">Home</option>
                <option value="Grocery">Grocery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              className='bg-blue-500 text-white p-3 rounded mt-3'
            >
              Save Changes
            </button>

          </div>
        </div>

      </div>
    )}
  </div>
</div>

    )
}

export default OEditProductPage