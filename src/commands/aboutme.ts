import command from '../../config.json' with {type: 'json'};

const createAboutMe = () : string[] => {
  const about : string[] = [];

  about.push("<br>");
  command.ascii.forEach((ele) => {
    let bannerString = "";
    // Convert spaces to `&nbsp;` for ASCII art
    for (let i = 0; i < ele.length; i++) {
      bannerString += ele[i] === " " ? "&nbsp;" : ele[i];
    }
    
    about.push(`<pre>${bannerString}</pre>`);
  });
  about.push("<br>");

  about.push("<br>");
  about.push("Type or press <a class='command' data-command='projects'>'projects'</a> to learn more about my projects.");
  about.push("Type or press <a class='command' data-command='resume'>'resume'</a> to get a download of my resume.");
  about.push("Type or press <a class='command' data-command='help'>'help'</a> for a list of all available commands.");
  about.push("<br>");
  return about
}

export const ABOUTME = createAboutMe();
