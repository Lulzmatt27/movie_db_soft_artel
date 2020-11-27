import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Favorite from '../components/Favorite'
import Genre from '../components/Genre'
import TooltipInfo from '../components/TooltipInfo'
import { baseImageUrlW154 } from '../api'
const Movie = ({ movie, genres }) => {
  const imageUrl = movie.poster_path
    ? `${baseImageUrlW154}${movie.poster_path}`
    : null
  const genreInFilm = genres.filter((genre) => {
    return movie.genre_ids.includes(genre.id)
  })
  const markAsFavoriteHandler = (id) => {}
  // console.log('genreInFilm', genreInFilm)
  return (
    <Card className='my-3 p-3 rounded movie-card'>
      <Link to={`/movie/${movie.id}`}>
        <Image
          src={imageUrl}
          variant='top'
          alt={movie.title}
          fluid
          style={{ width: '160px', height: '200px', display: 'block' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/movie/${movie.id}`}>
          <Card.Title as='div' title={movie.original_title}>
            <strong>{movie.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            {genreInFilm.map((genre) => (
              <Genre genre={genre} key={genre.id} />
            ))}
            {/* <Row className='my-2'>
              <TooltipInfo label='Популярность' data={movie.popularity} />
            </Row> */}
            {/* <Row className='my-2'>
              <TooltipInfo label='Средний рейтинг' data={movie.vote_average} />
            </Row> */}
            {/* <Row>
             <TooltipInfo
                label='Дата производства'
                data={movie.release_date}
              /></Row> */}
            {/* <Rating value={movie.rating} text={`${movie.numReviews} reviews`} /> */}
          </div>
        </Card.Text>
        <Card.Text style={{ textAlign: 'end' }}>
          <Button
            as='span'
            variant='link'
            onClick={markAsFavoriteHandler(movie.id)}
          >
            <Favorite />
          </Button>
        </Card.Text>
        <Card.Text>
          <TooltipInfo label='Популярность' data={movie.popularity} />
        </Card.Text>
        <Card.Text>
          <TooltipInfo label='Средний рейтинг' data={movie.vote_average} />
        </Card.Text>
        <Card.Text>
          <TooltipInfo label='Дата производства' data={movie.release_date} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Movie
