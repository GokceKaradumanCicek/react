import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies, setMovies]=useState([]);
  const[isLoading, setIsLoading]=useState(false);
  //const[error, setError]=useState(null);
  async function fetchMoviesHandler(){
    setIsLoading(true);
    fetch('https://swapi.dev/api/films/').then(response=>{
     return response.json();
    }).then(data=>{
      const transformedMovies=data.results.map(moviesData=>{
        return{
          id:moviesData.episode_id,
          title:moviesData.title,
          releaseDate:moviesData.release_date,
          openingText:moviesData.opening_crawl
        }
      })
      setMovies(transformedMovies);
      console.log(transformedMovies);
      setIsLoading(false);
    })

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
