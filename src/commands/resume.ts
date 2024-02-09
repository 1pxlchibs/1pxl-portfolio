const createResume = () : string[] => {
    const defaultMsgArr = [
      "<br>",
      '<a href="../res/Enrique Poirier-GeneratlistProgrammer.pdf" download>Download my resume by clicking here!</a>',
      "<br>"
    ]  
    
    const defaultMsg : string[] = [];
    
    defaultMsgArr.forEach((ele) => {
      defaultMsg.push(ele);
    })
  
    return defaultMsg;
  }
  
  export const RESUME = createResume();
  