import axios from "axios";
import { publicAccessKey } from "./constants";

export const getMovie = async (movie_name, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${publicAccessKey}`,
    },
  };

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${movie_name}&include_adult=false&language=es-MX&page=${page}`,
      options
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesByGenre = async (id_genre) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${publicAccessKey}`,
    },
  };

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-MX&page=1&sort_by=popularity.desc&with_genres=${id_genre}`,
      options
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesByActor = async (id_actor) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${publicAccessKey}`,
    },
  };

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-MX&page=1&sort_by=popularity.desc&with_cast=${id_actor}`,
      options
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCastForMovie = async (id_movie) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${publicAccessKey}`,
    },
  };

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id_movie}/credits?language=es-MX'`,
      options
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
