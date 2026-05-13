import command from '../../config.json' with {type: 'json'};

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push("<br>");
  
  command.ascii.forEach((ele) => {
    let bannerString = "";
    // Convert spaces to `&nbsp;` for ASCII art
    for (let i = 0; i < ele.length; i++) {
      bannerString += ele[i] === " " ? "&nbsp;" : ele[i];
    }
    
    banner.push(`<pre>${bannerString}</pre>`);
  });

  banner.push("<br>");
  banner.push("Welcome to 5 os v1.0.0");
  banner.push("Type or press <a class='command' data-command='aboutme'>'aboutme'</a> to learn more about me.");
  banner.push("Type or press <a class='command' data-command='projects'>'projects'</a> to learn more about my projects.");
  banner.push("Type or press <a class='command' data-command='resume'>'resume'</a> to get a download of my resume.");
  banner.push("Type or press <a class='command' data-command='help'>'help'</a> for a list of all available commands.");
  banner.push("<br>");

  return banner;
}

export const BANNER = createBanner();
