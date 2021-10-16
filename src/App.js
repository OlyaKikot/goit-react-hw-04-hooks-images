import "./App.css";

import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import fetchImages from "./services/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [bigImg, setBigImg] = useState(null);

  const onSubmit = (imageNames) => {
    if (searchQuery !== imageNames) {
      setImages([]);
      setPage(1);
      setSearchQuery(imageNames);
    }
  };

  const onCloseModal = () => {
    setBigImg(null);
  };
  const onImgClick = (largeImageURL) => {
    setBigImg(largeImageURL);
  };

  const getImages = () => {
    setLoading(true);
    fetchImages(page, searchQuery)
      .then((resp) => {
        if (resp.hits.length === 0) {
          toast("Уточните критерии поиска!");
        }
        setImages((oldImages) => [...oldImages, ...resp.hits]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchQuery === "") return;
    getImages();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  const handleOverlay = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    return window.addEventListener("keydown", handleKeyDown);
  }, []);

  const onLoadMore = () => {
    setPage((oldPage) => oldPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} onImgClick={onImgClick} />
      {loading && <Loader />}
      {images.length > 0 && <Button onLoadMore={onLoadMore} />}
      <ToastContainer autoClose={3000} />
      {bigImg && (
        <Modal
          src={bigImg}
          onCloseModal={onCloseModal}
          handleOverlay={handleOverlay}
        />
      )}
    </>
  );
}
// export default class App extends React.Component {
//   state = {
//     images: [],
//     loading: false,
//     imageNames: "",
//     page: 1,
//     bigImg: null,
//   };
// onSubmit = (imageNames) => {
//   if (this.state.imageNames !== imageNames) {
//     this.setState({ images: [], page: 1, imageNames });
//   }
// };

// onCloseModal = () => {
//   this.setState({ bigImg: null });
// };

// onImgClick = (largeImageURL) => {
//   this.setState({ bigImg: largeImageURL });
// };

// getImages = () => {
//   this.setState({ loading: true });
//   fetchImages(this.state.page, this.state.imageNames)
//     .then((resp) => {
//       if (resp.hits.length === 0) {
//         toast("Уточните критерии поиска!");
//       }
//       return this.setState((old) => ({
//         images: [...old.images, ...resp.hits],
//       }));
//     })
//     .catch((error) => console.log(error))
//     .finally(() => this.setState({ loading: false }));
// };

// componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.imageNames !== this.state.imageNames ||
//     prevState.page !== this.state.page
//   ) {
//     this.getImages();
//   }
//   if (this.state.page > 1) {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   }
// }

// handleKeyDown = (e) => {
//   if (e.code === "Escape") {
//     this.onCloseModal();
//   }
// };

// handleOverlay = (e) => {
//   if (e.currentTarget === e.target) {
//     this.onCloseModal();
//   }
// };

// componentDidMount() {
//   window.addEventListener("keydown", this.handleKeyDown);
// }
// componentWillUnmount() {
//   window.removeEventListener("keydown", this.handleKeyDown);
// }

// onLoadMore = () => {
//   this.setState((prevState) => ({
//     page: prevState.page + 1,
//   }));
// };

//   render() {
//     return (
//       <>
//         <SearchBar onSubmit={this.onSubmit} />
//         <ImageGallery images={this.state.images} onImgClick={this.onImgClick} />
//         {this.state.loading && <Loader />}
//         {this.state.images.length > 0 && (
//           <Button onLoadMore={this.onLoadMore} />
//         )}
//         <ToastContainer autoClose={3000} />
//         {this.state.bigImg && (
//           <Modal
//             src={this.state.bigImg}
//             onCloseModal={this.onCloseModal}
//             handleOverlay={this.handleOverlay}
//           />
//         )}
//       </>
//     );
//   }
// }
