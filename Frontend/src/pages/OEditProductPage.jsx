import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, updateProduct } from '../redux/slices/productSlice'
import { useParams } from 'react-router-dom'


const OEditProductPage = () => {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [updatedData, setUpdatedData] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)


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
        }
    }, [product]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        if (image) {
            formData.append("productImage", image);
        }
        dispatch(updateProduct({id,formData}))
        setSubmitting(true)
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            {status === 'loading' && <p>Loading product...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {submitting && <p>Submitting</p>}
            {status === 'succeeded' && product && (
                <div className='p-10 w-[90%] flex flex-col gap-5 border rounded-2xl'>
                    <h2 className='text-2xl font-bold mb-5'>Edit Product</h2>
                    <div className='flex justify-between'>
                        <div className='flex w-2/4 justify-between'>
                            <div>
                                <label htmlFor="prevImage" className='text-xl font-bold'>Previous Image</label>
                                <img
                                    src={import.meta.env.VITE_BASE_URL + `/image/${product.productImage}`}
                                    alt={product.name}
                                    id="prevImage"
                                    className='w-[300px] h-[300px] rounded-2xl mb-5 object-cover'
                                />
                            </div>

                            <div>
                                <label htmlFor="newImage" className='text-xl font-bold block mb-2'>
                                    New Image Select
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setImage(file);
                                            setPreview(URL.createObjectURL(file)); // show live preview
                                        }
                                    }}
                                    className='border p-2 rounded'
                                />

                                {/* Show preview of selected image */}
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="New Preview"
                                        className='w-[300px] h-[300px] rounded-2xl mt-3 object-cover'
                                    />
                                )}
                            </div>
                        </div>

                        <div className='w-[40%]'>
                            <div>
                                <label className='block mb-2'>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}

                                    className='border p-2 rounded w-full'
                                />
                            </div>
                            <div>
                                <label className='block mb-2'>Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    className='border p-2 rounded h-auto w-full'
                                    rows={8}
                                ></textarea>
                            </div>
                            <div>
                                <label className='block mb-2'>Price:</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    className='border p-2 rounded w-full'
                                />
                            </div>
                            <button onClick={(e) => handleSubmit(e)} className='bg-blue-500 text-white p-2 rounded mt-3'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default OEditProductPage