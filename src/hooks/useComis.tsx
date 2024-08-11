import useSWR from "swr";
import { getComicsById } from "../api";
import { Comic } from "../types";
import { ensureHttps } from "../utils/helpers";

// Fetcher function to use with useSWR
const fetcher = async (params: { offset: number; id: string }) => {
  const response = await getComicsById(params.offset, params.id);
  return response?.data;
};

const transformData = (comicData: Comic[]) => {
  return comicData
    .map((comic: any) => {
      const onSaleDateObj = comic.dates.find(
        (date: any) => date.type === "onsaleDate"
      );
      const onSaleDate = onSaleDateObj ? onSaleDateObj.date : "Unknown";

      return {
        id: comic.id,
        title: comic.title,
        onSaleDate: onSaleDate,
        thumbnail: {
          path: ensureHttps(comic.thumbnail.path),
          extension: comic.thumbnail.extension,
        },
      };
    })
    .sort(
      (a: Comic, b: Comic) =>
        new Date(b.onSaleDate).getTime() - new Date(a.onSaleDate).getTime()
    );
};

const useComics = (offset: number, id: string) => {
  const { data, error, isLoading } = useSWR({ offset, id }, fetcher, {
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

export default useComics;
