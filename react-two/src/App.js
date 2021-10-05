import React, { useState } from "react";
import Slider from "./Slider";
import SliderData from "./SliderData";
import SliderDataTwo from "./SliderDataTwo";

export default function App() {
  const [fontSize, setFontSize] = useState(16);

  return (
    <>
      <div className="container">
        <div className="exampleParagraph">
          <div className="fontButtons">
            <button
              className="fontButton"
              onClick={() => setFontSize(fontSize + 2)}
            >
              bigger +
            </button>
            <button
              className="fontButton"
              onClick={() => setFontSize(fontSize - 2)}
            >
              smaller -
            </button>
          </div>
          <p
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Cupcake ipsum dolor sit amet ice cream. I love candy biscuit sweet
            roll biscuit. Jelly I love liquorice chupa chups bonbon. Tootsie
            roll jelly-o sesame snaps cake dragée liquorice muffin toffee
            pastry. Cupcake cheesecake biscuit I love danish dragée donut muffin
            apple pie. Donut cake I love apple pie cookie apple pie powder. Pie
            danish dragée sesame snaps candy canes.
          </p>
        </div>
        <Slider slides={SliderData} variable={SliderData} />
        <Slider slides={SliderDataTwo} variable={SliderDataTwo} />
      </div>
    </>
  );
}
