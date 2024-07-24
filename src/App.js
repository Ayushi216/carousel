import "./App.css";
import slides from './data/images.json'
import { useEffect, useState } from "react";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isSlideshowRunning) {
      intervalId = setInterval(() => {
        setSelectedImage(
          (prevImageIndex) => (prevImageIndex + 1) % slides.slides.length
        );
      }, 1000); // 10 seconds interval, adjust as needed
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isSlideshowRunning]);

  const sliderHandler = (direction) => {
    if (direction === "left") {
      setSelectedImage((selectedImage - 1 + slides.slides.length) % slides.slides.length);
    } else {
      setSelectedImage((selectedImage + 1) % slides.slides.length);
    }
  };

  const handleSlideShow = (e) => {
    setIsSlideshowRunning(e.target.checked);
  };

  return (
    <div className="App">
      <img src={slides.slides[selectedImage].src} alt="" />
      <div>
        <button onClick={() => sliderHandler("left")}>left</button>
        {slides.slides.map((img, index) => (
          <img
            key={index}
            src={img.src}
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => setSelectedImage(index)}
            alt=""
          />
        ))}
        <button onClick={() => sliderHandler("right")}>right</button>
      </div>
      <label>
        <input type="checkbox" onChange={handleSlideShow} />
        Start slideshow
      </label>
    </div>
  );
}
