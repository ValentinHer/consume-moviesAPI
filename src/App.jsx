import { useState, useEffect } from "react";
// import "./styles/app.css";
// import {} from "bootstrap";
import { getGenres } from "./hooks/movie-genres";
import {
  getCastForMovie,
  getMovie,
  getMoviesByActor,
  getMoviesByGenre,
} from "./hooks/movies";
import { findPerson } from "./hooks/movie-person";
import FirstSearch from "./Components/FirstSearch";
import Movie_card from "./Components/Movie_card";
import LoadingScreen from "./Components/LoadingScreen";
import Error404 from "./Components/Error404";
import Net_err from "./Components/Net_err";

function App() {
  const [valueBuscador, setValueBuscador] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [errorInSearch, setErrorInSearch] = useState({});

  const handleChange = (event) => {
    setValueBuscador(event.target.value);
  };

  const getAllGenres = async () => {
    const response = await getGenres();
    if (response.success && response.success == false) {
      console.log(response.success);
      setError({ error: true, message: response.message });
      return;
    }
    setMovieGenres(response.data.genres);
  };

  const getMovieByGenreId = async (genre_id) => {
    const response = await getMoviesByGenre(genre_id);
    const movies = response.data.results;
    return movies;
  };

  const getMoviesByActorId = async (actor_id) => {
    const response = await getMoviesByActor(actor_id);
    const movies = response.data.results;
    return movies;
  };

  const setCastWithMovies = async (movies) => {
    const moviesChanged = [];
    for (let i = 0; i < movies.length; i++) {
      const getCast = await getCastForMovie(movies[i].id);
      const cast = getCast.data.cast;
      const dataMovieChanged = { ...movies[i], cast: cast };
      moviesChanged.push(dataMovieChanged);
    }

    // console.log(moviesChanged);
    setSearchedMovies(moviesChanged);
  };

  const handleValidations = (valueToValidate) => {
    const newWithoutSpaces = valueToValidate.trim();
    if(newWithoutSpaces.length < 2) return {error: true, message: "La búsqueda debe tener al menos dos carácteres"}
    else if(newWithoutSpaces != valueToValidate) return {error: true, message: "La búsqueda no debe tener espacios al principio o final"}
  };

  const onSubmit = async () => {
    setErrorInSearch({});
    const errorToSearch = handleValidations(valueBuscador);
    if (errorToSearch && errorToSearch.error == true) {
      setErrorInSearch(errorToSearch);
      return;
    }
    setIsFirstSearch(false);
    setLoading(true);
    //Buscar el genero por el nombre
    const movieGenreMatches = movieGenres.find(
      (movie) => movie.name.toLowerCase() == valueBuscador.toLowerCase()
    );
    const movieGenreExists = movieGenreMatches ? true : false;
    // console.log(movieGenreMatches);
    // console.log(movieGenreExists);

    //Buscar el actor por el nombre
    const movieActors = await findPerson(valueBuscador);
    if (movieActors.success && movieActors.success == false) {
      setError({ error: true, message: movieActors.message });
      setLoading(false);
      return;
    }
    const actorNameMatches = movieActors.data.results.filter(
      (actor) =>
        actor.name.toLowerCase() == valueBuscador.toLowerCase() &&
        actor.known_for_department == "Acting"
    );
    const actorExists =
      actorNameMatches && actorNameMatches.length > 0 ? true : false;
    console.log(actorNameMatches);
    console.log(actorExists);

    //Buscar la pelicula por el nombre
    const searchMovie = await getMovie(valueBuscador);
    const searchMovieMatches = searchMovie.data.results;
    const movieExists =
      searchMovieMatches && searchMovieMatches.length > 0 ? true : false;
    // console.log(searchMovieMatches);
    // console.log(movieExists);

    const filterMovie = {
      isGenre: movieGenreExists,
      isActor: actorExists,
      isMovie: movieExists,
    };

    console.log(filterMovie);

    const allMovies = [];
    if (filterMovie.isGenre) {
      const movies = await getMovieByGenreId(movieGenreMatches.id);
      allMovies.push(...movies);
    }
    if (filterMovie.isActor) {
      const allMoviesByActor = [];
      for (let i = 0; i < actorNameMatches.length; i++) {
        const movies = await getMoviesByActorId(actorNameMatches[i].id);
        allMoviesByActor.push(...movies);
      }
      allMovies.push(...allMoviesByActor);
    }
    if (filterMovie.isMovie) {
      const movies = searchMovieMatches;
      allMovies.push(...movies);
    }
    console.log(allMovies);
    await setCastWithMovies(allMovies);

    // setSearchedMovies(allMovies);
    // console.log(allMovies);

    // const removeMoviesDuplicated = []
    // removeMoviesDuplicated.push(...new Set(allMovies));
    // console.log(removeMoviesDuplicated);
    // setValueBuscador("");
    setLoading(false);
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  const setSearchError = (message) => {
    return (
      <div >
        <p className="text-danger">
          {message}
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-secondary p-5 container-fluid d-flex justify-content-center align-items-center flex-column">
          <div className="mb-0 w-50 d-flex">
            <input
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Buscar Película"
              value={valueBuscador}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary text-white"
              disabled={loading ? true : false}
            >
              Buscar
            </button>
          </div>
        {errorInSearch.error == true && setSearchError(errorInSearch.message)}
      </div>
      <div className="container-fluid bg-secondary ">
        {isFirstSearch ? (
          <FirstSearch />
        ) : loading ? (
          <LoadingScreen />
        ) : error.error ? (
          <Net_err />
        ) : searchedMovies.length == 0 ? (
          <Error404 />
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 bg-primary">
            {searchedMovies &&
              searchedMovies.map((movie) => (
                <Movie_card
                  key={movie.id}
                  img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  titulo={movie.title}
                  descripcion={movie.overview}
                  reparto={movie.cast.map((actor) => actor.name)}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
