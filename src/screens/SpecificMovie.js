import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Favorite from '../components/Favorite'
import {
  client,
  apiOptions,
  baseImageUrlW500,
  getGenresInLocalStorage,
} from '../api'
import TooltipInfo from '../components/TooltipInfo'
import { Link } from 'react-router-dom'

const SpecificMovie = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({
    poster_path: '',
    genre_ids: [],
    title: '',
    adult: false,
    release_date: '',
  })
  const getMovie = async (movieId) => {
    const { data } = await client.get(`/movie/${movieId}`, {
      params: {
        api_key: apiOptions.api_key,
        language: apiOptions.api_key,
      },
    })
    setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    getMovie(match.params.id)
  }, [match.params.id])

  if (loading) return <Loader />

  const imageUrl = movie.poster_path
    ? `${baseImageUrlW500}${movie.poster_path}`
    : null

  console.log('movie', movie)
  const genres = getGenresInLocalStorage()
  const genreInFilm = movie.genres
    ? genres.filter((genre) => {
        return movie.genres.includes(genre.id)
      })
    : []
  console.log('genreInFilm', genreInFilm)
  const ageContent = movie.adult ? '18+' : '6+'
  return (
    <>
      <h1>{movie.title}</h1>
      <Row
        style={{
          justifyContent: 'flex-end',
        }}
      >
        <Button variant='primary' style={{ margin: '1rem' }}>
          <Link to='/'>Назад</Link>
        </Button>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>О фильме</h2>
              <p>
                <TooltipInfo label={'Название'} data={movie.title} />
              </p>
              <p>
                <TooltipInfo
                  label={'Дата производства'}
                  data={movie.release_date}
                />
              </p>
              <p>
                <TooltipInfo label={'Возрастной рейтинг'} data={ageContent} />
              </p>
              <p>
                <TooltipInfo
                  label={'Средний рейтинг'}
                  data={movie.vote_average}
                />
              </p>
              <p>
                <Favorite />
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Image src={imageUrl} alt={movie.title} fluid />
        </Col>
      </Row>
    </>
  )
}
export default SpecificMovie
