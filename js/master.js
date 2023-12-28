//check if there is color in local storage
let mainColor = localStorage.getItem('color_option')
if (mainColor!== null) {//if there is color in local storage
    //set the root color from the localstorage
    document.documentElement.style.setProperty('--main-color',mainColor);
    //check for active class 
    //remove active class from all lis
       document.querySelectorAll('.colors-list li').forEach(li =>{
            li.classList.remove('active');
            //add activ eclass on current li depend on localstorage color
            if (li.dataset.color === mainColor) {
                li.classList.add('active');
            }
       });
}
//random background option
let backgroundOption = true ;
// variable to control background interval
let backgroundInterval ;

//check if ther is background item in local storage
let backgroundLocalItem = localStorage.getItem("background_option");
//chec if backgroundlocalitem in local storage is not Empty
if (backgroundLocalItem !== null ) {
    //remove active class from all spans
    document.querySelectorAll('.random-background span').forEach(ele=>{
        ele.classList.remove('active');
        if (backgroundLocalItem === 'true') {
            backgroundOption = true ;
            //add class active on cliked span
            document.querySelector('.random-background .yes').classList.add('active');
        }else {
            backgroundOption = false ; 
            //add class active on cliked span
            document.querySelector('.random-background .no').classList.add('active');
        };
    });
    
};
//check if there is bullets option in localStorage
let bullets_option_localStorage = localStorage.getItem('bullets-option');
if (bullets_option_localStorage !== null) {
  document.querySelectorAll('.options-box .bullets-option span').forEach(ele =>{
    ele.classList.remove('active');
  });
    if (bullets_option_localStorage === 'show') {
        document.querySelector('.nav-bullets').style.display = 'block';
        document.querySelector('.bullets-option span.yes').classList.add('active');
    }else {
        document.querySelector('.nav-bullets').style.display = 'none';
        document.querySelector('.bullets-option span.no').classList.add('active');
    }
}
//toggle class open on icon gear
let iconGear = document.querySelector('.settings-box .fa-gear');
iconGear.onclick = function(){
    this.parentElement.classList.toggle('open');
};
//switch colors
const colorsLi = document.querySelectorAll('.colors-list li');
//Loop on all of li
colorsLi.forEach(li =>{
    //Click on every li
    li.addEventListener('click',(e)=>{
        //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        //set color on local storage
        localStorage.setItem('color_option',e.target.dataset.color);
        //remove active class from all lis and add to current element
        handleActive(e);
    });
});
 //switch background
 const random_background_spans = document.querySelectorAll('.random-background span');
 //Loop on all spans
 random_background_spans.forEach(span => {
    //click on every span
    span.addEventListener('click',(e)=>{
        //remove active class from all span and add to current span
       handleActive(e);
        //check span clicked randomize bg-imgs or stop randomize
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        };
    });
 });

 //switch'show or hide' bullets 
 let bullets_option = document.querySelectorAll('.options-box .bullets-option span');
 let nav_bullets = document.querySelector('.nav-bullets');
 bullets_option.forEach(ele=>{
    ele.addEventListener('click',(e)=>{
        handleActive(e);
        if (e.target.dataset.display === 'show') {
            nav_bullets.style.display = 'block';
            localStorage.setItem("bullets-option", 'show');
        }else {
            nav_bullets.style.display = 'none';
            localStorage.setItem("bullets-option", 'hide');
        };
    })
 })
//select landing page element
let landingPage = document.querySelector('.landing-page');
//get array of imgs
let imgsArray = ['img-7.jpg','img-2.jpg','img-3.png','img-6.webp'];

//function randomize background
function randomizeImgs(){
    if (backgroundOption === true) {
       backgroundInterval = setInterval(()=>{
            //get random number 
            let randomNum = Math.floor(Math.random() * imgsArray.length);
            //change background img url
            landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNum]})`;
        },10000);
    }
}
randomizeImgs();

//selct skills selector
let skills_section = document.querySelector('.skills');
window.onscroll = function () {
    //skills offset top
    let skillsOffsetTop = skills_section.offsetTop;


    //skills outer height
    let skillsOuterHeight = skills_section.offsetHeight;
    
    //window height
    let windowHeight = this.innerHeight;
    
    //window scroll top 'document is currently scrolled'
    let windowScrollTop = this.scrollY;
   
     if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill => {
            skill.style.cssText = `width: ${skill.dataset.progress}`;
        });
     };
};

//Create popup with the img
let ourGallery = document.querySelectorAll('.gallery .imgs-box img');
ourGallery.forEach(img => {
    img.addEventListener('click',(e)=>{
        //create overlay 
        let overLayDiv = document.createElement('div');
        overLayDiv.classList.add('popup-overlay');
        document.body.appendChild(overLayDiv);

        //create popup box
        let popup_box = document.createElement('div');
        popup_box.classList.add('popup-box');
        
        
        //create the img
        let popup_img = document.createElement('img');
        //set img src
        popup_img.src = img.src;
        popup_box.appendChild(popup_img);
        //append popup to the body
        document.body.appendChild(popup_box); 

        if (img.alt !== null) {
            //ceate heading
            let imgHeading = document.createElement('h3');
            let img_txt = document.createTextNode(img.alt);
            imgHeading.appendChild(img_txt);
            popup_box.appendChild(imgHeading);
        };
        //create close button
        let close_button = document.createElement('span');
        let close_txt = document.createTextNode('x');
        close_button.appendChild(close_txt);
        close_button.className = 'close-button';
        popup_box.appendChild(close_button);

    });
});

//close popup box
document.addEventListener('click',(e) =>{
    if (e.target.className === 'close-button') {
        e.target.parentElement.remove();
        //remove overlay 
        document.querySelector('.popup-overlay').remove();
    }
});

// select all bullets and all links
let allBullets = document.querySelectorAll('.nav-bullets .bullets');
let allLinks = document.querySelectorAll('.landing-page .links a');
//create function to scroll to sections
function scrollToSections(element){
    element.forEach(ele=>{
        ele.addEventListener('click',(e)=>{
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
                behavior : 'smooth'
            });
        });
    });
};

scrollToSections(allBullets);
scrollToSections(allLinks);

//create function to handle active class
function handleActive (ev) {
    //remove active class from all children
    ev.target.parentElement.querySelectorAll('.active').forEach(element =>{
        element.classList.remove('active');
    });
    //add active class to current element
    ev.target.classList.add('active');
};

// reset button
document.querySelector('.settings-box .reset-options').onclick = function () {
    //remove this items from localstorage
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');
    localStorage.removeItem('bullets-option');
    //reload window
    window.location.reload();
}

// toggle menu 
let toggle_button = document.querySelector('.header-area .toggle-menu');
let tLinks = document.querySelector('.header-area .links');
toggle_button.onclick = function (e) {
    //stop propagation 'الانتشار داخل العنصر '
    e.stopPropagation()
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
};


//click any where outside toggle menu
document.addEventListener('click', (e) =>{
     if (e.target !== toggle_button && e.target !== tLinks) {
        //check if the menu is open
        if (tLinks.classList.contains('open')) {
                toggle_button.classList.toggle('menu-active');
                tLinks.classList.toggle('open');
            }
        }
});
// //stop propagation from the links
tLinks.onclick = function (e) {
     e.stopPropagation();
    }