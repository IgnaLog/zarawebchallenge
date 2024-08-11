import axios from "axios";
import CryptoJS from "crypto-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const MARVEL_PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const getCharacters = async (offset: number = 0, nameStartsWith?: string) => {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(
    ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY
  ).toString();
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        limit: 5,
        offset,
        ts,
        apikey: MARVEL_PUBLIC_KEY,
        hash,
        ...(nameStartsWith && { nameStartsWith }),
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const getComicsById = async (offset: number = 0, id: string) => {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(
    ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY
  ).toString();
  try {
    const response = await axios.get(`${BASE_URL}/${id}/comics`, {
      params: {
        limit: 5,
        offset,
        ts,
        apikey: MARVEL_PUBLIC_KEY,
        hash,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export { getCharacters, getComicsById };
