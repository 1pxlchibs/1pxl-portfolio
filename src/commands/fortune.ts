const fortuneObj = {
  "message" : [
    [
      '"If you want the rainbow, you gotta put up with the rain!"'
    ],
    [
      '"Always do your best. What you plant now, you will harvest later."'
    ],
    [
      '"Do it scared."'
    ],
    [
      '"Be yourself, everyone else is already taken."'
    ],
    [
      '"No one is you and that is your superpower."'
    ],
    [
      '"Land is always on the mind of a flying bird."'
    ],
    [
      '"You will become great if you believe in yourself."'
    ],
    [
      '"The greatest risk is not taking one."'
    ],
    [
      '"Now is the time to try something new."'
    ],
    [
      '"Fortune favors the brave."'
    ],
    [
      '"When fear hurts you, conquer it and defeat it!"'
    ],
    [
      '"Do not pursue happiness - create it."'
    ],
    [
      '"Happiness is often a rebound from hard work. "'
    ],
    [
      '"Experience is the best teacher."'
    ],
    [
      '"Help! I am being held prisoner in a fortune cookie factory!!"'
    ],
  ],
}

export const createFortune = () : string[] => {
  const fortune : string[] = [];  
  const r = Math.floor(Math.random() * fortuneObj.message.length);

  fortuneObj.message[r].forEach((ele, idx) => {
    fortune.push(ele);
  });

  return fortune;
}
