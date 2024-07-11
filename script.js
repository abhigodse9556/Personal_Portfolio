var typed = new Typed('#element', {
    strings: ['<i>Full Stack Developer.</i>', 'Front End Developer.', 'Back End Developer.', 'Cloud Engineer.'],
    typeSpeed: 100,
    loop: true,
    loopcount: Infinity,
});

function displayHome(){
    document.getElementById("home-content").style.display="flex";
    document.getElementById("about-content").style.display="none";
    document.getElementById("resume-content").style.display="none";
    document.getElementById("project-content").style.display="none";
    document.getElementById("contact-content").style.display="none";
}

function displayAbout(){
    document.getElementById("home-content").style.display="none";
    document.getElementById("about-content").style.display="flex";
    document.getElementById("resume-content").style.display="none";
    document.getElementById("project-content").style.display="none";
    document.getElementById("contact-content").style.display="none";
}

function displayResume(){
    document.getElementById("home-content").style.display="none";
    document.getElementById("about-content").style.display="none";
    document.getElementById("resume-content").style.display="flex";
    document.getElementById("project-content").style.display="none";
    document.getElementById("contact-content").style.display="none";
}

function displayProject(){
    document.getElementById("home-content").style.display="none";
    document.getElementById("about-content").style.display="none";
    document.getElementById("resume-content").style.display="none";
    document.getElementById("project-content").style.display="flex";
    document.getElementById("contact-content").style.display="none";
}

function displayContact(){
    document.getElementById("home-content").style.display="none";
    document.getElementById("about-content").style.display="none";
    document.getElementById("resume-content").style.display="none";
    document.getElementById("project-content").style.display="none";
    document.getElementById("contact-content").style.display="flex";
}

function displaycrtfAll(){
    document.getElementById("crtf-all").style.display="flex";
    document.getElementById("crtf-programming").style.display="none";
    document.getElementById("crtf-web").style.display="none";
    document.getElementById("crtf-cloud").style.display="none";
    document.getElementById("crtf-generic").style.display="none";
}

function displaycrtfProgramming(){
    document.getElementById("crtf-all").style.display="none";
    document.getElementById("crtf-programming").style.display="flex";
    document.getElementById("crtf-web").style.display="none";
    document.getElementById("crtf-cloud").style.display="none";
    document.getElementById("crtf-generic").style.display="none";
}

function displaycrtfWeb(){
    document.getElementById("crtf-all").style.display="none";
    document.getElementById("crtf-programming").style.display="none";
    document.getElementById("crtf-web").style.display="flex";
    document.getElementById("crtf-cloud").style.display="none";
    document.getElementById("crtf-generic").style.display="none";
}

function displaycrtfCloud(){
    document.getElementById("crtf-all").style.display="none";
    document.getElementById("crtf-programming").style.display="none";
    document.getElementById("crtf-web").style.display="none";
    document.getElementById("crtf-cloud").style.display="flex";
    document.getElementById("crtf-generic").style.display="none";
}

function displaycrtfGeneric(){
    document.getElementById("crtf-all").style.display="none";
    document.getElementById("crtf-programming").style.display="none";
    document.getElementById("crtf-web").style.display="none";
    document.getElementById("crtf-cloud").style.display="none";
    document.getElementById("crtf-generic").style.display="flex";
}

const panels = document.querySelectorAll('.resume-panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('wide')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('wide')
    })
}