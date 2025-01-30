(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();const _=[" ██╗██████╗ ██╗  ██╗██╗      ██████╗██╗  ██╗██╗██████╗ ███████╗","███║██╔══██╗╚██╗██╔╝██║     ██╔════╝██║  ██║██║██╔══██╗██╔════╝","╚██║██████╔╝ ╚███╔╝ ██║     ██║     ███████║██║██████╔╝███████╗"," ██║██╔═══╝  ██╔██╗ ██║     ██║     ██╔══██║██║██╔══██╗╚════██║"," ██║██║     ██╔╝ ██╗███████╗╚██████╗██║  ██║██║██████╔╝███████║"," ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝"],G={email:"enriquepoirier@gmail.com",github:"1pxlchibs",linkedin:"Enrique Poirier",xtwitter:"1pxlchibs",bluesky:"1pxlchibs.bsky.social"},F=[["Neon Blight","Top down cyberpunk bullet hell shooter","https://store.steampowered.com/app/1360660/Neon_Blight/?curator_clanid=4777282"],["PXLUI","A gml library built for the creation of UI systems.","https://github.com/1pxlchibs/PXLUI"],["████████","Unannounced game project set in the Neon Blight universe.",""]],u={ascii:_,social:G,projects:F},q=()=>{const e=[],t="&nbsp;",s="Email",r="Github",n="Linkedin",l="X",h="Bluesky",E=`<i class='fa-solid fa-envelope'></i> ${s}`,C=`<i class='fa-brands fa-github'></i> ${r}`,U=`<i class="fa-solid fa-hashtag"></i> ${h}`,R=`<i class='fa-brands fa-linkedin'></i> ${n}`,W=`<i class="fa-brands fa-x-twitter"></i> ${l}`;let a="";return e.push("<br>"),e.push("<img src=./assets/portrait.png width=200>"),e.push("Hi I'm Enrique. (aka 1pxlchibs) I am a self-taught dev from Montreal, with 5 years of experience making games."),e.push("I began my game development journey at 17 right after highschool.  Since then it turned into my career focus!"),e.push("I specialize in tool integration, backend systems and framework development. I also love game design, world building and storytelling!"),e.push("I strive to create innovation in unique worlds and tell impactful stories through genre-bending media."),e.push("<br>"),e.push("I've released one commercial solo dev project in the summer of 2022 under the publishing of Freedom Games. I am now currently building a team and working on a new ambitious project."),a+=t.repeat(2),a+=E,a+=t.repeat(17-s.length),a+=`<a target='_blank' href='mailto:${u.social.email}'>${u.social.email}</a>`,e.push(a),a="",a+=t.repeat(2),a+=C,a+=t.repeat(17-r.length),a+=`<a target='_blank' href='https://github.com/${u.social.github}'>github/${u.social.github}</a>`,e.push(a),a="",a+=t.repeat(2),a+=U,a+=t.repeat(17-h.length),a+=`<a target='_blank' href='https://bsky.app/profile/${u.social.bluesky}'>Bluesky/${u.social.bluesky}</a>`,e.push(a),a="",a+=t.repeat(2),a+=R,a+=t.repeat(17-n.length),a+=`<a target='_blank' href='https://www.linkedin.com/in/${u.social.linkedin}'>linkedin/${u.social.linkedin}</a>`,e.push(a),a="",a+=t.repeat(2),a+=W,a+=t.repeat(17-l.length),a+=`<a target='_blank' href='https://twitter.com/${u.social.xtwitter}'>Twitter/${u.social.xtwitter}</a>`,e.push(a),e.push("<br>"),e},Y=q(),K=()=>{const e=[];return e.push("<br>"),u.ascii.forEach(t=>{let s="";for(let r=0;r<t.length;r++)s+=t[r]===" "?"&nbsp;":t[r];e.push(`<pre>${s}</pre>`)}),e.push("<br>"),e.push("Welcome to 5 os v1.0.0"),e.push("Type <span class='command' data-command='aboutme'>'aboutme'</span> to learn more about me."),e.push("Type <span class='command' data-command='projects'>'projects'</span> to learn more about my projects."),e.push("Type <span class='command' data-command='resume'>'resume'</span> to get a download of my resume."),e.push("Type <span class='command' data-command='help'>'help'</span> for a list of all available commands."),e.push("<br>"),e},B=K(),X=()=>{const e=["<br>","COMMAND NOT FOUND","Type <span class='command'>'help'</span> to get started.","<br>"],t=[];return e.forEach(s=>{t.push(s)}),t},z=X(),V={commands:[["'hello'","Greetings."],["'aboutme'","Who am I?"],["'projects'","Maybe there's something interesting."],["'resume'","Get a copy of my resume."],["'fortune'","A tasty cookie comes with it."],["'spotify'","Sharing my spotify playlists!"],["'banner'","Display the banner."],["'sudo'","???"],["'clear'","Clear the terminal."]]},J=()=>{const e=[];return e.push("<br>"),V.commands.forEach(t=>{const s="&nbsp;";let r="";r+=s.repeat(2),r+="<span class='command'",r+="data-command=",r+=t[0],r+=">",r+=t[0],r+="</span>",r+=s.repeat(17-t[0].length),r+=t[1],e.push(r)}),e.push("<br>"),e.push("Press <span class='keys'>[Tab]</span> for auto completion."),e.push("Press <span class='keys'>[Esc]</span> to clear the input line."),e.push("Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands."),e.push("<br>"),e},Z=J(),Q=()=>{let e="";const t=[],s=`${u.projects.length} File(s)`,r="&nbsp;";return t.push("<br>"),u.projects.forEach(n=>{let l=`<a href="${n[2]}" target="_blank">${n[0]}</a>`;e+=r.repeat(2),e+=l,e+=r.repeat(17-n[0].length),e+=n[1],t.push(e),e=""}),t.push("<br>"),t.push(s),t.push("To learn more about a project type <span class='command'>'more &lt;project name&gt;'</span>"),t.push("<br>"),t},ee=Q(),te=()=>{const e=["<br>",'<a href="./assets/EnriquePoirier-GeneralistProgrammer.pdf" download>Download my resume by clicking here!</a>',"<br>"],t=[];return e.forEach(s=>{t.push(s)}),t},re=te(),P={message:[['"If you want the rainbow, you gotta put up with the rain!"'],['"Always do your best. What you plant now, you will harvest later."'],['"Do it scared."'],['"Be yourself, everyone else is already taken."'],['"No one is you and that is your superpower."'],['"Land is always on the mind of a flying bird."'],['"You will become great if you believe in yourself."'],['"The greatest risk is not taking one."'],['"Now is the time to try something new."'],['"Fortune favors the brave."'],['"When fear hurts you, conquer it and defeat it!"'],['"Do not pursue happiness - create it."'],['"Happiness is often a rebound from hard work. "'],['"Experience is the best teacher."'],['"Help! I am being held prisoner in a fortune cookie factory!!"']]},se=()=>{const e=[],t=Math.floor(Math.random()*P.message.length);return P.message[t].forEach(s=>{e.push(s)}),e},N={message:[["Hello visitor!"],["Hey!"],["Hello World!"],["01001000 01000101 01001100"],["Good day to you!"],["Bonjour!"],["Hola!"],["Heya!"],["Greetings human!"]]},oe=()=>{const e=[],t=Math.floor(Math.random()*N.message.length);return N.message[t].forEach(s=>{e.push(s)}),e};let p=document.getElementById("write-lines"),m=0,L="",d,I=!1,v=!1,T=0,c=!1;const b=p,ne=document.documentElement,g=document.getElementById("terminal"),i=document.getElementById("user-input"),y=document.getElementById("input-hidden"),w=document.getElementById("password-input"),k=document.getElementById("password-field"),M=document.getElementById("prompt"),ae=["help","about","projects","whoami","banner","clear"],f=[],ie="050823",S=["url(./assets/background_1.png)","url(./assets/background_2.png)","url(./assets/background_3.png)","url(./assets/background_4_1.png)","url(./assets/background_5.png)"];function j(e){switch(e){case"clear":setTimeout(()=>{!g||!b||(g.innerHTML="",g.appendChild(b),p=b)});break;case"banner":if(c){o(["WebShell v1.0.0","<br>"]);break}o(B);break;case"help":if(c){o(["maybe restarting your browser will fix this.","<br>"]);break}o(Z);break;case"hello":if(c){o(["guest","<br>"]);break}o(oe());break;case"fortune":if(c){o(["guest","<br>"]);break}o(["*You break open the cookie*"]),setTimeout(()=>{o(["The fortune cookie reads:","<br>"])},600),setTimeout(()=>{o(se())},1e3);break;case"aboutme":if(c){o(["Nothing to see here.","<br>"]);break}o(Y);break;case"projects":if(c){o(["I don't want you to break the other projects.","<br>"]);break}o(ee);break;case"resume":o(re);break;case"linkedin":break;case"github":break;case"email":break;case"rm -rf":if(c){o(["don't try again.","<br>"]);break}o(I?["Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>","<br>"]:["Permission not granted.","<br>"]);break;case"sudo":if(c){o(["no.","<br>"]);break}if(!w)return;v=!0,i.disabled=!0,y&&(y.style.display="none"),w.style.display="block",setTimeout(()=>{k.focus()},100);break;case"ls":if(c){o(["","<br>"]);break}o(I?["src","<br>"]:["Permission not granted.","<br>"]);break;default:if(c){o(["type 'help'","<br>"]);break}o(z);break}}const H=()=>{const e=document.getElementById("main");e&&(e.scrollTop=e.scrollHeight)};function A(e){const t=e.code;switch(t){case"Enter":case"Go":case"Next":e.preventDefault(),v?pe():le(),H();break;case"Escape":i.value="";break;case"ArrowUp":x(t),e.preventDefault();break;case"ArrowDown":x(t);break;case"Tab":ce(),e.preventDefault();break}}function le(){if(!p||!M)return;const e="";let t;if(d=i.value,c?t=d:t=`<span class='output'>${d}</span>`,f.push(d),m=f.length,d==="clear"){D(d.toLowerCase().trim()),i.value=e,d=e;return}const s=document.createElement("div");s.innerHTML=`${M.innerHTML} ${t}`,p.parentNode&&p.parentNode.insertBefore(s,p),d.trim().length!==0&&D(d.toLowerCase().trim()),i.value=e,d=e}function ce(){let e=i.value;for(const t of ae)if(t.startsWith(e)){i.value=t;return}}function x(e){switch(e){case"ArrowDown":m!==f.length&&(m+=1,i.value=f[m],m===f.length&&(i.value=L));break;case"ArrowUp":m===f.length&&(L=i.value),m!==0&&(m-=1,i.value=f[m]);break}}function D(e){if(e.startsWith("rm -rf")&&e.trim()!=="rm -rf"){I?e==="rm -rf src"&&!c?(c=!0,setTimeout(()=>{!g||!b||(g.innerHTML="",g.appendChild(b),p=b)}),de(),setTimeout(()=>{o(["What made you think that was a good idea?","<br>"])},200),setTimeout(()=>{o(["Now everything is ruined.","<br>"])},1200)):o(e==="rm -rf src"&&c?["there's no more src folder.","<br>"]:c?["What else are you trying to delete?","<br>"]:["<br>","Directory not found.","type <span class='command'>'ls'</span> for a list of directories.","<br>"]):o(["Permission not granted.","<br>"]);return}if(e.startsWith("more")&&!c){if(e.toLowerCase().includes("neonblight")||e.toLowerCase().includes("nb")||e.toLowerCase().includes("neon blight")){o(["<br>",'<iframe width="560" height="315" src="https://www.youtube.com/embed/DV5VYDS-g1M?si=p8ZdhfhLfuuVPDc6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',"<br>","Description:<br>Neon Blight is a top down bullet hell where you run a shop selling guns and relics you find in the outer border. <br>Fight through bosses and get access to the ultimate weapon!"]);return}if(e.toLowerCase().includes("pxlui")){o(["<br>","PXLUI was created because GameMaker does not have an intuitive UI system, if any at all.","The framework supports sprites, text, buttons, checkboxes, inventory, and more.","This library is free and open source, and has Scribble and INPUT dependancies. is the result of years of experience trying to create a UI solution.","<br>"]);return}o(["Please specify the project name.","<br>"]);return}if(e.startsWith("spotify")&&!c){o(["<br>","My spotify playlist to get in the zone!","<iframe style='border-radius:12px' src='https://open.spotify.com/embed/playlist/7B1IDMuwobKOAIPqd9bgTp?utm_source=generator' width='40%' height='352' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>","<br>"]);return}j(e)}function o(e){e.forEach((t,s)=>{ue(t,s)})}function ue(e,t){let s=new Audio("./assets/type_tone.mp3");setTimeout(()=>{if(s.play(),!p)return;const r=document.createElement("p");r.innerHTML=e,p.parentNode.insertBefore(r,p),r.querySelectorAll(".command").forEach(n=>{n.addEventListener("click",l=>{const E=l.target.getAttribute("data-command");E&&j(E)})}),H()},40*t)}function O(){!y||!w||(k.value="",i.disabled=!1,y.style.display="block",w.style.display="none",v=!1,setTimeout(()=>{i.focus()},200))}function pe(){if(T===2){if(!y||!p||!w)return;o(["<br>","INCORRECT PASSWORD.","PERMISSION NOT GRANTED.","<br>"]),O(),T=0;return}if(k.value===ie){if(!p||!p.parentNode)return;o(["<br>","PERMISSION GRANTED.","Try <span class='command'>'rm -rf'</span>","<br>"]),O(),I=!0;return}else k.value="",T++}function de(){const e=document.getElementById("bars"),t=document.body,s=document.getElementById("main"),r=document.getElementsByTagName("span");if(e){e.innerHTML="",e.remove(),s&&(s.style.border="none"),t.style.backgroundColor="black",t.style.fontFamily="VT323, monospace",t.style.fontSize="20px",t.style.color="red";for(let n=0;n<r.length;n++)r[n].style.color="red";i.style.backgroundColor="black",i.style.color="red",i.style.fontFamily="VT323, monospace",i.style.fontSize="20px"}}function me(){const e=Math.floor(Math.random()*S.length);return S[e]}const he=()=>{window.addEventListener("load",()=>{ne.style.setProperty("background-image",me()),setTimeout(()=>{o(B),i.addEventListener("keydown",A),k.addEventListener("keydown",A)},2e3)}),window.addEventListener("click",()=>{i.focus()}),console.log("%cPassword: 050823","color: red; font-size: 20px;"),$(document).ready(function(){$("scanline").css({"animation-duration":Math.random()*8+"s"});var e=0,t=0,s=0,r=0;$(document).mousemove(function(n){e=n.pageX-10,t=n.pageY-10}),setInterval(function(){s+=(e-s)/12,r+=(t-r)/12,$("#circle").css({left:s+"px",top:r+"px"}),s+=(e-s)/9,r+=(t-r)/9,$("#circle2").css({left:s+3+"px",top:r+3+"px"})},20)})};he();
