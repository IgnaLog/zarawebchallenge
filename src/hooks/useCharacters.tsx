import useSWR from "swr";
import { getCharacters } from "../api";
import { Character } from "../types";
import { ensureHttps } from "../utils/helpers";

// Fetcher function to use with useSWR
const fetcher = async (params: { offset: number; searchTerm: string }) => {
  const response = await getCharacters(params.offset, params.searchTerm);
  return response?.data;
};
const transformData = (charactersData: Character[]) => {
  return charactersData.map((character: Character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: {
        path: ensureHttps(character.thumbnail.path),
        extension: character.thumbnail.extension,
      },
    };
  });
};

const useCharacters = (offset: number, searchTerm: string) => {
  const { data, error, isLoading } = useSWR({ offset, searchTerm }, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000,
  });

  const transformedData = transformData(data?.data.results || []);
  const totalResults = data?.data.total || 0;

  return {
    data: transformedData,
    isLoading,
    isError: error,
    totalResults,
  };
};

export default useCharacters;
