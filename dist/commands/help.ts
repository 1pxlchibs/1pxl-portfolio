const helpObj = {
  "commands": [
    [
      "'hello'",
      "Greetings.",
      ],
    [
      "'aboutme'",
      "Who am I?",
    ],
    [
      "'projects'",
      "Maybe there's something interesting."
    ],
    [
      "'resume'",
      "Get a copy of my resume."
    ],
    [
      "'fortune'",
      "A tasty cookie comes with it."
    ],
    [
      "'spotify'",
      "Sharing my spotify playlists!"
    ],
    [
      "'banner'",
      "Display the banner."
    ],
    [
      "'sudo'",
      "???"
    ],
    [
      "'clear'",
      "Clear the terminal."
    ]
  ],
}

const createHelp = () : string[] => {
  const help : string[] = []
  help.push("<br>")

  helpObj.commands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let string = "";
    string += SPACE.repeat(2);
    string += "<span class='command'>";
    string += ele[0];
    string += "</span>";
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    help.push(string);
  })

  help.push("<br>");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push("Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands.");
  help.push("<br>");
  return help
}

export const HELP = createHelp();
