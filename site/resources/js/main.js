//Henry Phelps website for Adria Duncan
let buttonDivs = [];
window.onload = renderPage();
//render a top bar that has a download resume or contact button etc.
//make each bubble have lines shading it except for the current one which will be solid
//each bubble a different color
//dark grey bg

function view(page){
  switch(page){
    case 'HOME':
      renderHome();
      myScroll(document.getElementById('splash'),5);
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
  let container = document.getElementById('container');
  emptyDiv(container);
  let topmenu = document.getElementById('topmenu');
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
  let container = document.getElementById('container');
  container.style.paddingTop = '0px';
  emptyDiv(container);
  let splash = makeDiv('splash','splash');
  container.appendChild(splash)
  addSplashImages();
  let splashname = makeDiv('splashname', 'splashname');
  splashname.innerHTML = "ADRIA LYON"
  let splashsubtext = makeDiv('splashsubtext', 'splashsubtext');
  splashsubtext.innerHTML = "description blah blah blah..."
  splash.appendChild(splashname);
  splash.appendChild(splashsubtext);
  let scrollbutton = makeDiv('downscrollbutton', 'downscrollbutton');
  scrollbutton.innerHTML = '^';
  container.appendChild(scrollbutton);
  addScrollButtonEvents(scrollbutton);
  let portfolioholder = makeDiv('portfolioholder', 'portfolioholder');
  container.appendChild(portfolioholder);
  addPortfolioItems(portfolioholder);
}

function renderPortfolio(){
  let container = document.getElementById('container');
  container.style.paddingTop = '0px';
  console.log("RENDER THE PORTFOLIO");
  //scrollToElement(document.getElementById('portfolioholder'),10,10);
  if(document.getElementById('splash') == null){
    renderHome();
  }
  myScroll(document.getElementById('portfoliomarker'),5);
}

function addPortfolioItems(portfolioholder){
  let titles = ["One", "Two", "Three"];
  for(var i = 0; i < 3; i++){
    let item = makeDiv('portfolioitem', 'portfolioitem' + i);
    let itemPic = makeDiv('portfolioitempic', 'portfolioitempic' + i);
    let itemTitle = makeDiv('portfolioitemtitle', 'portfolioitemtitle' + i);
    itemTitle.innerHTML = titles[i];
    portfolioholder.appendChild(item);
    item.appendChild(itemTitle);
    item.appendChild(itemPic);
  }
}

function renderResume(){
  let container = document.getElementById('container');
  emptyDiv(container);
}

function renderContact(){
  let container = document.getElementById('container');
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
      splashimage.marginRight = '25px';
    }
    else if(i==4){
      splashimage.style.marginRight = '0px';
      splashimage.style.marginLeft = '25px';
    }
    else{
      splashimage.style.marginLeft = '25px';
    }
    splash.appendChild(splashimage);
    addSplashImageEvents(splashimage);
  }
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
    myScroll(document.getElementById('portfoliomarker'),5);
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
  button.appendChild(underline);
  button.addEventListener('mousedown', function(e){
    console.log(page);
    buttonDivs.forEach(function(div){
      div.style.color = 'grey'
      div.style.fontSize = '20px'
    });
    button.style.color = 'white';
    underline.style.width = '0px';
    view(page);
  });
  button.addEventListener('mouseover', function(e){
    underline.style.width = '110px';
    button.style.fontSize = '22px';
    underline.style.marginBottom = '30px';
  });
  button.addEventListener('mouseout', function(e){
    underline.style.width = '0px';
    button.style.fontSize = '20px';
    underline.style.marginBottom = '35px';
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
  let linkedin = makeDiv('contacticon', 'linkedin');
  let insta = makeDiv('contacticon', 'insta');
  addContactButtonEvent(linkedin,'linkedin');
  addContactButtonEvent(insta,'insta');
  contactholder.appendChild(linkedin);
  contactholder.appendChild(insta);
  return contactholder;
}

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

//************************************
//*********HELPER FUNCTIONS***********
//************************************
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
    posY = pageElement.offsetTop;
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
//************************************
//************************************
