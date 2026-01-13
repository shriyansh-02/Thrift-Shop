import React, { useContext } from 'react'
import Heart from '../../assets/Heart'
import { useHistory } from "react-router-dom"
import { PostContext } from "../../contextStore/PostContext"
import "./postcards.css"

function PostCards({ product, index }) {
  const { setPostContent } = useContext(PostContext)
  const history = useHistory()

  const handleClick = () => {
    setPostContent(product)
    history.push("/view")
  }

  return (
    <div className="card" key={index} onClick={handleClick}>
      
      <div className="favorite">
        <Heart />
      </div>

      <div className="image">
        <img src={product.url} alt={product.name} />
      </div>

      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="category">{product.category}</span>
        <p className="name">{product.name}</p>
      </div>

      {/* Upload date REMOVED – hidden from public users */}
    </div>
  )
}

export default PostCards
