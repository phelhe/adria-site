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
let dropdownout = 0;


//change this onload to renderenter or something...
window.onload = renderPage();

let splashimagesrendered = false;

//parallax??
// what should we do when scrolling occurs
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, bottom: scrollTop}
}


function calcParallax(tileheight, speedratio, scrollposition) {
  //console.log("tileheight: " + tileheight);
  //console.log("speedradio: " + speedratio);
  //console.log("scrollposition: " + scrollposition);
  //console.log("result (tileheight) - ((scrollposition/speedratio) % (tileheight+1)): " + ((tileheight) - ((scrollposition / speedratio) )));
  //console.log("-------------");
  //return ((tileheight) - ((scrollposition / speedratio)));
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let para1 = document.getElementById('para1');
  let para2 = document.getElementById('para2');
  let para3 = document.getElementById('para3');
  if(width<500){
    return 0;
  }
  else{ //before, these were all at .08 with no added position
    let level1height = $('.level1').height();
    //console.log(level1bottom);
    if(part==2){
      return -scrollposition *.07 + level1height/speedratio + 300;
    }
    if(part==1){
      return -scrollposition * .3  + level1height/speedratio + 600;
    }
    else{
      return -scrollposition * .25 - tileheight/speedratio;
    }
  }
}


var runOnScroll =  function(evt) {
    var level1bottom = offset(document.getElementById('level1')).top -70;
    var level2bottom = offset(document.getElementById('level2')).top;

    let level1offset = $('.level1').offset().top + $('.level1').height();
    let level2offset = $('.level2').offset().top + $('.level2').height();
    //console.log(level1bottom);
    //console.log(level2bottom);

    document.getElementById('para2').style.top = level1offset;
    document.getElementById('para3').style.top = level2offset;

    var top  = window.pageYOffset || document.documentElement.scrollTop;
    var body = document.getElementById('portfolioholder');
    if(top>level1bottom && top <level2bottom && part!=1){
      console.log("part 1");
      //body.style.background = "url(resources/css/images/homepage/para2smaller.jpg)";
      part = 1;
    }
    else if(top > level2bottom - 120 && part!=2){
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


    var foregroundparallax = calcParallax(10,20,posY);
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
let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
console.log("WIDTH: " + width);
if(width>500){
  elements.forEach(function(element) {
    window.addEventListener("scroll", runOnScroll);
  });
}


window.onresize = adjustWindow();

//use this to check if the height is a certain size, then change the top menu to something simpler
function adjustWindow(){
  console.log('adjusting...');
  /*var dropdown = document.getElementById('dropDownMenu');
  console.log(dropdown);
  var temp = $('#navbuttonPORTFOLIO').offset()//document.getElementById('navbuttonPORTFOLIO');
  console.log(temp);*/
  //var rect = temp.getBoundingClientRect();
  //dropdown.style.left = rect.left + "px";
  //dropdown.style.left = temp;
}

//add one more view: enter page
//enter page will just have her name and a button that says enter
function view(page){
  part = -1;
  switch(page){
    case 'HOME':
      renderHome();
      //myScroll(document.getElementById('splash'),5);
      //myScrollSpecific(-1,2);
      $("html, body").animate({scrollTop: 0}, "slow");
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
  let backToTopButton = document.getElementById('backToTopButton');
  addBackToTopEvents(backToTopButton);
  let bottomContactButton = document.getElementById('bottomContactButton');
  addBottomContactEvents(bottomContactButton);
  let bottomLinkedinButton = document.getElementById('bottomLinkedinButton');
  addBottomLinkedInEvents(bottomLinkedinButton);
  let insta = document.getElementById(('bottomInstaButton'));
  addBottomInstaEvents(insta);

  //let test = document.getElementById('topbar');
  //test.style.backgroundColor = 'blue';
  let loadingScreen = makeDiv('loadingScreen','loadingScreen');
  document.getElementById('topbar').style.visibility = 'hidden';
  topmenu.style.visibility = 'hidden';
  document.getElementById('bottomNav').style.visibility = 'hidden';
  //document.getElementById('container').style.visibility = 'hidden';
  document.body.appendChild(loadingScreen);
  $('<img/>').attr('src', 'resources/css/images/homepage/nametext.png').on('load', function() {
    $(this).remove(); // prevent memory leaks as @benweet suggested
  });

  $('<img/>').attr('src', 'http://da2r60hdk7vk8.cloudfront.net/site/resources/css/images/homepage/group3/splash3smaller.png').on('load', function() {
    $(this).remove(); // prevent memory leaks as @benweet suggested
    //$('body').css('background-image', 'url(http://picture.de/image.png)');
    console.log("loaded");
    let loadingScreen = document.getElementById('loadingScreen');
    let topbar = document.getElementById('topbar');
    let topmenu = document.getElementById('topmenu');
    let bottomNav = document.getElementById('bottomNav');
    let container = getContainer();
    $(".loadingScreen").fadeOut("slow", function(){
      $(".loadingScreen").remove();
    });
    console.log("hello??");
    topbar.style.visibility = 'visible';
    topmenu.style.visibility = 'visible';
    bottomNav.style.visibility = 'visible';
    container.style.visiblity = 'visible';
    view('HOME');
  });

}

function addBottomLinkedInEvents(button){
  button.addEventListener('mouseover', function(e){
    button.style.backgroundColor = shadeColor('#1F2021', 30)
  });
  button.addEventListener('mouseout', function(e){
    button.style.backgroundColor = '#1F2021';
  });
  button.addEventListener('mousedown', function(e){
    window.location.href = "https://www.linkedin.com/in/adria-duncan-33433b110/";
  });
}

function addBottomInstaEvents(button){
  button.addEventListener('mouseover', function(e){
    button.style.backgroundColor = shadeColor('#1F2021', 30)
  });
  button.addEventListener('mouseout', function(e){
    button.style.backgroundColor = '#1F2021';
  });
  button.addEventListener('mousedown', function(e){
    window.location.href = "http://instagram.com/adrialyon";
  });
}

function addBottomContactEvents(button){
  button.addEventListener('mouseover', function(e){
    button.style.backgroundColor = shadeColor('#1F2021', 30)
  });
  button.addEventListener('mouseout', function(e){
    button.style.backgroundColor = '#1F2021';
  });
  button.addEventListener('mousedown', function(e){
    view('CONTACT');
  });
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
  $('<img/>').attr('src', 'resources/css/images/homepage/nametext.png').on('load', function() {
    $(this).remove(); // prevent memory leaks as @benweet suggested
    //$('body').css('background-image', 'url(http://picture.de/image.png)');
    console.log("loaded");
    $(".splashname").fadeTo(1000, 1,function(){
      console.log("done fading in name...");
    });
    $(".splashEnterButton").fadeTo(1000,1,function(){
      console.log("done fading in enter button...")
    });
  });
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
  let projectNames = ['SENIOR THESIS COLLECTION','LASER CUT SKIRT', 'PINTUCK SEPARATES', 'LITTLE BLACK DRESS', 'YMA FSF 2018 WINNING CASE STUDY', 'FORMALWEAR', 'CASCADING BLOUSE', 'KIMONO', 'JUNIORS COLLECTION', 'HOLIDAY COLLECTION', 'ILLUSTRATIONS'];
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


  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(width>=500){
    let para1 = makeDiv('para1','para1');
    let para2 = makeDiv('para2','para2');
    let para3 = makeDiv('para3', 'para3');
    container.appendChild(para1);
    container.appendChild(para2);
    container.appendChild(para3);
  }
  if(width<500){
    console.log('mobile');
    let level1 =document.getElementById('level1');
    let level2 =document.getElementById('level2');
    let level3 = document.getElementById('level3');
    level1.style.marginTop = '0px';
    //level1.style.background = 'black';
    //level2.style.marginTop = '0px';
    //level3.style.marginTop = '0px';
    for(i = 1; i<=9; i++){
      let div = document.getElementById('portfolioItemHolder' + i);
      console.log(div);
      document.getElementById('portfolioItemHolder'+i).style.marginLeft = '0vw';
      //document.getElementById('portfolioItemHolder'+i).style.minWidth='400px';
    }
  }
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
    let menu = document.getElementById('dropDownMenu');
    //menu.style.visiblity = 'hidden';
    dropdownout = 0;
    console.log(dropdownout);
    console.log(menu);
    menu.style.visibility = 'hidden';
    console.log("Clicked on: " + name);
  });

  //if
}

function addDropDownEvents(dropdown){
  let button = document.getElementById('navbuttonPORTFOLIO');
  button.addEventListener('mouseover', function(e){
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width>500){
      dropdown.style.visibility = 'visible';
    }
  });
  button.addEventListener('mouseout', function(e){
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width>500){
      dropdown.style.visibility = 'hidden';
    }
  });
  dropdown.addEventListener('mouseout',function(e){
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //console.log('hide');
    if(width>500){
      dropdown.style.visibility = 'hidden';
    }
  });
  dropdown.addEventListener('mouseover',function(e){
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //console.log('show');
    if(width>500){
      dropdown.style.visibility = 'visible';
    }
  });
}

function renderPortfolio(){
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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

  if(width > 500){
    myScroll(document.getElementById('level1'),5);
  }
  //mobile dropDownMenu
  else{
    let dropdown = document.getElementById('dropDownMenu');
    if(dropdownout){
      dropdown.style.visibility = 'hidden';
      dropdownout = 0;
      console.log(dropdownout);
    }
    else{
      dropdown.style.width = '100vw';
      dropdown.style.right = '0';
      dropdown.style.height = '80vh';
      dropdown.style.fontSize = '5vmin';
      dropdown.style.borderTop = 'solid 2px grey';
      dropdown.style.visibility = 'visible';
      dropdownout = 1;
      console.log(dropdownout);
    }
  }
}

function addPortfolioItems(portfolioholder){
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let titles = ["One", "Two", "Three"];
  let level1 = makeDiv('level1','level1');
  if(width < 500){
    level1.style.height = 'auto';
  }
  portfolioholder.appendChild(level1);
  if(width>500){
    let level2 = makeDiv('level2','level2');
    portfolioholder.appendChild(level2);
    let level3 = makeDiv('level3','level3');
    portfolioholder.appendChild(level3);
  }

  //let bottomNav = makeDiv('bottomNav','bottomNav');
  //portfolioholder.appendChild(bottomNav);

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
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let level1 = document.getElementById('level1');
  if(width>500){
    let level2 = document.getElementById('level2');
    let level3 = document.getElementById('level3');
  }
  let level1names = ['LITTLE BLACK DRESS', 'KIMONO', 'PINTUCK SEPARATES'];
  let level2names = ['JUNIORS COLLECTION', 'YMA FSF 2018 WINNING CASE STUDY', 'HOLIDAY COLLECTION'];
  let level3names = ['FORMALWEAR', 'CASCADING BLOUSE', 'LASER CUT SKIRT'];
  for(let i = 1; i<=3; i++){
    //let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    let holder = makeDiv('portfolioItemHolder','portfolioItemHolder'+i);
    if(width<500){
      holder.style.width = '100vw';
    }
    let item = document.createElement('div');
    item.classList.add('portfolioitem'+i);
    if(level1names[i-1]!="PINTUCK SEPARATES"){
      item.classList.add('items');
    }
    else{
      item.classList.add('items');
    }
    item.id = 'portfolioitem'+i;
    let name = makeDiv('portfolioItemTitle','portfolioItemTitle'+i);
    if(width<500){
      name.style.fontSize = '4vmin';
    }
    name.innerHTML = level1names[i-1];
    holder.appendChild(item);
    holder.appendChild(name);
    level1.appendChild(holder);
    addItemEvents(item,level1names[i-1]);
    /*
    let item = document.createElement('div');
    item.classList.add('portfolioitem'+i);
    item.classList.add('items');
    item.id = 'portfolioitem' + i;
    //item.innerHTML = level1names[i-1];
    level1.appendChild(item);
    addItemEvents(item,level1names[i-1]);
    */
  }
  for(let i = 4; i<=6; i++){
    let holder = makeDiv('portfolioItemHolder','portfolioItemHolder'+i);
    if(width<500){
      holder.style.width = '100vw';
    }
    let item = document.createElement('div');
    item.classList.add('portfolioitem'+i);
    item.classList.add('items3');
    item.id = 'portfolioitem'+i;
    let name = makeDiv('portfolioItemTitle','portfolioItemTitle'+i);
    name.innerHTML = level2names[i-4];
    if(width<500){
      name.style.fontSize = '4vmin';
    }
    holder.appendChild(item);
    holder.appendChild(name);
    //CHANGE THIS PART???
    if(width<500){
      level1.appendChild(holder);
    }
    else{
      level2.appendChild(holder);
    }
    addItemEvents(item,level2names[i-4]);
    /*let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    //item.innerHTML = level2names[i-4];
    item.classList.add('items');
    addItemEvents(item,level2names[i-4]);
    level2.appendChild(item);*/
  }
  for(let i = 7; i<=9; i++){
    let holder = makeDiv('portfolioItemHolder','portfolioItemHolder'+i);
    if(width<500){
      holder.style.width = '100vw';
    }
    let item = document.createElement('div');
    item.classList.add('portfolioitem'+i);
    if(level3names[i-7]==="FORMALWEAR"){
      item.classList.add('items2');
    }
    else{
      item.classList.add('items');
    }
    item.id = 'portfolioitem'+i;
    let name = makeDiv('portfolioItemTitle','portfolioItemTitle'+i);
    name.innerHTML = level3names[i-7];
    if(width<500){
      name.style.fontSize = '4vmin';
    }
    holder.appendChild(item);
    holder.appendChild(name);
    if(width<500){
      level1.appendChild(holder);
    }
    else{
      level3.appendChild(holder);
    }
    addItemEvents(item,level3names[i-7]);
    /*
    let item = makeDiv('portfolioitem'+i,'portfolioitem'+i);
    //item.innerHTML = level3names[i-7];
    item.classList.add('items');
    addItemEvents(item,level3names[i-7]);
    level3.appendChild(item);
    */
  }

  let items = document.getElementsByClassName('items');
  //console.log(items);
  //addItemEvents(items);
}

function addItemEvents(item, name){
  item.addEventListener('mouseover', function(e){
    //console.log(zoom);
    item.style.opacity = '.8';
    let size = item.style.backgroundSize;
    console.log(size);
    if(name==="FORMALWEAR"){
      item.style.backgroundSize = '67vh';
      console.log("YESYESYES");
    }
    else if(name==="JUNIORS COLLECTION" || name==="YMA FSF 2018 WINNING CASE STUDY" || name==="HOLIDAY COLLECTION"){
      item.style.backgroundSize = '62vh';
    }
    else{
    item.style.backgroundSize = '57vh';
    }
    //item.style.height = '105vh';
    //item.style.paddingTop = '2000px';
  });
  item.addEventListener('mouseout', function(e){
    item.style.opacity = '1';
    if(name==="FORMALWEAR"){
      console.log("YESYES");
      item.style.backgroundSize = '65vh';
    }
    else if(name==="JUNIORS COLLECTION" || name==="YMA FSF 2018 WINNING CASE STUDY" || name==="HOLIDAY COLLECTION"){
      item.style.backgroundSize = '60vh';
    }
    else{
      item.style.backgroundSize = '55vh';
    }
    //item.style.height = '100vh';
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

  let exitbutton = makeDiv('exitProject','exitProject');
  exitbutton.innerHTML = 'X';
  addQuitEvent(exitbutton);
  container.appendChild(exitbutton);
  myScrollSpecific(0,.00001);
  if(name==="LITTLE BLACK DRESS"){
    renderNonPDF(name);
  }
  else if(name==="KIMONO"){
    renderNonPDF(name);
  }
  else if(name==="PINTUCK SEPARATES"){
    renderNonPDF(name);
  }
  else if(name==="FORMALWEAR"){
    renderNonPDF(name);
  }
  else if(name==="CASCADING BLOUSE"){
    renderNonPDF(name);
  }
  else if(name==="LASER CUT SKIRT"){
    renderNonPDF(name);
  }
  else if(name==="YMA FSF 2018 WINNING CASE STUDY"){
    renderPDF(name);
  }
  else if(name==="JUNIORS COLLECTION"){
    renderPDF(name);
  }
  else if(name==="SENIOR THESIS COLLECTION"){
    renderPDF(name);
  }
  else if(name==="HOLIDAY COLLECTION"){
    renderPDF(name);
  }
  else if(name === "ILLUSTRATIONS"){
    renderNonPDF(name);
  }
}

function renderPDF(name){
  //need PDF holder -- fill 80vh and 100% wide
  //need arrows on top of it to scroll
  //give holder a minwidth so that it doesnt get too small and dumb
  /*let leftButton = makeDiv('pdfLeftButton','pdfLeftButton');
  let rightButton = makeDiv('pdfRightButton','pdfRightButton');
  leftButton.innerHTML = '<';
  rightButton.innerHTML = '>';
  let pdfHolder = makeDiv('pdfHolder','pdfHolder');
  let container = getContainer();
  container.appendChild(pdfHolder);
  container.appendChild(leftButton);
  container.appendChild(rightButton);*/

  /*
  let resume = document.createElement('img');
  resume.src = 'resources/css/images/homepage/adriaresume.jpg';
  resume.width = 900;
  resume.height = 1165;
  resume.classList.add('resumeImage');
  resumeHolder.appendChild(resume);
  container.appendChild(resumeHolder);
  */
  let pdf = document.createElement('img');
  //let description = makeDiv('projectDescription','projectDescription');
  let c = makeDiv('pdfContainer','pdfContainer');
  let left = makeDiv('splashLeftButton','pdfLeftButton');
  let right = makeDiv('splashRightButton','pdfRightButton');
  addPDFScrollEvents(left,right,c);
  left.innerHTML = '<';
  right.innerHTML = '>';
  getContainer().appendChild(left);
  getContainer().appendChild(right);
  getContainer().appendChild(c);

  if(name==="YMA FSF 2018 WINNING CASE STUDY"){
    /*pdf.src = 'resources/css/images/homepage/YMA.png';
    pdf.width = 850;
    pdf.height = 7700;
    description.innerHTML = '';*/
    renderYMA(c);
  }
  else if(name==="JUNIORS COLLECTION"){
    renderJuniorsCollection(c);
    //pdf.src = 'resources/css/images/homepage/juniorscollection.png';
    //pdf.width = 850;
    //pdf.height = 9900;
    //description.innerHTML = 'Collection designed for WWDMAGIC, a Las Vegas event featuring the latest women’s and juniors’ trends. Delivery: Spring 2018, Age Range: 15-30, Retail Price Point: Moderate';
  }
  else if(name==="HOLIDAY COLLECTION"){
    /*pdf.src = 'resources/css/images/homepage/holidaycollection.png';
    pdf.width = 850;
    pdf.height = 9900;*/
    renderHC(c);
  }
  else if(name == "SENIOR THESIS COLLECTION"){
    c.style.marginTop = '3vh';
    let container = document.getElementById('container');
    let title = makeDiv('projectTitle','projectTitle');
    title.innerHTML = "SENIOR THESIS COLLECTION";
    container.insertBefore(title,pdfContainer);
    let line = makeDiv('dividerLine');
    let description = makeDiv('projectDescription','projectDescription');
    description.innerHTML = "The human heart is the most powerful organ in the human body. Throughout history and in every major religion, the heart has been viewed as the center of all spiritual and emotional well-being as well as the source of all evil. Arrhythmia explores the vastness within the heart and represents the transformation from dark and guarded to purified and ethereal. My interest in the human heart began two years ago when my father was diagnosed with Cardiac Sarcoidosis, a rare and serious heart condition. I witness him transform every day and choose between the two chambers of his heart: love or fear. Inspired by anatomical images and interior photographs, the collection utilizes intricate beading and hand-applied cording to convey the two-fold nature of the heart, a duality each individual must decide between. Through Arrhythmia, I hope to better understand the transformation from warped and grotesque to pure and everlasting in order to help myself and others better understand the light and dark that resides within all of us."
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width<500){
      description.style.fontSize = '4vmin';
    }
    container.insertBefore(line,pdfContainer);
    container.insertBefore(description,pdfContainer);

    left.style.top = '';
    right.style.top = '';
    right.style.bottom = '40vh';
    left.style.bottom = '40vh';

    renderSeniorThesis(c);
  }
  pdf.classList.add('pdfImage');
  //let pdfHolder = makeDiv('pdfHolder','pdfHolder');
  //pdfHolder.appendChild(pdf);
  //getContainer().appendChild(description);
  //getContainer().appendChild(pdfHolder);
}

function renderNonPDF(name){
  let title = makeDiv('projectTitle','projectTitle');
  title.innerHTML = name;
  container.appendChild(title);
  let line = makeDiv('dividerLine');
  let description = makeDiv('projectDescription','projectDescription');
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(width<500){
    description.style.fontSize = '4vmin';
  }
  container.appendChild(line);
  container.appendChild(description);
  console.log(name + "being rendered...");
  if(name==="LITTLE BLACK DRESS"){renderLittleBlackDress();}
  else if(name==="KIMONO"){renderKimono();}
  else if(name==="PINTUCK SEPARATES"){renderPintuckSeparates();}
  else if(name==="FORMALWEAR"){renderFormalWear();}
  else if(name==="CASCADING BLOUSE"){
    renderCascadingBlouse();
  }
  else if(name==="LASER CUT SKIRT"){
    renderLaserCutSkirt();
  }
  else if(name==="ILLUSTRATIONS"){renderIllustrations();}
}

function renderIllustrations(){
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = '';
  //container.appendChild(description);
  let pic1 = makeDiv('projectPicture','illustration1');
  let pic2 = makeDiv('projectPicture','illustration2');
  let pic3 = makeDiv('projectPicture','illustration3');
  let pic4 = makeDiv('projectPicture','illustration4');
  let pic5 = makeDiv('projectPicture','illustration5');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  if(width>500){
    projectPicsCol1.style.marginLeft = '10vw';
  }
  else{
    projectPicsCol1.style.marginLeft = '0vw';
  }
  picsHolder.appendChild(projectPicsCol1);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
  container.appendChild(picsHolder);
}

function renderJuniorsCollection(c){
  for(i = 1; i <= 9; i++){
    let page = makeDiv('pdfPage','pdfPage'+ i);
    page.style.background = "url(resources/css/images/homepage/juniorscollection/jc" + i + ".png) no-repeat";
    page.style.backgroundSize = 'contain'
    c.appendChild(page);
  }
}

function renderYMA(c){
  for(i = 1; i <= 7; i++){
    let page = makeDiv('pdfPage','pdfPage'+ i);
    page.style.background = "url(resources/css/images/homepage/YMA/yma" + i + ".png) no-repeat";
    page.style.backgroundSize = 'contain'
    c.appendChild(page);
  }
}

function renderHC(c){
  for(i = 1; i <= 9; i++){
    let page = makeDiv('pdfPage','pdfPage'+ i);
    page.style.background = "url(resources/css/images/homepage/holidaycollection/hc" + i + ".png) no-repeat";
    page.style.backgroundSize = 'contain'
    c.appendChild(page);
  }
}

function renderSeniorThesis(c){

  for(i=1; i<=25; i++){
    let page = makeDiv('pdfpage', 'pdfPage'+i);
    page.style.background = "url(resources/css/images/homepage/capstone/capstone" + i + ".jpg) no-repeat";
    page.style.backgroundSize = 'contain';
    c.appendChild(page);
  }
}

function addPDFScrollEvents(left,right,c){
  right.addEventListener('mousedown',function(e){
    scrollRight(c,10,500,10);
    //c.scrollLeft += 6500 * (100 / [document.documentElement.clientWidth]);
    /*let curr = c.scrollLeft;
    var int = setInterval(function(){
      c.scrollLeft+=10;
      //console.log(opacity);
      if((c.scrollLeft-curr) >= 500)clearInterval(int);
    }, 10);*/
  });
  left.addEventListener('mousedown',function(e){
    scrollLeft(c,10,500,10);
  });
}


//NEED TO ADD PDF SCROLLER AT BOTTOM
function renderLaserCutSkirt(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'This skirt incorporates a laser cut, digital print that emphasizes line and shape. The target customer, Dawn, a fictitious New York gallery owner, enjoys a contemporary and avant-garde wardrobe. The laser cut skirt and following collection explores organic lines and the desire to showcase one’s individual flair.';
  //container.appendChild(description);
  let pic1 = makeDiv('projectPicture','lcs1');
  let pic2 = makeDiv('projectPicture','lcs2');
  let pic3 = makeDiv('projectPicture','lcs3');
  let pic4 = makeDiv('projectPicture','lcs4');
  let pic5 = makeDiv('projectPicture','lcs5');
  let pic6 = makeDiv('projectPicture','lcs6');
  let pic7 = makeDiv('projectPicture','lcs7');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  projectPicsCol1.style.marginLeft = '7vw';
  picsHolder.appendChild(projectPicsCol1);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
  projectPicsCol1.appendChild(pic6);
  projectPicsCol1.appendChild(pic7);
  container.appendChild(picsHolder);

  //adding the PDF
  let c = makeDiv('pdfContainer','pdfContainer');
  for(i = 1; i <= 19; i++){
    let page = makeDiv('pdfPage','pdfPage'+ i);
    page.style.background = "url(resources/css/images/homepage/lasercutskirt/dawncollection/dc" + i + ".jpg) no-repeat";
    page.style.backgroundSize = 'contain'
    c.appendChild(page);
  }
  container.appendChild(c);

  let left = makeDiv('splashLeftButton','pdfLeftButton');
  let right = makeDiv('splashRightButton','pdfRightButton');
  let pos = $('.pdfContainer').position().top;
  let height = ($('.pdfContainer').height());
  let correct = pos + (height/2);
  console.log(pos);
  console.log(height);
  /*left.style.marginTop = 0;
  left.style.position = 'absolute';
  left.style.top = correct + 'px';
  right.style.position = 'absolute';
  right.style.marginTop = 0;
  right.style.top = correct + 'px';*/
  left.removeAttribute('top');
  right.removeAttribute('top');
  left.style.bottom = '40vh';
  right.style.bottom = '40vh';
  addPDFScrollEvents(left,right,c);
  left.innerHTML = '<';
  right.innerHTML = '>';
  container.appendChild(left);
  container.appendChild(right);

}

function renderCascadingBlouse(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'This 2017 summer project employs cascading lines to create a rippled effect. Created using Jill Stuart fabric received from 2016 Summer internship. Overseen as a personal project while working at Bespoke, a custom-made clothing store in St. Louis, Missouri. ';
//  container.appendChild(description);
  let pic1 = makeDiv('projectPicture','cb1');
  let pic2 = makeDiv('projectPicture','cb2');
  let pic3 = makeDiv('projectPicture','cb3');
  let pic4 = makeDiv('projectPicture','cb4');
  let pic5 = makeDiv('projectPicture','cb5');
  let pic6 = makeDiv('projectPicture','cb6');
  //let pic7 = makeDiv('projectPicture','cb7');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  projectPicsCol1.style.marginLeft = '10vw';
  picsHolder.appendChild(projectPicsCol1);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
  projectPicsCol1.appendChild(pic6);
  //projectPicsCol1.appendChild(pic7);
  container.appendChild(picsHolder);
}

function renderFormalWear(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'Research Concept: Structural Architecture. Students were asked to create a strapless gown that explores space, utilizing a layered tiered foundation and built-in bustier. The linear rigidity and angularity of the New Horizons building in Melbourne, Australia inspired this look. Piping and layers of netting at the hip and below the knee create the architectural feel. ';
  //container.appendChild(description);
  let pic1 = makeDiv('projectPicture','fw1');
  let pic2 = makeDiv('projectPicture','fw2');
  let pic3 = makeDiv('projectPicture','fw3');
  let pic4 = makeDiv('projectPicture','fw4');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  projectPicsCol1.style.marginLeft = '1vh';
  picsHolder.appendChild(projectPicsCol1);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  container.appendChild(picsHolder);
}

function renderPintuckSeparates(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'This knit top and denim pant explores grooves and how they translate from nature to fabric. Created through a pinching technique on the dress form, these two garments employ pintucks that travel down and across the body.   ';
  //container.appendChild(description);
  let pic1 = makeDiv('projectPicture','ps1');
  let pic2 = makeDiv('projectPicture','ps2');
  let pic3 = makeDiv('projectPicture','ps3');
  let pic4 = makeDiv('projectPicture','ps4');
  let pic5 = makeDiv('projectPicture','ps5');
  let pic6 = makeDiv('projectPicture','ps6');
  let pic7 = makeDiv('projectPicture','ps7');
  let pic8 = makeDiv('projectPicture', 'ps8');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  picsHolder.appendChild(projectPicsCol1);
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

function renderKimono(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'For this assignment, students were required to reinvent the classic kimono while incorporating a pre-assigned red fabric. The final garment can be worn as shown or reversed to mimic the more traditional kimono style.';
  //container.appendChild(description);
  let pic1 = makeDiv('projectPicture','kimono1');
  let pic2 = makeDiv('projectPicture','kimono2');
  let pic3 = makeDiv('projectPicture','kimono3');
  let pic4 = makeDiv('projectPicture','kimono4');
  let pic5 = makeDiv('projectPicture','kimono5');
  let pic6 = makeDiv('projectPicture','kimono6');
  let pic7 = makeDiv('projectPicture','kimono7');
  let picsHolder = makeDiv('projectPicsHolder', 'projectPicsHolder');
  let projectPicsCol1 = makeDiv('projectPicsCol1', 'projectPicsCol1');
  picsHolder.appendChild(projectPicsCol1);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
  projectPicsCol1.appendChild(pic6);
  projectPicsCol1.appendChild(pic7);
  container.appendChild(picsHolder);
}

function renderLittleBlackDress(){
  let container = getContainer();
  let description = document.getElementById('projectDescription');
  description.innerHTML = 'The goal for this assignment was to create a zero waste little black dress displayed alongside “The Little Black Dress: Through the Decades” exhibition at the Saint Louis History Museum. Symmetry, sleeves, and the minimization of waste were three key requirements for this project.';
  //container.appendChild(description);
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
  projectPicsCol1.style.marginLeft = '12vw';
  picsHolder.appendChild(projectPicsCol1);
  //picsHolder.appendChild(projectPicsCol2);
  projectPicsCol1.appendChild(pic1);
  projectPicsCol1.appendChild(pic2);
  projectPicsCol1.appendChild(pic3);
  projectPicsCol1.appendChild(pic4);
  projectPicsCol1.appendChild(pic5);
//  projectPicsCol1.appendChild(pic6);
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
  resume.src = 'resources/css/images/homepage/adriaresumesmaller.jpg';
  resume.width = 850;
  resume.height = 1100;
  resume.classList.add('resumeImage');
  resumeHolder.appendChild(resume);
  container.appendChild(resumeHolder);
}

function renderContact(){
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let container = getContainer();
  let page = document.getElementById('projectPage');
  if(page!=null){
    emptyDiv(page);
    page.parentNode.removeChild(page);
  }
  emptyDiv(container);
  contactPageHolder = makeDiv('contactPageHolder','contactPageHolder');
  let contactpanel = createContactPanel();
  let contactImage = makeDiv('contactImage','contactImage');
  if(width < 500){
    contactImage.style.width = '50vw';
    contactImage.style.background = 'url(images/homepage/ps/ps8smaller.jpg) right top;'
  }
  contactPageHolder.appendChild(contactImage);
  container.appendChild(contactPageHolder);
  contactPageHolder.appendChild(contactpanel);
  container.style.paddingTop = '150px';
  myScrollSpecific(0,0);
}

function addSplashImages(){
  for(var i = 0; i < 4; i++){
    let splashimage = makeDiv('splashimage', 'splashimage' + i);
    if(i==0){
      splashimage.style.marginLeft = '0px';
      //let splashimage0 = document.getElementById('splashimage0');
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
    button.style.paddingRight = '3vh';
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
    manualGrow(imagesDiv[0],100,2);
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
    view('HOME');
    //myScroll(document.getElementById('splash'),5);
  });
}

//add the 4 pages to the navbar
function renderNavBar(pages){
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  pages.forEach(function(item){
    let button = makeDiv('navbutton', 'navbutton' + item);
    if(width < 500){
      button.style.marginRight = '3vh';
      button.style.fontSize = '3.3vmin';
    }
    button.innerHTML = item;
    if(item == 'HOME'){
      button.style.color = 'white';
    }
    else{
      button.style.color = 'white'
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
      div.style.color = 'white';
      //div.style.fontSize = '2.5vmin'
    });
    //button.style.color = 'white';
    underline.style.width = '0px';

    var dropdown = document.getElementById('dropDownMenu');
    if(dropdown!=null){
      if(dropdownout && page!='PORTFOLIO'){
        dropdown.style.visibility = 'hidden';
        dropdownout = 0;
      }
    }

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
    myScroll(document.getElementById('container'),.001);
  });
}

function createContactPanel(){
  let contactholder = makeDiv('contactpanel','contactpanel');
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
  form.action = "https://formspree.io/henrywow.phelps@gmail.com";
  form.method = "POST";

  let nameInput = document.createElement('input');
  nameInput.style.border = 'solid #1f2021 2px';
  nameInput.classList.add('nameInput');
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name","name");
  nameInput.setAttribute("placeholder", "Name");

  let addressInput = document.createElement('input');
  addressInput.style.border = 'solid #1f2021 2px';
  addressInput.classList.add('addressInput');
  addressInput.setAttribute("type","email");
  addressInput.setAttribute("name","email");
  addressInput.setAttribute("placeholder","Email Address");

  let emailInput = document.createElement('textarea');
  emailInput.style.border = 'solid #1f2021 2px';
  emailInput.classList.add('emailInput');
  emailInput.setAttribute("type", "message");
  emailInput.setAttribute("name","message");
  emailInput.setAttribute("placeholder", "Message...");

  let submitInput = document.createElement('input');
  submitInput.classList.add('submitInput');
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value","SEND");

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


function scrollRight(div, amount, max, speed){
  let curr = div.scrollLeft;
  let maxScroll = div.scrollWidth - div.clientWidth;
  if(curr+max > maxScroll){
    max = maxScroll-curr;
  }
  var int = setInterval(function(){
    div.scrollLeft+=amount;
    //console.log(opacity);
    if(Math.abs(div.scrollLeft-curr) >= max)clearInterval(int);
  }, speed);
}

function scrollLeft(div, amount, max, speed){
  let curr = div.scrollLeft;
  if(curr-max <0){
    max = 0;
  }
  console.log(curr);
  //console.log(max);
  var int = setInterval(function(){
    div.scrollLeft -= amount;
    console.log(div.scrollLeft);
    if(Math.abs(div.scrollLeft-curr) >= max) clearInterval(int);
  },speed);
}
//************************************
//************************************
