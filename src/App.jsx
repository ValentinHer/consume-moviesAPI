import { useState } from "react";
//import "./styles/app.css";
import {} from "bootstrap";
import { getGenres } from "./hooks/movie-genres";
import { getMovie, getMoviesByActor, getMoviesByGenre } from "./hooks/movies";
import { findPerson } from "./hooks/movie-person";

function App() {
  const [valueBuscador, setValueBuscador] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const handleChange = (event) => {
    setValueBuscador(event.target.value);
  };

  const getAllGenres = async () => {
    const response = await getGenres();
    setMovieGenres(response.data.genres);
    console.log(response.data.genres);
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

  const onSubmit = async () => {
    //Buscar el genero por el nombre
    const movieGenreMatches = movieGenres.find(
      (movie) => movie.name.toLowerCase() == valueBuscador.toLowerCase()
    );
    const movieGenreExists = movieGenreMatches ? true : false;
    // console.log(movieGenreMatches);
    // console.log(movieGenreExists);

    //Buscar el actor por el nombre
    const movieActors = await findPerson(valueBuscador);
    const actorNameMatches = movieActors.data.results.filter(
      (actor) =>
        actor.name.toLowerCase() == valueBuscador.toLowerCase() &&
        actor.known_for_department == "Acting"
    );
    const actorExists =
      actorNameMatches && actorNameMatches.length > 0 ? true : false;
    console.log(actorNameMatches)
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
      for(let i=0;i<actorNameMatches.length;i++){
        const movies = await getMoviesByActorId(actorNameMatches[i].id);
        allMoviesByActor.push(...movies);
      }
      allMovies.push(...allMoviesByActor);
    }
    if(filterMovie.isMovie) {
      const movies = searchMovieMatches;
      allMovies.push(...movies);
    }

    setSearchedMovies(allMovies);
    // console.log(allMovies);

    // const removeMoviesDuplicated = []
    // removeMoviesDuplicated.push(...new Set(allMovies));
    // console.log(removeMoviesDuplicated);
    // setValueBuscador("");
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  return (
    <>
      <div className="mainContainer bg-secondary p-5 container-fluid d-flex justify-content-center align-items-center flex-column">
        <div class="mb-3 w-50 d-flex">
          <input
            type="email"
            class="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Buscar Película"
            value={valueBuscador}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={onSubmit}
            class="btn btn-primary text-white"
          >
            Buscar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
