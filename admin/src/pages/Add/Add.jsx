import React, { useState, useEffect } from 'react'
import './Add.css'
import upload_img from "../../assets/upload_img.png"
import axios from 'axios'
import { backendurl } from '../../App'
import Login from '../../component/Login/Login'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Boys')
  const [sizes, setSizes] = useState([])



  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.append("name", name),
        formData.append("description", description),
        formData.append("price", price),
        formData.append("category", category)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)



      const response = await axios.post("http://localhost:4000/api/product/add", formData, { headers: { token } })

     console.log(response.data);
     
      if (response.data.success) {
        alert(response.data.message)
        setName('')
        setDescription('')
        setCategory('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error);
      alert(error.message)


    }
  }

  return (
    <div className='addfood-container'>
      <form className='form-container' onSubmit={onSubmitHandler}>
        <div>
          <p className='form-label'>Upload Image</p>
          <div className="upload-image-container">
            <label htmlFor="image1">
              <img src={!image1 ? upload_img : URL.createObjectURL(image1)} alt="" className='image-preview' />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            <label htmlFor="image2">
              <img src={!image2 ? upload_img : URL.createObjectURL(image2)} alt="" className='image-preview' />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>
            <label htmlFor="image3">
              <img src={!image3 ? upload_img : URL.createObjectURL(image3)} alt="" className='image-preview' />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>
            <label htmlFor="image4">
              <img src={!image4 ? upload_img : URL.createObjectURL(image4)} alt="" className='image-preview' />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
        </div>
        <div className="form-group">
          <p className='form-label'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='form-input' placeholder='Enter product name' required />
        </div>
        <div className="form-group">
          <p className='form-label'>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" className='form-input' placeholder='Type your product description' required />
        </div>

        <div className="form-group-horizontal">
          <div>
            <p className='form-label'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='from-select'>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Baby">Baby</option>
            </select>
          </div>

          <div>
            <p className='form-label'>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='30' className='form-input price-input' />
          </div>


        </div>

        <div className="form-group-down">
          <p className='form-label'>Product Size</p>
          <div className="size-option">
            {
              ["S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} onClick={() => setSizes(
                  (prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                )}
                  className={`size-options ${
                    sizes.includes(size) ? "selected" : ""
                    }`}
                >
                  {size}
                </div>

              ))
            }
          </div>


          <div className="checkbox-group">
            <input type="checkbox" id='bestSeller' />
            <label htmlFor="bestSeller">Add to bestSeller</label>
          </div>
        </div>
        <button className='submit-button' type='submit'>Add Product</button>
      </form>
    </div>
  )
}

export default Add;