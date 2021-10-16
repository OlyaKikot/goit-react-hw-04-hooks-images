export default function fetchImages(page, imageNames) {
  const url = `https://pixabay.com/api/?q=${imageNames}&page=${page}&key=22945587-13dcce98a35cac559e6949163&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((response) => response.json());
}
