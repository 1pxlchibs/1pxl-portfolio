import { ABOUTME } from "./commands/aboutme"
import { BANNER } from "./commands/banner";
import { DEFAULT } from "./commands/default";
import { HELP } from "./commands/help";
import { PROJECTS } from "./commands/projects";
import { RESUME } from './commands/resume';
import { createFortune } from './commands/fortune';
import { createHello } from './commands/hello';
import weather_codes from "./data/weather_codes.json";

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
const PORTFOLIO_WINDOW = document.getElementById("portfolio-window");
const TERMINAL_WINDOW = document.getElementById("terminal-window");
const BLOG_WINDOW = document.getElementById("blog-window");
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "about", "projects", "whoami", "banner", "clear"];
const HISTORY : string[] = [];
const SUDO_PASSWORD = "050823";

// #region Command Handlers
function executeCommand(command: string) {
  switch (command) {
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

const scrollToBottom = () => {
  if(!TERMINAL_WINDOW) return;
  TERMINAL_WINDOW.scrollTop = TERMINAL_WINDOW.scrollHeight;
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
  executeCommand(input)
}
// #endregion

// #region Command Output
function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item: string, idx: number) {
  let audio = new Audio("./assets/type_tone.mp3");

  setTimeout(() => {
    audio.play();
    if (!mutWriteLines) return;

    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    
    // Attach event listeners to command spans after inserting the new paragraph
    p.querySelectorAll(".command").forEach((element) => {
      element.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const command = target.getAttribute("data-command");
        if (command) {
          executeCommand(command);
        }
      });
    });

    scrollToBottom();
  }, 40 * idx);
}
// #endregion

// #region Easter Egg Handlers
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
  const main = TERMINAL_WINDOW;
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
// #endregion

// #region Terminal
function showTerminal(window: HTMLElement, func: Function = () => {}) {
  const main = window as HTMLElement;
  main.style.animation = "none";   // reset animation
  void main.offsetWidth;           // force reflow (important)
  main.style.animation = "base-window ease-out .2s forwards";
  setTimeout(func,5)
}

function hideTerminal(window: HTMLElement, func: Function = () => {}) {
  const main = window as HTMLElement;

  main.style.animation = "none";   // reset animation
  void main.offsetWidth;           // force reflow (important)
  main.style.animation = "base-window ease-out .2s reverse forwards";
  main.style.animationDirection = "reverse";

  setTimeout(func, 5);
}
// #endregion

// #region Other Utility Functions
function setTime() {
  const timeElement = document.getElementById("time");
  if (!timeElement) return;
  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Montreal",
  });

  timeElement.textContent = time + " - EST";
}
setInterval(() => {
  setTime();
}, 1000);

async function getForecast() {
    const url =
        "https://api.open-meteo.com/v1/forecast?" +
        "latitude=45.5088" +
        "&longitude=-73.5878" +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
        "&forecast_days=1" +
        "&timezone=America/New_York";

    const response = await fetch(url);
    const data = await response.json();

    const today = {
        maxTemp: data.daily.temperature_2m_max[0],
        minTemp: data.daily.temperature_2m_min[0],
        weatherCode: data.daily.weather_code[0],
    };

    const weatherElement = document.getElementById("weather");
    const temperatureElement = document.getElementById("temperature");

   if (weatherElement) {
        weatherElement.textContent = `${weather_codes[today.weatherCode as keyof typeof weather_codes].day.description}`;
    }
    if (temperatureElement) {
        temperatureElement.textContent = `${today.maxTemp}°C / ${today.minTemp}°C`;
    }
}

getForecast();
// #endregion

// Website initialization & Event Listeners
const initEventListeners = () => {
  setTime();
  
  const portfolioButton = document.querySelector("#portfolioBtn") as HTMLButtonElement;
  const portfolioExitButton = document.getElementById('portfolio-exit-button') as HTMLButtonElement;

  const terminalButton = document.querySelector("#terminalBtn") as HTMLButtonElement;
  const terminalExitButton = document.getElementById('exit-button') as HTMLButtonElement;

  const blogButton = document.querySelector("#blogBtn") as HTMLButtonElement;
  const blogExitButton = document.getElementById('blog-exit-button') as HTMLButtonElement;
  
  // Portfolio Button
  portfolioButton.addEventListener("click", () => {
    if (!PORTFOLIO_WINDOW) return;
    showTerminal(PORTFOLIO_WINDOW);
  });
  portfolioExitButton.addEventListener('click', () => {
    if (!PORTFOLIO_WINDOW) return;
    hideTerminal(PORTFOLIO_WINDOW);
  });

  // TerminalButton
  terminalButton.addEventListener("click", () => {
    if (!TERMINAL_WINDOW) return;
    showTerminal(TERMINAL_WINDOW,() => {
      writeLines(ABOUTME);
    
      USERINPUT.addEventListener('keydown', userInputHandler);
      PASSWORD_INPUT.addEventListener('keydown', userInputHandler);
    });
  });
  terminalExitButton.addEventListener('click', () => {
    if (!TERMINAL_WINDOW) return;
    hideTerminal(TERMINAL_WINDOW,() => {
      executeCommand("clear");
    });
  });

  // Blog Button
  blogButton.addEventListener("click", () => {
    if (!BLOG_WINDOW) return;
    showTerminal(BLOG_WINDOW);
  });
  blogExitButton.addEventListener('click', () => {
    if (!BLOG_WINDOW) return;
    hideTerminal(BLOG_WINDOW);
  });
  
  // Document Loaded Logic
  document.addEventListener("DOMContentLoaded", () => {
    //ROOT.style.setProperty('background-image',getRandomImage());
    const scanline = document.querySelector("scanline") as HTMLElement;

    if (scanline) {
      scanline.style.animationDuration = (Math.random() * 8) + "s";
    }

    if (!PORTFOLIO_WINDOW || !TERMINAL_WINDOW || !BLOG_WINDOW) return;
    // Draggable Logic
    const portfolioTitleBar = document.getElementById('portfolio-bars') as HTMLElement;
    const terminalTitleBar = document.getElementById('terminal-bars') as HTMLElement;
    const blogTitleBar = document.getElementById('blog-bars') as HTMLElement;
    
    
    // Center the terminal on load
    const portfolioWidth = PORTFOLIO_WINDOW.offsetWidth;
    const terminalWidth = TERMINAL_WINDOW.offsetWidth;
    const blogWidth = BLOG_WINDOW.offsetWidth;

    const portfolioCenterX = (window.innerWidth - portfolioWidth) / 2;
    const terminalCenterX = (window.innerWidth - terminalWidth) / 2;
    const blogCenterX = (window.innerWidth - blogWidth) / 2;

    PORTFOLIO_WINDOW.style.left = portfolioCenterX + 'px';
    TERMINAL_WINDOW.style.left = terminalCenterX + 'px';
    BLOG_WINDOW.style.left = blogCenterX + 'px';
    
    let isDraggingPortfolio = false;
    let isDraggingTerminal = false;
    let isDraggingBlog = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    portfolioTitleBar.addEventListener('mousedown', (e) => {  
      isDraggingPortfolio = true;
      const rect = PORTFOLIO_WINDOW.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      portfolioTitleBar.style.cursor = 'grabbing';

      PORTFOLIO_WINDOW.style.zIndex = '100';
      TERMINAL_WINDOW.style.zIndex = '99';
      BLOG_WINDOW.style.zIndex = '99';
    });

    terminalTitleBar.addEventListener('mousedown', (e) => {
      isDraggingTerminal = true;
      const rect = TERMINAL_WINDOW.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      terminalTitleBar.style.cursor = 'grabbing';

      TERMINAL_WINDOW.style.zIndex = '100';
      PORTFOLIO_WINDOW.style.zIndex = '99';
      BLOG_WINDOW.style.zIndex = '99';
    });

    blogTitleBar.addEventListener('mousedown', (e) => {
      isDraggingBlog = true;
      const rect = BLOG_WINDOW.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      blogTitleBar.style.cursor = 'grabbing';

      BLOG_WINDOW.style.zIndex = '100';
      TERMINAL_WINDOW.style.zIndex = '99';
      PORTFOLIO_WINDOW.style.zIndex = '99';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDraggingPortfolio) {
        let x = e.clientX - dragOffsetX;
        let y = e.clientY - dragOffsetY;

        x = Math.max(0, Math.min(x, window.innerWidth - PORTFOLIO_WINDOW.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - PORTFOLIO_WINDOW.offsetHeight));

        PORTFOLIO_WINDOW.style.left = x + 'px';
        PORTFOLIO_WINDOW.style.top = y + 'px';

        dragOffsetX = e.clientX - x;
        dragOffsetY = e.clientY - y;
      }

      if (isDraggingTerminal) {
        let x = e.clientX - dragOffsetX;
        let y = e.clientY - dragOffsetY;

        x = Math.max(0, Math.min(x, window.innerWidth - TERMINAL_WINDOW.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - TERMINAL_WINDOW.offsetHeight));

        TERMINAL_WINDOW.style.left = x + 'px';
        TERMINAL_WINDOW.style.top = y + 'px';

        dragOffsetX = e.clientX - x;
        dragOffsetY = e.clientY - y;
      }

      if (isDraggingBlog) {
        let x = e.clientX - dragOffsetX;
        let y = e.clientY - dragOffsetY;

        x = Math.max(0, Math.min(x, window.innerWidth - BLOG_WINDOW.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - BLOG_WINDOW.offsetHeight));

        BLOG_WINDOW.style.left = x + 'px';
        BLOG_WINDOW.style.top = y + 'px';

        dragOffsetX = e.clientX - x;
        dragOffsetY = e.clientY - y;
      }
    });

    document.addEventListener('mouseup', () => {
      isDraggingPortfolio = false;
      isDraggingTerminal = false;
      isDraggingBlog = false;
      portfolioTitleBar.style.cursor = 'grab';
      terminalTitleBar.style.cursor = 'grab';
      blogTitleBar.style.cursor = 'grab';
    });
  });

  // Focus on the input field
  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  console.log("%cPassword: 050823", "color: red; font-size: 20px;");
}

// Run the website initialization
initEventListeners();
