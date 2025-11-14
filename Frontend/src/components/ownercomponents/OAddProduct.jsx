import React, { useState } from "react";
import { useDispatch } from "react-redux"; // You can define this like updateProduct
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/slices/productSlice";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState('')
  const [otherNames, setOtherNames] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [discounted_price, setDiscounted_price] = useState('')
  const [stock, setStock] = useState('in stock')
  const [brand, setBrand] = useState('')
  const [specifications, setSpecifications] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !quantity || !image) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("otherNames", otherNames);
    formData.append("quantity", quantity);
    formData.append("productImage", image);
    formData.append("discounted_price", discounted_price);
    formData.append("stock", stock);
    formData.append("brand", brand);
    formData.append("specifications", specifications);
    formData.append("ownertoken", localStorage.getItem("ownertoken"));


    dispatch(addProduct(formData))

    toast.success("Product added successfully!");
    // setName("");
    // setPrice(0);
    // setDescription("");
    // setType("");
    // setOtherNames("");
    // setQuantity(1);
    // setImage(null);
    // setPreview(null);
    // setDescription("");


  };

  return (
    <div className="h-auto flex flex-col gap-10 justify-center items-center bg-[#eaf1f1] rounded-2xl">

      <h2 className="text-2xl font-bold text-center mt-5">Add New Product</h2>
      <div className="flex justify-between w-[90%] md:flex-row flex-col">
        <div className="flex flex-col md:w-2/5 w-full gap-5">


          {/* Product Name */}
          <div>
            <label className="block mb-1 font-semibold">Product Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter product name"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-1 font-semibold">Brand*</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold">Price (₹)*</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter price"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-semibold">Stock*</label>
            <select
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>

            </select>
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block mb-1 font-semibold">Discount Price (₹)</label>
            <input
              type="number"
              value={discounted_price}
              onChange={(e) => setDiscounted_price(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter price"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-semibold">Quantity Available*</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter available quantity"
            />
          </div>

          

          {/* Product Category */}
          <div>
            <label className="block mb-1 font-semibold">Category*</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Home">Home</option>
              <option value="Grocery">Grocery</option>
              <option value="Other" >Other</option>
            </select>
          </div>


        </div>


        <div className="flex flex-col md:w-2/5 md:mt-0 mt-5 w-full gap-5">
          {/* Other Names */}
          <div>
            <label className="block mb-1 font-semibold">
              Other Names (comma separated)
            </label>
            <input
              type="text"
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. Hoodie, Sweatshirt"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block mb-1 font-semibold">Specifications*</label>
            <textarea
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              rows={4}
              className="border p-2 rounded w-full"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border p-2 rounded w-full"
              placeholder="Enter product description"
            ></textarea>
          </div>


          {/* Product Image */}
          <div>
            <label className="block mb-1 font-semibold">Product Image*</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="border p-2 rounded w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-[200px] h-[200px] object-cover rounded-xl border"
              />
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-600 text-white py-2 w-[90%] mb-10 rounded hover:bg-blue-700 mt-2">
        Add Product
      </button>

    </div>
  );
};

export default AddProduct;
