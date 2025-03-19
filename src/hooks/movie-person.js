import axios from "axios"
import { publicAccessKey } from "./constants"

export const findPerson = async(actor_name, page=1) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${publicAccessKey}`
        }
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${actor_name}&include_adult=false&language=es-MX&page=${page}`, options);
        return response;
    } catch (error) {
        console.log(error);
    }
}