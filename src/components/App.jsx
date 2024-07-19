import React, { useState, useEffect } from 'react';
import image1 from '../svg/img1.png';
import image2 from '../svg/img2.png';
import image3 from '../svg/ img3.png';
import image4 from '../svg/ img4.png';
import image5 from '../svg/ img5.png';
import image6 from '../svg/ img6.png';
import image7 from '../svg/ img7.png';
import image8 from '../svg/ img8.png';
import image9 from '../svg/ img9.png';
import image10 from '../svg/ img10.png';
import image11 from '../svg/ img11.png';
import image12 from '../svg/ img12.png';
import image13 from '../svg/ img13.png';

import { nanoid } from 'nanoid';

const App = () => {
  const [screen, setScreen] = useState(0);
  const [time, setTime] = useState(30);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [images, setImages] = useState([]);

  const imageUrls = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
  ];

  useEffect(() => {
    if (time === 0) {
      finishGame();
    }
  }, [time]);

  const startGame = () => {
    setScore(0); // Reset score when starting a new game
    setTimer(setInterval(decreaseTime, 1000));
    createRandomImage();
    setTimeState(time);
  };

  const decreaseTime = () => {
    setTime(prevTime => {
      const newTime = prevTime - 1;
      setTimeState(newTime);
      return newTime;
    });
  };

  const setTimeState = value => {
    const formattedValue = value < 10 ? `0${value}` : value;
    document.getElementById('time').innerHTML = `00:${formattedValue}`;
  };

  const finishGame = () => {
    clearInterval(timer);
    setScreen(2); // Set the screen to 2 to show the final score
  };

  const createRandomImage = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = getRandomNumber(100, 250);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    setImages(prevImages => [
      ...prevImages,
      { imageUrl, size, x, y, id: nanoid() },
    ]);
  };

  const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const handleStartClick = event => {
    event.preventDefault();
    setScreen(1);
    startGame();
  };

  const handleImageClick = id => {
    setScore(prevScore => prevScore + 1);
    setImages(prevImages => prevImages.filter(image => image.id !== id));
    createRandomImage();
  };

  const handleRstart = () => {
    setScreen(0);
    setScore(0);
    setTime(30);
    setTimer(null);
    setImages([]);
  };

  return (
    <div className="App">
      {screen === 0 && (
        <div className="screen">
          <h1>Aim Training</h1>
          <a href="#" className="start" id="start" onClick={handleStartClick}>
            START
          </a>
        </div>
      )}
      {screen === 1 && (
        <div className="screen">
          <h3>
            left <span id="time">00:30</span>
          </h3>
          <div className="board" id="board">
            {images.map(image => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt="target"
                className="image"
                style={{
                  width: `${image.size}px`,
                  height: `${image.size}px`,
                  top: `${image.y}px`,
                  left: `${image.x}px`,
                  position: 'absolute',
                }}
                onClick={() => handleImageClick(image.id)}
              />
            ))}
          </div>
        </div>
      )}
      {screen === 2 && (
        <div className="screen">
          <h1>
            Score: <span className="primary">{score}</span>
          </h1>
          <a href="#" className="start" id="start" onClick={handleRstart}>
            RESTART
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
