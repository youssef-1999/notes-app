let title = document.querySelector("#text");
let content = document.querySelector("#content");
let myRow = document.querySelector("#myRow");
let myBtn = document.querySelector("#myBtn");
let notesList = [];
let globalIndex;

function addToLocalStorage() {
    localStorage.setItem("NotesList", JSON.stringify(notesList));
}

if (localStorage.getItem("NotesList")) {
    notesList = JSON.parse(localStorage.getItem("NotesList"));
    displayNotes(notesList);
}

function addNotes() {
    let trimmedTitle = title.value.trim();
    let trimmedContent = content.value.trim();

    if (trimmedTitle.length === 0 || trimmedContent.length === 0) {
        alert("you have to add title and content ")
        return; // Do nothing if either title or content is empty
    }

    if (myBtn.innerHTML == "Add") {
        var Notes = {
            title: trimmedTitle,
            content: trimmedContent
        };
        notesList.push(Notes);
    } else if (myBtn.innerHTML == "Update") {
        notesList[globalIndex].title = trimmedTitle;
        notesList[globalIndex].content = trimmedContent;
        myBtn.innerHTML = "Add";
    }
    displayNotes(notesList);
    addToLocalStorage();
    clearInputs();
}

function clearInputs() {
    title.value = '';
    content.value = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        addNotes();
    }
});

function updateNotes(index) {
    globalIndex = index;
    title.value = notesList[index].title;
    content.value = notesList[index].content;
    myBtn.innerHTML = "Update";
    console.log(index);
}

function removeNote(index) {  
    notesList.splice(index, 1);
    displayNotes(notesList);
    addToLocalStorage();
}

function displayNotes(nList) {
    console.log(nList);
    let cartona = '';
    if (nList.length === 0) {
        cartona = '<h1 class="text-center">There is no Notes Found</h1>';
    } else {
        for (let i = 0; i < nList.length; i++) {
            const contentPreview = nList[i].content.length > 100 ? nList[i].content.substring(0, 100) + '...' : nList[i].content;
            const readMoreButton = nList[i].content.length > 100 ? `<button onclick="toggleContent(${i})" class="btn btn-link">Read More</button>` : '';

            cartona += `
            <div class="col-md-4">
                <div class="test rounded rounded-5 p-2 border border-black my-4">
                    <span>${i + 1}</span>
                    <h1>${nList[i].title}</h1>
                    <p id="noteContent${i}">${contentPreview}</p>
                    ${readMoreButton}
                    <button onclick="removeNote(${i})" class="btn btn-danger text-white rounded rounded-2"> Delete</button>
                    <button onclick="updateNotes(${i})" class="btn btn-primary text-white rounded rounded-2"> Update</button>
                </div>
            </div>
            `;
        }
    }
    myRow.innerHTML = cartona;
}

function toggleContent(index) {
    const noteContent = document.getElementById(`noteContent${index}`);
    if (noteContent.innerText.endsWith('...')) {
        noteContent.innerText = notesList[index].content;
        noteContent.nextElementSibling.innerText = 'Read Less';
    } else {
        noteContent.innerText = notesList[index].content.substring(0, 100) + '...';
        noteContent.nextElementSibling.innerText = 'Read More';
    }
}
