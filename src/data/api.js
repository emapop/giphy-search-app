const GIPHY_API =
  "https://api.giphy.com/v1/gifs/search?api_key=VYmsxlWOIM2Vqxw7gIXcaw4NE1DS0Gxc&q=";
const getGifBySearchTerm = (searchTerm) => {
  return `${GIPHY_API}${searchTerm}`;
};
export { getGifBySearchTerm };
