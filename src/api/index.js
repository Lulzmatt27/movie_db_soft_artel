import axios from 'axios'

// export const apiKey = '4237669ebd35e8010beee2f55fd45546'
export const apiOptions = {
  language: 'en-US',
  api_key: '4237669ebd35e8010beee2f55fd45546',
  sort_by: 'popularity.asc',
  include_adult: false,
  include_video: false,
}
export const baseImageUrlW154 = 'https://image.tmdb.org/t/p/w154'
export const baseImageUrlW500 = 'https://image.tmdb.org/t/p/w500'
export const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})
export const saveGenresInLocalStorage = (genres) => {
  localStorage.setItem('genres', JSON.stringify(genres))
}
export const getGenresInLocalStorage = () => {
  return localStorage.getItem('genres')
    ? JSON.parse(localStorage.getItem('genres'))
    : []
}
// желательно apiKey не показывать кому-либо)
