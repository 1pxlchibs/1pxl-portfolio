import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { ABOUTME } from "./commands/aboutme"
import { DEFAULT } from "./commands/default";
import { PROJECTS } from "./commands/projects";
import { createHello } from './commands/hello';
import { createFortune } from './commands/fortune';
import { RESUME } from './commands/resume';

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const ROOT = document.documentElement;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "about", "projects", "whoami", "banner", "clear"];
const HISTORY : string[] = [];
const SUDO_PASSWORD = "050823";
const backgroundImages: string[] = [
  'url(./assets/background_1.png)',
  'url(./assets/background_2.png)',
  'url(./assets/background_3.png)',
  'url(./assets/background_4_1.png)',
  'url(./assets/background_5.png)',
  // Add more image URLs as needed
];

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.code;

  switch(key) {
    case "Enter":
    case "Go":
    case "Next":
      e.preventDefault()
      if (!isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `${PROMPT.innerHTML} ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {
  if(input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if(input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if(!TERMINAL || !WRITELINESCOPY) return
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["What made you think that was a good idea?", "<br>"]);
        }, 200)

        setTimeout(() => {
          writeLines(["Now everything is ruined.", "<br>"]);
        }, 1200)

        } else if (input === "rm -rf src" && bareMode) {
          writeLines(["there's no more src folder.", "<br>"])
        } else {
          if(bareMode) {
            writeLines(["What else are you trying to delete?", "<br>"])
          } else {
            writeLines(["<br>", "Directory not found.", "type <span class='command'>'ls'</span> for a list of directories.", "<br>"]);
          }
        } 
      } else {
        writeLines(["Permission not granted.", "<br>"]);
    }
    return
  }

  if(input.startsWith("more") && !bareMode) {
    if(input.toLowerCase().includes("neonblight") || input.toLowerCase().includes("nb") || input.toLowerCase().includes("neon blight")){
      writeLines(["<br>",
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/DV5VYDS-g1M?si=p8ZdhfhLfuuVPDc6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      "<br>",
      "Description:<br>Neon Blight is a top down bullet hell where you run a shop selling guns and relics you find in the outer border. <br>Fight through bosses and get access to the ultimate weapon!"])
      return
    }
    if(input.toLowerCase().includes("pxlui")){
      writeLines(["<br>","PXLUI was created because GameMaker does not have an intuitive UI system, if any at all.",
      "The framework supports sprites, text, buttons, checkboxes, inventory, and more.",
      "This library is free and open source, and has Scribble and INPUT dependancies. is the result of years of experience trying to create a UI solution.",
      "<br>"])
      return
    }
    writeLines(["Please specify the project name.", "<br>"])
    return
  }

  if(input.startsWith("spotify") && !bareMode) {
    writeLines(["<br>","My spotify playlist to get in the zone!",
    "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/playlist/7B1IDMuwobKOAIPqd9bgTp?utm_source=generator' width='40%' height='352' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
    "<br>"])
    return
  }

  switch(input) {
    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      })
      break;
    case 'banner':
      if(bareMode) {
        writeLines(["WebShell v1.0.0", "<br>"])
        break;
      }
      writeLines(BANNER);
      break;
    case 'help':
      if(bareMode) {
        writeLines(["maybe restarting your browser will fix this.", "<br>"])
        break;
      }
      writeLines(HELP);
      break;
    case 'hello':      
      if(bareMode) {
        writeLines(["guest", "<br>"])
        break;
      }
      writeLines(createHello());
      break;
    case 'fortune':      
      if(bareMode) {
        writeLines(["guest", "<br>"])
        break;
      }
      writeLines(["*You break open the cookie*"])
      setTimeout(() => {
        writeLines(["The fortune cookie reads:","<br>"]);
        }, 600)
      setTimeout(() => {
      writeLines(createFortune());
      }, 1000)
      break;
    case 'aboutme':
      if(bareMode) {
        writeLines(["Nothing to see here.", "<br>"])
        break;
      }
      writeLines(ABOUTME);
      break;
    case 'projects':
      if(bareMode) {
        writeLines(["I don't want you to break the other projects.", "<br>"])
        break;
      }
      writeLines(PROJECTS);
      break;
    case "resume":
      writeLines(RESUME);
    break;

    case 'linkedin':
      //add stuff here
      break;
    case 'github':
      //add stuff here
      break;
    case 'email':
      //add stuff here
      break;
    case 'rm -rf':
      if (bareMode) {
        writeLines(["don't try again.", "<br>"])
        break;
      }

      if (isSudo) {
        writeLines(["Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>", "<br>"]);
      } else {
        writeLines(["Permission not granted.", "<br>"])
      }
        break;
    case 'sudo':
      if(bareMode) {
        writeLines(["no.", "<br>"])
        break;
      }
      if(!PASSWORD) return
      isPasswordInput = true;
      USERINPUT.disabled = true;

      if(INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);

      break;
    case 'ls':
      if(bareMode) {
        writeLines(["", "<br>"])
        break;
      }

      if (isSudo) {
        writeLines(["src", "<br>"]);
      } else {
        writeLines(["Permission not granted.", "<br>"]);
      }
      break;
    default:
      if(bareMode) {
        writeLines(["type 'help'", "<br>"])
        break;
      }

      writeLines(DEFAULT);
      break;
  }  
}

function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  let audio = new Audio("./assets/type_tone.mp3");
  setTimeout(() => {
    audio.play();
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}

function revertPasswordChanges() {
    if (!INPUT_HIDDEN || !PASSWORD) return
    PASSWORD_INPUT.value = "";
    USERINPUT.disabled = false;
    INPUT_HIDDEN.style.display = "block";
    PASSWORD.style.display = "none";
    isPasswordInput = false;

    setTimeout(() => {
      USERINPUT.focus();
    }, 200)
}

function passwordHandler() {
  if (passwordCounter === 2) {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return
    writeLines(["<br>", "INCORRECT PASSWORD.", "PERMISSION NOT GRANTED.", "<br>"])
    revertPasswordChanges();
    passwordCounter = 0;
    return
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    if (!mutWriteLines || !mutWriteLines.parentNode) return
    writeLines(["<br>", "PERMISSION GRANTED.", "Try <span class='command'>'rm -rf'</span>", "<br>"])
    revertPasswordChanges();
    isSudo = true;
    return
  } else {
    PASSWORD_INPUT.value = "";
    passwordCounter++;
  }
}

function easterEggStyles() {   
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return
  bars.innerHTML = "";
  bars.remove()

  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "red";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "red";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "red";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";

}

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}

const initEventListeners = () => {
  window.addEventListener('load', () => {
    ROOT.style.setProperty('background-image',getRandomImage());
    setTimeout(() => {
      writeLines(BANNER);
    
      USERINPUT.addEventListener('keydown', userInputHandler);
      PASSWORD_INPUT.addEventListener('keydown', userInputHandler);
  
      
    },2000)
    
  });
  
  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  console.log("%cPassword: 050823", "color: red; font-size: 20px;");

  $(document).ready(function(){
    $('scanline').css({'animation-duration' : (Math.random()* 8) + 's'})

    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;
    
    $(document).mousemove(function(e){
      mouseX = e.pageX - 10;
      mouseY = e.pageY - 10; 
    });
      
    setInterval(function(){
      xp += ((mouseX - xp)/12);
      yp += ((mouseY - yp)/12);
      $("#circle").css({left: xp +'px', top: yp +'px'});
      xp += ((mouseX - xp)/9);
      yp += ((mouseY - yp)/9);
      $("#circle2").css({left: xp + 3 +'px', top: yp + 3 +'px'});
    }, 20);

  });

}

initEventListeners();
