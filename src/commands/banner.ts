import command from '../../config.json' assert {type: 'json'};

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
  banner.push("Type <span class='command' data-command='aboutme'>'aboutme'</span> to learn more about me.");
  banner.push("Type <span class='command' data-command='projects'>'projects'</span> to learn more about my projects.");
  banner.push("Type <span class='command' data-command='resume'>'resume'</span> to get a download of my resume.");
  banner.push("Type <span class='command' data-command='help'>'help'</span> for a list of all available commands.");
  banner.push("<br>");

  return banner;
}

export const BANNER = createBanner();
