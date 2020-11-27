import React, { useState, useEffect, useRef } from 'react'
import {
  Row,
  Col,
  Form,
  Button,
  CardGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Movie from '../components/Movie'
import InfiniteScroll from 'react-infinite-scroller'
import {
  client,
  apiOptions,
  saveGenresInLocalStorage,
  getGenresInLocalStorage,
} from '../api'
const sortByTitle = {
  by_popularity: 'По популярности',
  by_rating: 'По рейтингу',
  by_novelity: 'По новизне',
}
/**
 * Компонент который хранит в себе список фильмов, жанров, текущей страницы
 * getFilms - запрашивает все фильмы
 * getAllGenres - все доступны жанры
 * fetchNextData - извлекает дату по странице в infinite scroll
 * searchHandler - поиск по жанру (фильтрация по текущему списку)
 */
const Movies = () => {
  const searchInputRef = useRef('')
  const [sessionID, setSessionID] = useState('')
  const [sortBy, setSortBy] = useState('by_popularity')
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genres, setGenres] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // const getSession = async () => {
  //   const { data } = await client.get('/authentication/guest_session/new/', {
  //     params: {
  //       api_key: apiOptions.api_key,
  //     },
  //   })
  // }

  const getFilms = async () => {
    const { data } = await client.get('/discover/movie/', {
      params: {
        ...apiOptions,
        page: currentPage,
        'primary_release_date.gte': '2000-01-01',
        sort_by: 'popularity.desc',
      },
    })
    setTotalPages(data.total_pages)
    setMovies(data.results)
    setCurrentPage(data.page)
    setLoading(false)
  }

  const getAllGenres = async () => {
    const genresInLocalStorage = getGenresInLocalStorage()
    if (genresInLocalStorage.length === 0) {
      const { data } = await client.get('/genre/movie/list', {
        params: { api_key: apiOptions.api_key, language: apiOptions.language },
      })
      setGenres(data.genres)
      saveGenresInLocalStorage(data.genres)
    } else {
      setGenres(genresInLocalStorage)
    }
  }

  const fetchNextData = async (page) => {
    if (page < totalPages) {
      console.log('test')
      const { data } = await client.get('/discover/movie/', {
        params: {
          ...apiOptions,
          page: page + 1,
          'primary_release_date.gte': '2000-01-01',
          sort_by: 'popularity.desc',
        },
      })
      setMovies((mov) => {
        const { value } = searchInputRef.current
        if (value) {
          filteredMoviesHandler(value)
        }
        return mov.concat(data.results)
      })

      setCurrentPage((page) => page + 1)
    }
  }
  useEffect(() => {
    getAllGenres()
    getFilms()
    // getSession()
  }, [])

  const searchHandler = () => {
    const { value } = searchInputRef.current
    if (value) {
      filteredMoviesHandler(value)
    } else {
      setFilteredMovies([])
    }
  }

  const filteredMoviesHandler = (value) => {
    const values = value.toLowerCase().split(' ')
    const genreIds = genres.filter((genre) =>
      values.includes(genre.name.toLowerCase())
    )
    const tempMovies = movies.filter((movie) =>
      genreIds.find((genre) => movie.genre_ids.includes(genre.id))
    )
    setFilteredMovies(tempMovies)
  }

  const sortHandler = (key) => {
    setSortBy(key)
  }

  const sortMovies = (moviesArr) => {
    const tempMovies = [...moviesArr]
    const sortFloats = (a, b) => {
      if (sortBy === 'by_popularity') {
        return b.popularity - a.popularity
      } else {
        return b.vote_average - a.vote_average
      }
    }
    const sortDate = (a, b) => {
      return new Date(b.release_date) - new Date(a.release_date)
    }
    switch (sortBy) {
      case 'by_poplarity':
        return tempMovies.sort(sortFloats)
      case 'by_rating':
        return tempMovies.sort(sortFloats)
      case 'by_novelity':
        return tempMovies.sort(sortDate)
      default:
        return tempMovies.sort(sortFloats)
    }
  }

  const displayMovies = sortMovies(
    filteredMovies.length ? filteredMovies : movies
  )
  console.log('displayMovies', displayMovies)
  return (
    <Row>
      <Col md={12}>
        <Form inline>
          <input
            type='text'
            placeholder='Search'
            className='mr-sm-2'
            ref={searchInputRef}
          />
          <Button
            variant='outline-success'
            type='button'
            onClick={searchHandler}
          >
            Найти
          </Button>
        </Form>
      </Col>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            <DropdownButton
              id='dropdown-basic-button'
              title={sortByTitle[sortBy]}
              className='sort-dropdown-btn'
            >
              <Dropdown.Item onSelect={() => sortHandler('by_popularity')}>
                По популярности
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => sortHandler('by_rating')}>
                По рейтингу
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => sortHandler('by_novelity')}>
                По новизне
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <InfiniteScroll
            pageStart={currentPage}
            loadMore={fetchNextData}
            hasMore={true || false}
            loader={<Loader />}
            style={{
              display: 'grid',
              gridTemplateColumns: ' auto auto auto',
            }}
          >
            {displayMovies.map((movie) => (
              <Col key={movie.id} className='movie'>
                <CardGroup>
                  <Movie movie={movie} genres={genres} />
                </CardGroup>
              </Col>
            ))}
          </InfiniteScroll>
        </Row>
      )}
    </Row>
  )
}

export default Movies
