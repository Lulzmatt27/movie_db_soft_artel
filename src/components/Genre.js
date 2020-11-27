import React from 'react'
import { Badge } from 'react-bootstrap'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const variants = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'light',
]
// мог не делать запросы для жанров и просто использовать эту структуру
// ¯\_(ツ)_/¯
const genres = [
  {
    id: 28,
    name: 'Action',
    color: 'primary',
  },
  {
    id: 12,
    name: 'Adventure',
    color: 'secondary',
  },
  {
    id: 16,
    name: 'Animation',
    color: 'success',
  },
  {
    id: 35,
    name: 'Comedy',
    color: 'danger',
  },
  {
    id: 80,
    name: 'Crime',
    color: 'warning',
  },
  {
    id: 99,
    name: 'Documentary',
    color: 'light',
  },
  {
    id: 18,
    name: 'Drama',
    color: 'primary',
  },
  {
    id: 10751,
    name: 'Family',
    color: 'secondary',
  },
  {
    id: 14,
    name: 'Fantasy',
    color: 'success',
  },
  {
    id: 36,
    name: 'History',
    color: 'danger',
  },
  {
    id: 27,
    name: 'Horror',
    color: 'warning',
  },
  {
    id: 10402,
    name: 'Music',
    color: 'primary',
  },
  {
    id: 9648,
    name: 'Mystery',
    color: 'secondary',
  },
  {
    id: 10749,
    name: 'Romance',
    color: 'success',
  },
  {
    id: 878,
    name: 'Science Fiction',
    color: 'danger',
  },
  {
    id: 10770,
    name: 'TV Movie',
    color: 'warning',
  },
  {
    id: 53,
    name: 'Thriller',
    color: 'primary',
  },
  {
    id: 10752,
    name: 'War',
    color: 'secondary',
  },
  {
    id: 37,
    name: 'Western',
    color: 'light',
  },
]
const Genre = ({ genre }) => {
  const genreObj = genres.find((gen) => gen.id === genre.id)
  return (
    <span className='mx-1 my-1'>
      <Badge variant={genreObj.color}>{genre.name}</Badge>
    </span>
  )
}

export default Genre
