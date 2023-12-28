const helloObj = {
  "message" : [
    [
      "Hello visitor!",
    ],
    [
      "Hey!",
    ],
    [
      "Hello World!",
    ],
    [
      "01001000 01000101 01001100",
    ],
    [
      "Good day to you!",
    ],
    [
      "Bonjour!",
    ],
    [
      "Hola!",
    ],
    [
      "Heya!",
    ],
    [
      "Greetings human!he",
    ],
  ],
}

export const createHello = () : string[] => {
  const hello : string[] = [];  
  const r = Math.floor(Math.random() * helloObj.message.length);
  
  helloObj.message[r].forEach((ele, idx) => {
    hello.push(ele);
  });

  return hello
}
