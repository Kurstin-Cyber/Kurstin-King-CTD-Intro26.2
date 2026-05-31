const footer = document.createElement("footer");
const body = document.querySelector("body");

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");



copyright.innerHTML = `&copy; Kurstin King ${thisYear}`

footer.appendChild(copyright);


const skills = ["JavaScript", "HTML", "CSS", "GitHub", "VS Code"];
const skillsSection = document.getElementById('Skills');

const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.querySelector('[name="leave_message"]');

messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const usersName = event.target.usersName.value;
    const usersEmail= event.target.usersEmail.value;
    const usersMessage= event.target.usersMessage.value;
    
    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector('ul');

    
    const newMessage = document.createElement("li");

    newMessage.innerHTML= `<a href= "mailto:${usersEmail}"> ${usersName}</a> : <span class="message-text">${usersMessage}</span>`;


    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.type = "button";
    editButton.addEventListener('click', () => {
        const messageSpan = newMessage.querySelector('.message-text');
        const currentText = messageSpan.textContent;
        const updatedText = prompt("Edit your message:", currentText);

        if(updatedText !== null && updatedText.trim() !== "") {
            messageSpan.textContent = updatedText;
        }
    });
    newMessage.appendChild(editButton);
    
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener('click', event => {
        const entry = removeButton.parentNode;
        entry.remove();

        toggleMessagesSection();
        
    });
    
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();

   toggleMessagesSection();
    
   

});


 function toggleMessagesSection() { 
        const messageSection = document.getElementById("messages");
        const heading = messageSection.querySelector('h2');
        if(!messageSection) return;

        const messageList = messageSection.querySelector('ul');

        if(!messageList || messageList.children.length === 0){
            messageSection.style.display = "none";
            if(heading) heading.style.display = 'none';
        } else {
            messageSection.style.display = "flex";
            if(heading) heading.style.display = "block";
        }
    }

    document.addEventListener("DOMContentLoaded", event =>{
          toggleMessagesSection();
    });


 fetch('https://api.github.com/users/Kurstin-Cyber/repos')

    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not detected');
        }
        return response.json();
    })

    .then(repositories => {
        const projectSection = document.getElementById('Projects');
        const projectList = projectSection.querySelector('ul');

        for(let i = 0;  i < repositories.length; i++){
        const project = document.createElement('li');
        project.innerText = repositories[i].name;
        projectList.appendChild(project);
    }
        console.log(repositories);
    })

    .catch(error => {
        console.log('Catch block successfully fired!');
        const projectSection = document.getElementById('Projects');
        
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Sorry that repository is not available at this time. Please try again later.';
        errorMessage.style.color = '#e67e22';
        errorMessage.style.textAlign = 'center';
        projectSection.appendChild(errorMessage);
        
    });


    