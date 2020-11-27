import React from 'react'
import { Button } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

const Favorite = ({ isFavorite, color }) => {
  const classNameStr = isFavorite ? 'fas fa-star' : 'far fa-star'
  console.log('color', color)
  return (
    <span className='favorite-btn'>
      <i style={{ color }} className={classNameStr}></i>
    </span>
  )
}
Favorite.defaultProps = {
  color: '#f8e825',
}
Favorite.propTypes = {
  isFavorite: propTypes.boolean,
  color: propTypes.string,
}
export default Favorite
