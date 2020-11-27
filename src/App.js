import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Movies from './screens/Movies'
import SpecificMovie from './screens/SpecificMovie'
// import Film from './components/Film'
// TODO вывести список фильмов (изображение, название, в избранном или нет)
// a)добавить пагинацию(переход к след.\предыд стр, отображение номер текущей странице или бесконечный скролл)
// TODO добавить карточку конкретного фильма с информацией о нем(отдельный роут)
// TODO фильтрация по жанрам
// TODO Добавить сортировку(по популярности, по рейтингу, по новизне)
// TODO Возможность добавить фильм в избранное или удалить из избранного
function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Movies} exact />
          <Route path='/movie/:id' component={SpecificMovie} />
        </Container>
      </main>
    </Router>
  )
}

export default App
