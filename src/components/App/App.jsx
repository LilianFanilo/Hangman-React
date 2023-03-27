import './App.css';
import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';

export const App = () => {
  const API_URL = "http://localhost:3001";
  const [word, setWord] = useState("");
  
  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "locale = en-EN",
    })
    .then((res) => res.json())
    .then((data) => {
      setWord(data.word);
    });
  }, []);
  
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [WrongGuesses, setWrongGuesses] = useState(0);
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  const maskedWord = word.replace(/\w/g, (letter) =>
    correctGuesses.includes(letter) ? letter : "_ "
  );

  const animate = () => {
      let drawMe = WrongGuesses ;
      drawArray[drawMe]();
  }
  
  const head = () => {
    const myStickman = document.getElementById("stickman");
    const context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  };

  const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    const myStickman = document.getElementById("stickman");
    const context = myStickman.getContext('2d');
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }

  const frame1 = () => {
    draw (0, 150, 150, 150);
  };

  const frame2 = () => {
    draw (10, 0, 10, 600);
  };

  const frame3 = () => {
    draw (0, 5, 70, 5);
  };

  const frame4 = () => {
    draw (60, 5, 60, 15);
  };

  const torso = () => {
    draw (60, 36, 60, 70);
  };
 
  const rightArm = () => {
    draw (60, 46, 100, 50);
  };
 
  const leftArm = () => {
    draw (60, 46, 20, 50);
  };
 
  const rightLeg = () => {
    draw (60, 70, 100, 100);
  };
 
  const leftLeg = () => {
    draw (60, 70, 20, 100);
  };

  const drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 

  return (
    <main>
      <h1>Le Pendu</h1>
      <p>{maskedWord}</p>
      <div className="keyboard">
        {alphabets.map((alphabet, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                if (word.includes(alphabet)) {
                  setCorrectGuesses([...correctGuesses, alphabet]);
                } else {
                  if (WrongGuesses < 11) {
                    setWrongGuesses(WrongGuesses + 1)
                    animate();
                  }
                }
              }}
            >
              {alphabet}
            </Button>
          );
        })}
      </div>
      <div>
      <canvas id="stickman">This Text will show if the Browser does NOT support HTML5 Canvas tag</canvas>
        <p>Erreurs : {WrongGuesses}/10 </p>
      </div>
      <a href='./'>New Game</a>
      {WrongGuesses === 10 && <p>You lose!</p>}
      {!maskedWord.includes("_") && <p>You won!</p>}
    </main>
  );
};
