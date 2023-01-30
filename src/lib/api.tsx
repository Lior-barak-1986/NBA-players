export const fetchNextPage = async (
  url: string,
  pageNumber: number,
  searchPhrase: string
) => {
  const res = await fetch(url + `?page=${pageNumber}&search=${searchPhrase}`);
  return await res.json();
};
