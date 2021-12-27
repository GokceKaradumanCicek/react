import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies, setMovies]=useState([]);
  const[isLoading, setIsLoading]=useState(false);
  const[error, setError]=useState(null);
  async function fetchMoviesHandler(){
    setIsLoading(true);
    try{
     const response= await fetch('https://swapi.dev/api/film/');
     if(!response.ok){
      console.log("RESPONSE STATUS:", response.status);
      throw new Error("Ugh.. Something went wrong :(");
    }
      const data= await response.json();
      const transformedMovies=data.results.map(moviesData=>{
        return{
         id:moviesData.episode_id,
         title:moviesData.title,
         releaseDate:moviesData.release_date,
         openingText:moviesData.opening_crawl
        }
      });
      setMovies(transformedMovies);
      console.log(transformedMovies);
      setIsLoading(false);
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
