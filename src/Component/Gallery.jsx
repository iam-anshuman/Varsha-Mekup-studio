import React,{useState} from 'react';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const photos = [
    { src: "./src/assets/bride-1.jpg", width: 686, height: 1280 },
    { src: "./src/assets/bride-2.jpg", width: 509, height: 509 },
    { src: "./src/assets/bride-3.jpg", width: 960, height: 1280 },
    { src: "./src/assets/bride-4.jpg", width: 960, height: 1280 },
    { src: "./src/assets/bride-5.jpg", width: 960, height: 1280 },
    { src: "./src/assets/bride-6.jpg", width: 817, height: 1225 },
    { src: "./src/assets/bride-7.jpg", width: 367, height: 367 },
    { src: "./src/assets/bride-8.jpg", width: 468, height: 1040 },
    { src: "./src/assets/bride-9.jpg", width: 468, height: 1040 },
    { src: "./src/assets/bride-10.jpg", width: 573, height: 1280 },
    { src: "./src/assets/bride-11.jpg", width: 960, height: 1280 },
    { src: "./src/assets/hairstyle-1.jpg", width: 1280, height: 1280 },
    { src: "./src/assets/hairstyle-2.jpg", width: 1280, height: 1280 },
    { src: "./src/assets/hairstyle-3.jpg", width: 800, height: 1067 },
    { src: "./src/assets/mehendi 1.jpg", width: 720, height: 720 },
    { src: "./src/assets/mehendi-2.jpg", width: 960, height: 1280 },
    { src: "./src/assets/mehendi-3.jpg", width: 1080, height: 1080 },
  ];

export default function Gallery() {
    const [index, setIndex] = useState(-1);

  return (
    <>
     <PhotoAlbum photos={photos} layout="masonry" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen]}
      />
    </>
  )
}
