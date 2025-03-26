import axios from "axios"
import { publicAccessKey } from "./constants"

export const getGenres = async() => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${publicAccessKey}`
        }
    }

    try {
        const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=es", options);
        return response;
    } catch (error) {
        // console.log(error);
        return {success: false, message: error.message};
    }
}