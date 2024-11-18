import React from "react";
import WORLD_MAP from "../ImageData/Images/world-map.jpg";
import "./Card.css";

const Card = (props) => {
    const { card, handleChoice, flipped, disabled } = props;

    const handleClick = ()  => {  // for clicking the card
        if(!disabled) { // only executes if card is not disabled --- still considered in game 
            handleChoice(card);  
        }
    };

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped": ""}>
                <img src={card.src} alt="card front" className="front"/>  // both the images will be used for flip logic defined in css file
                <img src={WORLD_MAP} 
                    alt="card back"
                    className="back"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Card;