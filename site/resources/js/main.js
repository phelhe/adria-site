//Henry Phelps website for Adria Duncan

//PORTFOLIO IDEA
//have one LONG div horizontally with overflowx set to scroll
//hide the scroll bar
//turn off scrolling
//then have arrows that cause it to scoll from pic to pic

//contact idea:
//when you click contact have a div that shadows the screen
//(like the shadow for when you pick on a class in my wb apps project)
//then on top of that a small little window that has the methods of contact
//and an x button to make it go away
//then the renderContact thing just has to make that appear
//when you click the x, remove the whole thing...

let buttonDivs = [];

let imagesDiv = [];
let part = -1;

//change this onload to renderenter or something...
window.onload = renderPage();

let splashimagesrendered = false;

//parallax??
// what should we do when scrolling occurs
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function calcParallax(tileheight, speedratio, scrollposition) {
  //console.log("tileheight: " + tileheight);
  //console.log("speedradio: " + speedratio);
  //console.log("scrollposition: " + scrollposition);
  //console.log("result (tileheight) - ((scrollposition/speedratio) % (tileheight+1)): " + ((tileheight) - ((scrollposition / speedratio) )));
  //console.log("-------------");
  //return ((tileheight) - ((scrollposition / speedratio)));
  return -scrollposition * .08 - tileheight/speedratio;
}

var runOnScroll =  function(evt) {

  var level1bottom = offset(document.getElementById('level1')).top;
  var level2bottom = offset(document.getElementById('level2')).top;
  var top  = window.pageYOffset || document.documentElement.scrollTop;
  var body = document.getElementById('portfolioholder');
  if(top>level1bottom && top <level2bottom && part!=1){
    console.log("part 1");
    //body.style.background = "url(resources/css/images/homepage/para2smaller.jpg)";
    part = 1;
  }
  else if(top > level2bottom && part!=2){
    console.log("part2");
    //body.style.background = "url(resources/css/images/homepage/para3smaller.jpg)";
    part = 2;
  }
  else if(top < level1bottom && part !=0){
    console.log("part0");
    part = 0;
    //body.style.background = "url(resources/css/images/homepage/para1smaller.jpg)";
    //body.style.backgroundRepeat = "no-repeat";
  }

  var posX = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : window.pageXOffset;
  var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;

  var foregroundparallax = calcParallax(10,2,posY);
  if(part==0){
    body = document.getElementById('para1');
    body.style.backgroundPosition = "0px " + foregroundparallax + "px";
  }
  else if(part==1){
    body = document.getElementById('para2');
    body.style.backgroundPosition = "0px " + foregroundparallax + "px";
  }
  else{
    body = document.getElementById('para3');
    body.style.backgroundPosition = "0px " + foregroundparallax + "px";
  }
};

// grab elements as array, rather than as NodeList
var elements = document.querySelectorAll('body *');
elements = Array.prototype.slice.call(elements);

// and then make each element do something on scroll
elements.forEach(function(element) {
  window.addEventListener("scroll", runOnScroll);
});


window.onresize = adjustWindow();

//use this to check if the height is a certain size, then change the top menu to something simpler
function adjustWindow(){
  console.log('adjusting...');
  //var dropdown = document.getElementById('dropDownMenu');
  //var temp = document.getElementById('navbuttonPORTFOLIO');
  //var rect = temp.getBoundingClientRect();
  //dropdown.style.left = rect.left + "px";
}

//add one more view: enter page
//enter page will just have her name and a button that says enter
function view(page){
  part = -1;
  switch(page){
    case 'HOME':
      renderHome();
      //myScroll(document.getElementById('splash'),5);
      myScrollSpecific(-1,2);
      break;
    case 'PORTFOLIO':
      renderPortfolio();
      break;
    case 'RESUME':
      renderResume();
      break;
    case 'CONTACT':
      renderContact();
      break;
    default:
      renderHome();
  }
}

function renderPage(){
  part = -1;
  let container = getContainer();
  emptyDiv(container);
  let topmenu = document.getElementById('topmenu');
  topmenu.style.visibility = 'visible';
  emptyDiv(topmenu);
  while(topmenu.firstChild){
    topmenu.removeChild(topmenu.firstChild);
  }
  let pages = ["CONTACT","RESUME","PORTFOLIO","HOME"]; /*["HOME", "PORTFOLIO", "RESUME", "CONTACT"];*/
  renderNavBar(pages);
  addNameBoxEvents();

  //let backToTopButton = document.getElementById('backToTopButton');
  //addBackToTopEvents(backToTopButton);
  view('HOME');
}

function renderHome(){
  let container = getContainer();
  let page = document.getElementById('projectPage');
  if(page!=null){
    emptyDiv(page);
    page.parentNode.removeChild(page);
  }
  container.style.paddingTop = '0px';
  emptyDiv(container);
  let splash = makeDiv('splash','splash');
  container.appendChild(splash);
  imagesDiv = [];
  addSplashImages();
  let splashname = makeDiv('splashname', 'splashname');
  //splashname.innerHTML = 'ADRIA LYON';

  //let splashsubtext = makeDiv('splashsubtext', 'splashsubtext');
  //splashsubtext.innerHTML = "description blah blah blah...";
  let splashButton = makeDiv('splashEnterButton','splashEnterButton');
  splashButton.innerHTML = 'ENTER';
  addSplashButtonEvents(splashButton);
  splash.appendChild(splashname);
  //splash.appendChild(splashsubtext);
  splash.appendChild(splashButton);
  let scrollbutton = makeDiv('downscrollbutton', 'downscrollbutton');
  scrollbutton.innerHTML = '^';
  //container.appendChild(scrollbutton);
  addScrollButtonEvents(scrollbutton);
  let portfolioholder = makeDiv('portfolioholder', 'portfolioholder');
  container.appendChild(portfolioholder);
  addPortfolioItems(portfolioholder);
  addPortfolioProjects();

  let dropdown = makeDiv('dropDownMenu','dropDownMenu');
  var temp = document.getElementById('navbuttonPORTFOLIO');
  //var rect = temp.getBoundingClientRect();
  //dropdown.style.left = rect.left + "px";
  dropdown.style.visibility = 'hidden';
  let projectNames = ['LASER CUT SKIRT', 'PINTUCK SEPARATES', 'LITTLE BLACK DRESS', 'YMA FSF 2018 WINNING CASE STUDY', 'FORMALWEAR', 'CASCADING BLOUSE', 'KIMONO', 'JUNIORS COLLECTION', 'HOLIDAY COLLECTION', 'ILLUSTRATIONS'];
  projectNames.forEach(function(name){
    let item = makeDiv('dropdownItem','dropdownItem');
    item.innerHTML = name;
    dropdown.appendChild(item);
    addDropDownItemEvents(item, name);
  });
  /*for(var i = 0; i<10;i++){//iterate through list of project names.... then add events based on name
    let item = makeDiv('dropdownItem','dropdownItem');
    item.innerHTML = i;
    dropdown.appendChild(item);
    addDropDownItemEvents(item);
  }*/
  addDropDownEvents(dropdown);
  document.getElementById('topbar').appendChild(dropdown);

  let para1 = makeDiv('para1','para1');
  let para2 = makeDiv('para2','para2');
  let para3 = makeDiv('para3', 'para3');
  container.appendChild(para1);
  container.appendChild(para2);
  container.appendChild(para3);
}

function addDropDownItemEvents(item, name){
  let menu = document.getElementById('dropDownMenu');
  item.addEventListener('mouseover', function(e){
    item.style.background = shadeColor('#1f2021',30);
  });
  item.addEventListener('mouseout',function(e){
    item.style.background = '#1f2021';
  });
  item.addEventListener('mousedown', function(e){
    renderProject(name);
    console.log("Clicked on: " + name);
  });
}

function addDropDownEvents(dropdown){
  let button = document.getElementById('navbuttonPORTFOLIO');
  button.addEventListener('mouseover', function(e){
    dropdown.style.visibility = 'visible';
  });
  button.addEventListener('mouseout', function(e){
    dropdown.style.visibility = 'hidden';
  });
  dropdown.addEventListener('mouseout',function(e){
    console.log('hide');
    dropdown.style.visibility = 'hidden';
  });
  dropdown.addEventListener('mouseover',function(e){
    console.log('show');
    dropdown.style.visibility = 'visible';
  });
}

function renderPortfolio(){
  let container = getContainer();
  container.style.paddingTop = '0px';
  console.log("RENDER THE PORTFOLIO");
  //scrollToElement(document.getElementById('portfolioholder'),10,10);
  if(document.getElementById('splash') == null){
    renderHome();
  }

  let page = document.getElementById('projectPage');
  if(page!=null){
    emptyDiv(page);
    page.parentNode.removeChild(page);
  }

  myScroll(document.getElementById('level1'),5);
}

function addPortfolioItems(portfolioholder){
  let titles = ["One", "Two", "Three"];
  let level1 = makeDiv('level1','level1');
  portfolioholder.appendChild(level1);
  let level2 = makeDiv('level2','level2');
  portfolioholder.appendChild(level2);
  let level3 = makeDiv('level3','level3');
  portfolioholder.appendChild(level3);

  let bottomNav = makeDiv('bottomNav','bottomNav');
  portfolioholder.appendChild(bottomNav);
  /*
  for(var i = 0; i < 3; i++){
    let item = makeDiv('portfolioitem', 'portfolioitem' + i);
    let itemPic = makeDiv('portfolioitempic', 'portfolioitempic' + i);
    let itemTitle = makeDiv('portfolioitemtitle', 'portfolioitemtitle' + i);
    //itemTitle.innerHTML = titles[i];
    portfolioholder.appendChild(item);
    item.appendChild(itemTitle);
    item.appendChild(itemPic);
  }
  */
}

function addPortfolioProjects(){
  let level1 = document.getElementById('level1');
  let level2 = document.getElementById('level2');
  let level3 = document.getElementById('level3');
  let level1names = ['LITTLE BLACK DRESS', 'KIMONO', 'PINTUCK SEPARATES'];
  let level2names = ['JUNIORS COLLECTION', 'YMA FSF 2018 WINNING CASE STUDY', 'HOLIDAY COLLECTION'];
  let level3names = ['FORMALWEAR', 'CASCADING BLOUSE', 'LASER CUT SKIRT'];
  for(let i = 1; i<=3; i++){
    //let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    let item = document.createElement('div');
    item.classList.add('portfolioitem'+i);
    item.classList.add('items');
    item.id = 'portfolioitem' + i;
    //item.innerHTML = level1names[i-1];
    level1.appendChild(item);
    addItemEvents(item,level1names[i-1]);
  }
  for(let i = 4; i<=6; i++){
    let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    //item.innerHTML = level2names[i-4];
    item.classList.add('items');
    addItemEvents(item,level2names[i-4]);
    level2.appendChild(item);
  }
  for(let i = 7; i<=9; i++){
    let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    //item.innerHTML = level3names[i-7];
    item.classList.add('items');
    addItemEvents(item,level3names[i-7]);
    level3.appendChild(item);
  }

  let items = document.getElementsByClassName('items');
  console.log(items);
  //addItemEvents(items);
}

function addItemEvents(item, name){
  item.addEventListener('mouseover', function(e){
    //console.log(zoom);
    item.style.opacity = '.8';
    item.style.height = '105vh';
    //item.style.paddingTop = '2000px';
  });
  item.addEventListener('mouseout', function(e){
    item.style.opacity = '1';
    item.style.height = '100vh';
    //item.style.paddingTop = '0px';
  });
  item.addEventListener('mousedown', function(e){
    console.log(name);
    renderProject(name);
  });
}

function renderProject(name){
  //let page = makeDiv('projectPage','projectPage');
  let body = document.getElementById('body');
  let container = getContainer();
  emptyDiv(container);
  //body.style.overflow = 'hidden';
  //body.appendChild(page);
  let title = makeDiv('projectTitle','projectTitle');
  title.innerHTML = name;
  container.appendChild(title);
  let line = makeDiv('dividerLine');
  container.appendChild(line);
  let exitbutton = makeDiv('exitProject','exitProject');
  exitbutton.innerHTML = 'X';
  addQuitEvent(exitbutton);
  container.appendChild(exitbutton);
  if(name==="LITTLE BLACK DRESS"){
    renderNonPDF(name);
  }
  myScrollSpecific(0,.00001);
}

function renderPDF(name){

}

function renderNonPDF(name){
  console.log(name + "being rendered...");
  if(name==="LITTLE BLACK DRESS"){
    renderLittleBlackDress();
  }
}

function renderLittleBlackDress(){
  let container = getContainer();
  let description = makeDiv('projectDescription','projectDescription');
  description.innerHTML = 'The goal for this assignment was to create a zero waste little black dress displayed alongside “The Little Black Dress: Through the Decades” exhibition at the Saint Louis History Museum. Symmetry, sleeves, and the minimization of waste were three key requirements for this project.';
  container.appendChild(description);
  let pic1 = makeDiv('projectPicture','lbd1');
  let pic2 = makeDiv('projectPicture','lbd2');
  let pic3 = makeDiv('projectPicture','lbd3');
  let pic4 = makeDiv('projectPicture','lbd4');
  let pic5 = makeDiv('projectPicture','lbd5');
  let pic6 = makeDiv('projectPicture','lbd6');
  let pic7 = makeDiv('projectPicture', 'lbd7');
  let pic8 = makeDiv('projectPicture', 'lbd8');
  //let projectPage = document.getElementById('projectPage');
  let picsHolder = makeDiv('projectPicsHolder','projectPicsHolder');
  //let projectPicsCol2 = makeDiv('projectPicsCol2', 'projectPicsCol2');
  let projectPicsCol1 = makeDiv('projectPicsCol1','projectPicsCol1');
  picsHolder.appendChild(projectPicsCol1);
  //picsHolder.appendChild(projectPicsCol2);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
  projectPicsCol1.appendChild(pic6);
  projectPicsCol1.appendChild(pic7);
  projectPicsCol1.appendChild(pic8);
  container.appendChild(picsHolder);
}

function addQuitEvent(button){
  let page = document.getElementById('projectPage');
  let body = document.getElementById('body');
  let container = getContainer();
  button.addEventListener('mousedown',function(e){
    //projectPage.parentNode.removeChild(projectPage);
    view('HOME');
    //body.style.overflow = 'visible';
  });
}

function renderResume(){
  let container = getContainer();
  emptyDiv(container);
  let page = document.getElementById('projectPage');
  if(page!=null){
    emptyDiv(page);
    page.parentNode.removeChild(page);
  }
  let resumeHolder = makeDiv('resumeHolder','resumeHolder');
  let resume = document.createElement('img');
  resume.src = 'resources/css/images/homepage/adriaresume.jpg';
  resume.width = 900;
  resume.height = 1165;
  resume.classList.add('resumeImage');
  resumeHolder.appendChild(resume);
  container.appendChild(resumeHolder);
}

function renderContact(){
  let container = getContainer();
  let page = document.getElementById('projectPage');
  if(page!=null){
    emptyDiv(page);
    page.parentNode.removeChild(page);
  }
  emptyDiv(container);
  let contactholder = createContactPanel();
  container.appendChild(contactholder);
  container.style.paddingTop = '150px';
  myScrollSpecific(0,0);
}

function addSplashImages(){
  for(var i = 0; i < 4; i++){
    let splashimage = makeDiv('splashimage', 'splashimage' + i);
    if(i==0){
      splashimage.style.marginLeft = '0px';
      //splashimage.marginRight = '25px';
    }
    else if(i>0){
      splashimage.style.width = '0px';
    }
    splash.appendChild(splashimage);
    imagesDiv.push(splashimage);
    //maybe???
    //addSplashImageEvents(splashimage);
  }
  let leftButton = makeDiv('splashLeftButton','splashLeftButton');
  leftButton.innerHTML = "<";
  let rightButton = makeDiv('splashRightButton','splashRightButton');
  rightButton.innerHTML = ">";

  addRightButtonEvents(rightButton);
  addLeftButtonEvents(leftButton);
  splash.appendChild(leftButton);
  splash.appendChild(rightButton);
}

function addRightButtonEvents(button){
  console.log(imagesDiv);
  button.addEventListener('mouseover',function(e){
    button.style.width = '10vmin';
    button.style.paddingLeft = '3vh';
  });
  button.addEventListener('mouseout', function(e){
    button.style.width = '7vmin';
    button.style.padding = '.7vh';
  });
  button.addEventListener('mousedown',function(e){
    //imagesDiv[0].style.minWidth = '0px'
    imagesDiv[0].style.width = '0px';
    imagesDiv[1].style.width = '100%';
    //imagesDiv[1].style.minWidth = '500px';
    imagesDiv[2].style.minWidth = '0px'
    //imagesDiv[2].style.width = '0px';
    let div1 = imagesDiv[0];
    //let div2 = imagesDiv[1];
    //let div3 = imagesDiv[2];
    setTimeout(function(){
      div1.outerHTML = '';
      //div2.outerHTML = '';
      //div3.outerHTML = '';
      document.getElementById('splash').appendChild(div1);
      //document.getElementById('splash').appendChild(div2);
      //document.getElementById('splash').appendChild(div3);
    }, 700);
    imagesDiv.splice(0,1);
    imagesDiv.push(div1);
    //imagesDiv.push(div2);
    //imagesDiv.push(div3);
    console.log(imagesDiv);
  });
}

function addLeftButtonEvents(button){
  //console.log(imagesDiv);
  button.addEventListener('mouseover',function(e){
    button.style.width = '10vmin';
    button.style.paddingLeft = '3vh';
  });
  button.addEventListener('mouseout', function(e){
    button.style.width = '7vmin';
    button.style.padding = '.7vh';
  });
  button.addEventListener('mousedown',function(e){
    //imagesDiv[2].outerHTML = "";
    //let div3 = imagesDiv.pop();
    //let div2 = imagesDiv.pop();
    let div1 = imagesDiv.pop();
    //imagesDiv.unshift(div3);
    //imagesDiv.unshift(div2);
    imagesDiv.unshift(div1);
    let splash = document.getElementById('splash');
    splash.insertBefore(div1,imagesDiv[1]);
    //splash.insertBefore(div2,imagesDiv[3]);
    //splash.insertBefore(div3,imagesDiv[3]);
    imagesDiv[1].style.width = '0px';
    imagesDiv[2].style.width = '0px';
    //imagesDiv[5].style.width = '0px';
    manualGrow(imagesDiv[0],100,7);
    //manualGrow(imagesDiv[1],34,3);
    //manualGrow(imagesDiv[2],34,3);
    //console.log(imagesDiv);
  });
}

function showDivs(n){
  let images = 6;
}

function addSplashImageEvents(splashimage){
  splashimage.addEventListener('mouseover', function(e){
    for(var i = 0; i < 4; i++){
      var temp = document.getElementById('splashimage' + i);
      temp.style.width = '25%'
    }
    splashimage.style.width = '27%';
  });
  splashimage.addEventListener('mouseout', function(e){
    for(var i = 0; i < 4; i++){
      var temp = document.getElementById('splashimage' + i);
      temp.style.marginLeft = '25px;'
    }
    splashimage.style.width = '25%';
  });
}

function addSplashButtonEvents(button){
  button.addEventListener('mousedown', function(e){
    myScroll(document.getElementById('level1'),5);
  });
}

function addScrollButtonEvents(scrollbutton){
  scrollbutton.addEventListener('mouseover', function(e){
    scrollbutton.style.background = 'black';
    scrollbutton.style.color = 'white';
  });
  scrollbutton.addEventListener('mouseout', function(e){
    scrollbutton.style.background = 'white';
    scrollbutton.style.color = 'black';
  });
  scrollbutton.addEventListener('mousedown', function(e){
    myScroll(document.getElementById('portfolioholder'),5);
  });
}

//make the name box have a mouseover highlight and eventually render the website again
function addNameBoxEvents(){
  let namebox = document.getElementById('namebox');
  namebox.addEventListener('mouseover', function(e){
    namebox.style.backgroundColor = shadeColor('#1f2021', 60);
  });
  namebox.addEventListener('mouseout', function(e){
    namebox.style.backgroundColor = '#1f2021';
  });
  namebox.addEventListener('mousedown', function(e){
    myScroll(document.getElementById('splash'),5);
  });
}

//add the 4 pages to the navbar
function renderNavBar(pages){
  pages.forEach(function(item){
    let button = makeDiv('navbutton', 'navbutton' + item);
    button.innerHTML = item;
    if(item == 'HOME'){
      button.style.color = 'white';
    }
    else{
      button.style.color = 'grey'
    }
    topmenu.appendChild(button);
    addNavButtonEvents(button, item);
    buttonDivs.push(button);
  });
}
function addNavButtonEvents(button,page){ //give them their events
  let underline = makeDiv('navunderline', 'navunderline' + page);
  document.getElementById('topbar').appendChild(underline);
  button.appendChild(underline);
  button.addEventListener('mousedown', function(e){
    console.log(page);
    buttonDivs.forEach(function(div){
      div.style.color = 'grey'
      //div.style.fontSize = '2.5vmin'
    });
    button.style.color = 'white';
    underline.style.width = '0px';
    view(page);
  });
  button.addEventListener('mouseover', function(e){
    var w = 1.2 * page.length;
    underline.style.width = w.toString() + 'vmin';
    underline.style.marginBottom = '3vmin';
    //button.style.fontSize = '3vmin';
    if(page=="PORTFOLIO"){
      //var names = ['Laser Cut Skirt', 'Pintuck Separates', 'Little Black Dress', 'YMA FSF 2018 Winning Case Study', 'Formalwear', 'Cascading Blouse', 'Kimono', 'Juniors Collection', 'Holiday Collection', 'Illustrations'];
      console.log("DROPDOWN NOW");
    }
  });
  button.addEventListener('mouseout', function(e){
    underline.style.width = '0px';
    //button.style.fontSize = '2.5vmin';
    underline.style.marginBottom = '2.6vmin';
    if(page == "PORTFOLIO"){
      console.log("Hide dropdown...");
    }
  });
}

function addBackToTopEvents(button){
  button.addEventListener('mouseover', function(e){
    button.style.backgroundColor = shadeColor('#1F2021', 30)
  });
  button.addEventListener('mouseout', function(e){
    button.style.backgroundColor = '#1F2021';
  });
  button.addEventListener('mousedown', function(e){
    myScroll(document.getElementById('container'),5);
  });
}

function createContactPanel(){
  let contactholder = makeDiv('contactholder','contactholder');
  //linkedin, instagram,
  /*let linkedin = makeDiv('contacticon', 'linkedin');
  let insta = makeDiv('contacticon', 'insta');
  addContactButtonEvent(linkedin,'linkedin');
  addContactButtonEvent(insta,'insta');
  contactholder.appendChild(linkedin);
  contactholder.appendChild(insta);
  */
  let form = document.createElement('form');
  form.classList.add('emailForm');
  form.action = "https://formspree.io/henry.phelps@bc.edu";
  form.method = "POST";

  let nameInput = document.createElement('input');
  nameInput.classList.add('nameInput');
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name","name");
  nameInput.setAttribute("placeholder", "NAME");

  let addressInput = document.createElement('input');
  addressInput.classList.add('addressInput');
  addressInput.setAttribute("type","email");
  addressInput.setAttribute("name","email");
  addressInput.setAttribute("placeholder","Your email address");

  let emailInput = document.createElement('textarea');
  emailInput.classList.add('emailInput');
  emailInput.setAttribute("type", "message");
  emailInput.setAttribute("name","message");
  emailInput.setAttribute("placeholder", "Message...");

  let submitInput = document.createElement('input');
  submitInput.classList.add('submitInput');
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value","Send");

  form.appendChild(nameInput);
  form.appendChild(addressInput);
  form.appendChild(emailInput);
  form.appendChild(submitInput);
  contactholder.appendChild(form);
  return contactholder;
}

/*
function addContactButtonEvent(button,site){
  button.innerHTML = site;
  button.addEventListener('mouseover', function(e){
    button.style.backgroundColor = shadeColor('#1f2021', 50)
    button.style.width = '120px';
    button.style.height = '120px';
    button.style.marginRight = '30px';
    button.style.marginTop = '45px';
    button.style.boxShadow = '0 15px 30px rgba(0,0,0,0.4)';
  });
  button.addEventListener('mouseout', function(e){
    button.style.backgroundColor = '#1f2021';
    button.style.width = '100px';
    button.style.height = '100px';
    button.style.marginRight = '50px';
    button.style.marginTop = '50px';
    button.style.boxShadow = '';

  });
  button.addEventListener('mousedown',function(e){
    switch(site){
      case 'insta':
        window.open('https://www.instagram.com/adrialyon');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/adria-duncan-33433b110/');
        break;
    }
  });
}
*/

//************************************
//*********HELPER FUNCTIONS***********
//************************************
function manualGrow(div,width,time){
  div.style.width = '0px';
  var i = 0;
  var int = setInterval(function(){
    i= i + (width/time);
    div.style.width = i + '%';
    if(i>=width)clearInterval(int);
  }, time/width);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function makeDiv(name, id){ //creates a div and sets up its classlist and id
  let div = document.createElement('div');
  div.classList.add(name);
  div.id = id;
  return div;
}

//remove all children from a div
function emptyDiv(div){
  while(div.firstChild){ //clear the container
    div.removeChild(div.firstChild);
  }
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

//scroll to an element on the page
function myScroll(pageElement,speed){
  let posY = 0;
  if(pageElement!=null){
    posY = pageElement.offsetTop -80;
    let curr = window.scrollY;
    let offset = posY-curr;
    if(offset<0){
      scrollUp(offset,speed);
    }
    else{
      scrollDown(offset,speed);
    }
  }
}

function myScrollSpecific(posY,speed){
  let curr = window.scrollY;
  let offset = posY-curr;
  if(offset<0){
    scrollUp(offset,speed);
  }
  else{
    scrollDown(offset,speed);
  }
}
function scrollDown(distance,speed,offset){
 var i = window.scrollY;
 let destination = distance+window.scrollY;
 var int = setInterval(function(){
   window.scrollTo(0,i);
   i+= 10;
   if(i>=destination)clearInterval(int);
 }, speed);
}

function scrollUp(distance,speed,offset){
  var i = window.scrollY;
  let destination = distance + window.scrollY;
  var int = setInterval(function(){
    window.scrollTo(0,i);
    i-=10;
    if(i<=destination)clearInterval(int);
  }, speed);
}

function getContainer(){
  return document.getElementById('container');
}

//get the position of an element;
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
//************************************
//************************************
