import command from '../../config.json' assert {type: 'json'};

const createAboutMe = () : string[] => {
  const about : string[] = [];

  const SPACE = "&nbsp;";

  const EMAIL = "Email";
  const GITHUB = "Github";
  const LINKEDIN = "Linkedin";
  const XTWITTER = "X";
  const BLUESKY = "Bluesky";
  
  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;   
  const github = `<i class='fa-brands fa-github'></i> ${GITHUB}`;
  const bluesky = `<i class="fa-solid fa-hashtag"></i> ${BLUESKY}`;
  const linkedin = `<i class='fa-brands fa-linkedin'></i> ${LINKEDIN}`;
  const xtwitter = `<i class="fa-brands fa-x-twitter"></i> ${XTWITTER}`;

  let string = "";

  about.push("<br>");
  about.push("<img src=../res/portrait.png width=200>")
  about.push("Hi I'm Enrique. (aka 1pxlchibs) I am a self-taught dev from Montreal, with 5 years of experience making games.");
  about.push("I began my game development journey at 17 right after highschool.  Since then it turned into my career focus!");
  about.push("I specialize in tool integration, backend systems and framework development. I also love game design, world building and storytelling!");
  about.push("I strive to create innovation in unique worlds and tell impactful stories through genre-bending media.");
  about.push("<br>");
  about.push("I've released one commercial solo dev project in the summer of 2022 under the publishing of Freedom Games. I am now currently building a team and working on a new ambitious project.");

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

  string = '';
  string += SPACE.repeat(2);
  string += xtwitter;
  string += SPACE.repeat(17 - XTWITTER.length);  
  string += `<a target='_blank' href='https://twitter.com/${command.social.xtwitter}'>Twitter/${command.social.xtwitter}</a>`;
  about.push(string);

  about.push("<br>");
  return about
}

export const ABOUTME = createAboutMe();
