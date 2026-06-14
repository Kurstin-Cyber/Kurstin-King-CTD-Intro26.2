const footer = document.querySelector("footer");
const body = document.querySelector("body");

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerHTML = `&copy; Kurstin King ${thisYear}`

footer.appendChild(copyright);


const skills = ["JavaScript", "React", "HTML5", "CSS3", "REST APIs", "ChatGPT API Integration", "GitHub", "VS Code"];
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
    
    const newMessageObj = {
        id: Date.now().toString(),
        name: usersName,
        email: usersEmail,
        text: usersMessage

    };

    const currentMessages = getSavedMessages();
    currentMessages.push(newMessageObj);
    saveMessages(currentMessages);

    renderMessage(newMessageObj);

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
        const savedMessages = getSavedMessages();
        savedMessages.forEach(msg => {
            renderMessage(msg);
        });

          toggleMessagesSection();
    });

    function getSavedMessages() {
        const saved = localStorage.getItem('userMessages');
        return saved ? JSON.parse(saved) : [];
    }

    function saveMessages(messages) {
        localStorage.setItem('userMessages', JSON.stringify(messages));
    }

    function renderMessage(msgObj) {
        const messageSection = document.getElementById('messages');
        const messageList = messageSection.querySelector('ul');
        const newMessage = document.createElement('li');
        const messageDisplay = document.createElement('span');
        messageDisplay.className = 'message-text';
        messageDisplay.innerHTML = `<a href=mail:${msgObj.email}">${msgObj.name}</a> wrote: <span>${msgObj.text} </span>`;
        newMessage.appendChild(messageDisplay);

        const editButton = document.createElement('button');
        editButton.innerText = 'edit';
        editButton.type = 'button';
        editButton.addEventListener('click', () => {
            const messageSpan = newMessage.querySelector('.message-text');
            const currentText = messageSpan.textContent;
            const updatedText = prompt('Edit your message', currentText);

            if(updatedText !== null && updatedText.trim() !== "") {
                messageSpan.textContent = updatedText;

                let currentMessages = getSavedMessages();
                const index = currentMessages.findIndex(m => m.id === msgObj.id);
                if (index !== -1) {
                    currentMessages[index].text = updatedText;
                    saveMessages(currentMessages);
                }
            }
        });
        newMessage.appendChild(editButton);
        
            const removeButton = document.createElement("button");
            removeButton.innerText = "remove";
            removeButton.type = "button";
            removeButton.addEventListener('click', () => {
                newMessage.remove();

                let currentMessages = getSavedMessages();
                currentMessages = currentMessages.filter(m => m.id !== msgObj.id);
                saveMessages(currentMessages);

                toggleMessagesSection();

            });
            newMessage.appendChild(removeButton);
            messageList.appendChild(newMessage);
    }

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
        const projectLink = document.createElement('a');
        projectLink.href = repositories[i].html_url;
        projectLink.target = "_blank";
        projectLink.innerText = repositories[i].name;

        project.appendChild(projectLink);
        if(repositories[i].description) {
            const desc = document.createElement('p');
            desc.innerText = repositories[i].description;
            desc.style.fontSize = '0.9rem';
            project.appendChild(desc);
        }
        
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


    const darkModeToggle = document.getElementById('darkModeToggle');

    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(darkModeToggle) darkModeToggle.innerText ="Light Mode";
    }
    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', ()=>{
            document.body.classList.toggle('dark-mode');
            if(document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerText = 'Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerText = 'Dark Mode';
            }
        })
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.addEventListener('click', (event) =>{
            if(event.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });
    }