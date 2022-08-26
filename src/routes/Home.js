import React from 'react';
import axios from 'axios';
import './Home.css';
import Movie from './components/Movie';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({ movies, isLoading: false });
  };
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
          ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  />
                ))}
            </div>
        )}
      </section>
    );
  }
  // 1번만 실행
  componentDidMount() {
    console.log('component render!');
    this.getMovies();
  }
  // 업데이트시 실행
  componentDidUpdate() {
    console.log('component update!');
  }
  // refresh, 페이지 이동 등
  componentWillUnmount() {
    console.log('component unmount!');
  }
}

export default Home;
