import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice'


const OEditProduct = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // infinite scroll logic 
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const limit = 10;


    useEffect(() => {
        const load = async () => {
            const result = await dispatch(fetchProducts({ page, limit })).unwrap();
            setProducts(prev => [...prev, ...result.data.products]);
        };

        load();
    }, [page]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleEdit = (id, e) => {
        e.preventDefault();
        navigate(`/owner/editproduct/${id}`)
    }

    const handleDelete = (id, e) => {
        e.preventDefault()

    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#eaf1f1] p-4 rounded-2xl md:grid-cols-1 lg:grid-cols-4 gap-4">
            {products.map((item, index) => (
                <div
                    key={index || item._id}
                    className="rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition "
                >
                    <div className="flex items-center justify-center overflow-hidden rounded-xl mb-3 bg-gray-100">
                        <img src={item.productImage} alt={item.name} className="w-[500px] h-[200px]" />
                    </div>


                    <h2 className="text-xl font-semibold mb-1 truncate">{item.brand}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                    <h2 className="text-lg font-semibold mb-1 truncate">{item.name}</h2>


                    <p className="font-bold text-xl mb-3">₹{item.price}</p>

                    <div className='flex gap-2 '>

                        <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 cursor-pointer" onClick={(e) => handleEdit(item._id, e)}>
                            Edit
                        </button>
                        <button className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-blue-700 cursor-pointer" onClick={(e) => handleDelete(item._id, e)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OEditProduct