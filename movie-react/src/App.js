import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const[movies, setMovies]=useState([]);
  const[isLoading, setIsLoading]=useState(false);
  const[error, setError]=useState(null);

  async function fetchMoviesHandler(){
    setIsLoading(true);
    try{
     const response= await fetch('https://react-http-b83de-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok){
       console.log("RESPONSE STATUS:", response.status);
       throw new Error("Ugh.. Something went wrong :(");
      }
      const data= await response.json();
      console.log('!!!!!');
      console.log(data);

      const loadedMovies=[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
      console.log(loadedMovies);
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  }
   async function addMovieHandler(movie) {
     const response= await fetch('https://react-http-b83de-default-rtdb.firebaseio.com/movies.json',{
        method:'POST',
        body: JSON.stringify(movie),
        headers:{
          'Content-type': 'application/json'
        }
      });
      const data= await response.json();
      console.log(data);
    }
  let content= <p>No movie found.</p>;
    if(movies.length>0){
      content=<MoviesList movies={movies} />;
    }
    if(error){
      content=<p>{error}</p>;
    }
    if(isLoading){
      content=<p>Loading...</p>;
    }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
