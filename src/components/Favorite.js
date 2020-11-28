import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Favorite = ({ isFavorite, color }) => {
  const classNameStr = isFavorite ? 'fas fa-star' : 'far fa-star'
  console.log('color', color)
  return (
    <span className='favorite-btn' title='Пометить как любимый фильм'>
      <i style={{ color }} className={classNameStr}></i>
    </span>
  )
}
Favorite.defaultProps = {
  isFavorite: false,
  color: '#f8e825',
}
Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  color: PropTypes.string,
}
export default Favorite
