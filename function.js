const nameModal = document.getElementById("nameModal");
const nameForm = document.getElementById("nameForm");
const logoutBtn = document.getElementById("logoutBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const isLogged = false;
const Listencontainer = document.getElementById("Listencontainer");

nameForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const isLoggedValue = true;
    localStorage.setItem("isLogged", isLoggedValue);

    //isLogged.value = ""; // Feld leeren
    nameModal.style.display = "none";
    logoutBtn.style.display = "inline-block";
    Listencontainer.style.display = "block";
});

//anmeldefenster


window.addEventListener("load", function() {
    const isLogged = localStorage.getItem("isLogged");


    if(isLogged) {
        // User ist eingeloggt, Modal nicht anzeigen
        nameModal.style.display = "none";
            logoutBtn.style.display = "inline-block";
        console.log("User ist bereits eingeloggt:", username);
        Listencontainer.style.display = "block"
    
    } else {
        // Modal anzeigen
        nameModal.style.display = "flex";
            logoutBtn.style.display = "none";
            Listencontainer.style.display = "block";
    }
});

logoutBtn.addEventListener("click", function() {
    // Daten aus Local Storage löschen
    localStorage.removeItem("isLogged");
    username.value = null;
    password.value = null;
    // Modal wieder anzeigen
    nameModal.style.display = "flex";

    // Logout+liste wieder vertsecken
    logoutBtn.style.display = "none";
    Listencontainer.style.display = "none";



});







var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul")
var item = document.getElementsByTagName("li")

function saveList() {           //local storage erstellen 
    let itemsArray = [];
    for (let i = 0; i < item.length; i++) {
        itemsArray.push({
            text: item[i].firstChild.textContent,
            done: item[i].classList.contains("done")
        });
    }
    localStorage.setItem("todoList", JSON.stringify(itemsArray));
}



function inputLength() {
    return input.value.length;
}


function listLength() {
    return item.length;
}

function
    createListElement() {
    var li = document.createElement("li"); // ertsellt ein element "li"
    
    
    li.appendChild(document.createTextNode(input.value)); //text wird von input zum li
    ul.appendChild(li); //schreibt li in die ul 
        saveList();
    input.value = ""; //leert das inputfeld

    function crossout() {
        li.classList.toggle("done");
            saveList();
    }
    li.addEventListener("click", crossout);

    var dBtn = document.createElement("Button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteListItem);

    function deleteListItem() {
        li.remove();
            saveList();
    }

}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        createListElement();
    }
}

function loadList() {       // läd die liste neu 
    let savedItems = JSON.parse(localStorage.getItem("todoList"));
    if (savedItems) {
        savedItems.forEach(function(itemData) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(itemData.text));
            if (itemData.done) {
                li.classList.add("done");
            }
            ul.appendChild(li);

            function crossout() {
                li.classList.toggle("done");
                saveList();
            }
            li.addEventListener("click", crossout);

            var dBtn = document.createElement("Button");
            dBtn.appendChild(document.createTextNode("X"));
            li.appendChild(dBtn);
            dBtn.addEventListener("click", function deleteListItem() {
                li.remove();
                saveList();
            });
        });
    }
}

loadList(); // ruft die Funktion sofort beim Laden auf


enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

