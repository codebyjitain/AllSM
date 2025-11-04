import React, { useState } from 'react'
import axios from 'axios';

const OAddProduct = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const token = localStorage.getItem('ownertoken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('productImage', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('ownertoken', token); // optional, if you are using auth

      const response = await axios.post('http://localhost:3000/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Image uploaded successfully');
        setFile(null);
        setName('');
        setDescription('');
        setPrice(0);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <div className='flex gap-10 p-10 rounded-2xl flex-col bg-linear-to-r from-[#fefeff] to-[#e1ebed]'>
      <div className='flex gap-10'>
        <div className='flex flex-col gap-3 items-center justify-center'>
          <input type="text" value={name} onChange={(e) => {
            setName(e.target.value)
          }} placeholder='Enter Product Name' className='border p-2 ' />
          <input type="number" value={price} onChange={(e) => {
            setPrice(e.target.value)
          }} className='border p-2 ' placeholder='Product Price' />
          <textarea name="description" value={description} onChange={(e) => {
            setDescription(e.target.value)
          }} className='border p-2' rows="4" cols="25" placeholder='Description'></textarea>
        </div>

        <div className='flex flex-col gap-3 items-center justify-center'>
          <input type="file" className='p-2 border' name='productImage' onChange={(e) => {
            setFile(e.target.files[0])
          }} />
        </div>
      </div>
      <input type="submit" className='border border-black bg-black text-white text-2xl p-2 rounded' value="Submit" onClick={(e) => handleSubmit(e)} />
    </div>
  )
}

export default OAddProduct