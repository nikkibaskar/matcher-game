import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card/Card";
import Header from "./Header/Header";
import { cardImages } from "./ImageData/ImageData";

function App() {
  const [time, setTime] = useState(0);  // time stateVariable
  const [isRunning, setIsRunning] = useState(false);  // to check if time is running. Initially time will not be running.
  const [fastestTime, setFastestTime] = useState(null); // to record fastest time.
  const [cards, setCards] = useState([]);  // state for cards. Initially array will be empty.

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);  // once card is matched -- then flipping of card is disabled from the game

  const handleChoice = (card) => {  // for clicking --- either choice one or two based on logic -- choice will be stored
    if(isRunning) {
      choiceOne ? setChoiceTwo(card): setChoiceOne(card);
    }
  };

  function reset() {  // to reset the choices
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  const shuffleCards = () => {  // a function
    const shuffledCards = [...cardImages, ...cardImages]  // constant will hold data from a stream of methods. -- we double the array and store the entire copy in a new array
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));  // each cardImage is represented here with "card" object and setted up with a random id value

    setCards(shuffledCards);  // the random card images with ids are stored in the cards stateVariable using setCards method.
  };

  useEffect(() => {
    shuffleCards();
  }, []);  // shuffle cards function will be called only once when component is rendered. The first render -- is when we start the game


  useEffect(() => {  // to count the time.
    let interval;

    if (isRunning) {  // if isRunning is true -- will increase the timer by 1s with an interval of 1 second
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);  // stops and clears the timer increments.
  }, [isRunning]);  // hook will be called each time the isRunning stateVariable changes.

  useEffect(() => {  // works only if there is changes in choice one or two
    if(choiceOne && choiceTwo) {  // check if both choices are not null
      setDisabled(true);  // flipping is disabled
      if(choiceOne.src === choiceTwo.src) {  // if card images match ----
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) => {
            if(card.src === choiceOne.src) {  // since both choice one and two are equal in above line -- we are fetching from list of card images and setting matching condition as true
              return {...card, matched: true};
            } else {
              return card; // else no change to card object in imageData.js file.
            }
          });

          if(updatedCards.every((card) => card.matched)) {  // if all cards are matched -- timer is re-started
            handleRestart();
          }

          return updatedCards;
        });
        
        reset();
      } else {
        setTimeout(() => reset(), 500);  // if no match from line 57-- we reset the choices and the flipping diables stateVariables.
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleStart = () => {  // we start the game from here
    setIsRunning(true);  // runs the useEffect  by incrementing the timer
  };

  const handleRestart = () => {
    if (isRunning) {
      setIsRunning(false);  // if restart -button is clicked --- then game is stopped here.
      if (fastestTime === null || fastestTime > time) {  // logic to find fastest time. If currentTime is smaller than fastestTime
        setFastestTime(time);
      }
      setTime(0); // after setting fastestTime --- we also set the time stateVariable to '0';
      shuffleCards(); // cards will be shuffled once the game is re-started
  };

  return (
    <div className="App">
      <Header
        handleRestart={handleRestart}  // start and re-starts are sent to header.js file where the buttons are declarad.
        handleStart={handleStart}
        time={time}
        fastestTime={fastestTime}
      />
      <div className="card-grid">
        {
          cards.map((card) => (  // each element from cards stateVariable is sent as card object into "Card" component where front and back images are assigned.
            <div key={card.id}> // represents each card
              <Card 
                card={card} // each cards stateVariable is sent through separate "card" object as props
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}  // true for any of the mentioned condition being staisfied.. else false
                disabled={disabled}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
}

export default App;