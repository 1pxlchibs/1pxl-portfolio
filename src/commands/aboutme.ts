import command from '../../config.json' with {type: 'json'};

const createAboutMe = () : string[] => {
  const about : string[] = [];

  const SPACE = "&nbsp;";

  const EMAIL = "Email";
  const GITHUB = "Github";
  const LINKEDIN = "Linkedin";
  const BLUESKY = "Bluesky";
  
  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;   
  const github = `<i class='fa-brands fa-github'></i> ${GITHUB}`;
  const bluesky = `<i class="fa-solid fa-hashtag"></i> ${BLUESKY}`;
  const linkedin = `<i class='fa-brands fa-linkedin'></i> ${LINKEDIN}`;

  let string = "";

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
  about.push("<img src=./assets/portrait.png width=200>")
  about.push("Hi I'm Enrique. (aka 1pxlchibs) I am a developer from Montreal, with 9 years of coding experience.");
  about.push("I started making games when I was a teenager.  Since then it turned into my career focus!");
  about.push("I specialize in tool integration, backend systems and framework development. I also love game design, world building and storytelling!");
  about.push("I strive to create innovation in unique worlds and tell impactful stories through genre-bending media.");
  about.push("<br>");

  string += SPACE.repeat(2);
  string += email;
  string += SPACE.repeat(17 - EMAIL.length);
  string += `<a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += github;
  string += SPACE.repeat(17 - GITHUB.length);
  string += `<a target='_blank' href='https://github.com/${command.social.github}'>github/${command.social.github}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += bluesky;
  string += SPACE.repeat(17 - BLUESKY.length);  
  string += `<a target='_blank' href='https://bsky.app/profile/${command.social.bluesky}'>Bluesky/${command.social.bluesky}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += linkedin;
  string += SPACE.repeat(17 - LINKEDIN.length);  
  string += `<a target='_blank' href='https://www.linkedin.com/in/${command.social.linkedin}'>linkedin/${command.social.linkedin}</a>`;
  about.push(string);

  about.push("<br>");

  about.push("<br>");
  about.push("Type or press <a class='command' data-command='projects'>'projects'</a> to learn more about my projects.");
  about.push("Type or press <a class='command' data-command='resume'>'resume'</a> to get a download of my resume.");
  about.push("Type or press <a class='command' data-command='help'>'help'</a> for a list of all available commands.");
  about.push("<br>");
  return about
}

export const ABOUTME = createAboutMe();
