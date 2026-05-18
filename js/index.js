const footer = document.createElement("footer");
const body = document.querySelector("body");

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");

const footer1 = document.querySelector("footer");

copyright.innerHTML = `&copy; Kurstin King ${thisYear}`

footer1.appendChild(copyright);


const skills = ["JavaScript", "HTML", "CSS", "GitHub", "VS Code"];
const skillsSection = document.getElementById('Skills');

const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}