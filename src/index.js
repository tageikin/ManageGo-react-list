import "./styles.css";
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { fruits } from "./fruits";

/*
  fruits - an array of fruit. Every fruit has 'name' property. 

  Modity the following code so:
  1. '▼' button - moves a fruit below - so the 1st becomes 2nd; 2nd -> 1st; 
      the last one -> 1st; 
  2. '▲' has the opposite effect 2nd -> 1st;
      1st -> the last one
  3. In order to keep fruits clean, please avoid extra touches. 
     So when swap two items, try not to re-render the full list.
     For this there's a 'times' property in every fruit - it 
     shows how many times you read the 'name' prop. 
*/

const FruitComponent = (props) => {
  const { fruit, onMoveUp, onMoveDown, index } = props;

  return (
    <div className="item">
      <span>
        {fruit.name} ({fruit.times})
      </span>
      <button onClick={() => onMoveDown(index)}>▼</button>
      <button onClick={() => onMoveUp(index)}>▲</button>
    </div>
  );
};

const Fruit = React.memo(FruitComponent);

const App = (props) => {
  const { items } = props;
  const [newFruits, setFruits] = useState(items);

  const moveItemUp = useCallback((index) => {
    setFruits((prevFruits) => {
      prevFruits.splice(index - 1, 0, prevFruits.splice(index, 1)[0]);
      return [...prevFruits];
    });
  }, []);

  const moveItemDown = useCallback((index) => {
    setFruits((prevFruits) => {
      prevFruits.splice(index + 1, 0, prevFruits.splice(index, 1)[0]);
      return [...prevFruits];
    });
  }, []);

  return (
    <div className="App">
      {newFruits.map((fruit, index) => {
        return (
          <Fruit
            key={fruit}
            fruit={fruit}
            index={index}
            onMoveUp={moveItemUp}
            onMoveDown={moveItemDown}
          />
        );
      })}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App items={fruits} />, rootElement);
