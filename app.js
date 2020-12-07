const url = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const search = document.querySelector('.search-container');
let employeeData = [];
let index = 0;

// insert searchbar on page load
search.insertAdjacentHTML('beforeend', `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`);

const searchBar = document.querySelector('.search-input');
const searchBarSubmit = document.querySelector('.search-submit');


/* ======================================================================= */
/*                 Fetch Data from Random User Generator API
/* ======================================================================= */


fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployeeCard)
    .catch(error => console.log('Looks like there was a problem', error))


/* ======================================================================= */
/*                            Functions
/* ======================================================================= */


// Display employee cards on page load
function displayEmployeeCard(employee) {
    employeeData = employee;

    employeeData.forEach((user, index) => {
        gallery.insertAdjacentHTML('beforeend', `
            <div class="card" data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `)
    })

}

// Populates HTML for employee modal
function openEmployeeModal(index) {
    const employeeIndex = employeeData[index];
    const date = new Date(employeeIndex.dob.date);

    const modalHTML = `
        <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employeeIndex.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employeeIndex.name.first} ${employeeIndex.name.last}</h3>
                        <p class="modal-text">${employeeIndex.email}</p>
                        <p class="modal-text cap">${employeeIndex.location.city}</p>
                        <hr>
                        <p class="modal-text">${employeeIndex.phone}</p>
                        <p class="modal-text">${employeeIndex.location.street.number} ${employeeIndex.location.street.name}, ${employeeIndex.location.city}, ${employeeIndex.location.state} ${employeeIndex.location.postcode}</p>
                        <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    `

    body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close modal when user clicks 'X'
function closeModal(modal, event) {
    const closeBtnStrong = document.querySelector('.modal-close-btn strong');
    const closeBtn = document.querySelector('.modal-close-btn');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const eventTarget = event.target;

    if (eventTarget === closeBtn
        || eventTarget === closeBtnStrong
        || eventTarget === modalPrev
        || eventTarget === modalNext) {
        modal.remove();
    }
}

function navigateModals(event) {
    const modal = document.querySelector('.modal-container');
    const eventTarget = event.target;
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    closeModal(modal, event);

    if (eventTarget === modalPrev && index > 0) {
        index--;
        openEmployeeModal(index);
    } else if (eventTarget === modalNext && index < 11) {
        index++;
        openEmployeeModal(index);
    } else if (eventTarget === modalPrev && index === 0) {
        openEmployeeModal(index);
    } else if (eventTarget === modalNext && index === 11) {
        openEmployeeModal(index);
    }
}

function searchEmployees() {
    // Search for employees
}


/* ======================================================================= */
/*                            Event Listeners
/* ======================================================================= */


// Listens for user clicks on employee cards, opens modal
gallery.addEventListener('click', e => {
    if (e.target !== gallery) {
        const card = e.target.closest('.card');
        const indexNum = card.getAttribute('data-index');
        index = indexNum;
        openEmployeeModal(index);
    }
});

// Listen for user interaction when modal is open
// If user clicks the 'X', call closeModal
// If user clicks 'Prev' or 'Next' buttons, change modals accordingly
body.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal-container');

    if (modal) {
        const closeBtn = document.querySelector('.modal-close-btn');
        const modalBtnContainer = document.querySelector('.modal-btn-container');

        // Close modal
        closeBtn.addEventListener('click', (event) => {
            closeModal(modal, event);
        })

        // Navigate modals
        modalBtnContainer.addEventListener('click', (event) => {
            navigateModals(event);
        });
    }
});

// Employees are filtered as user types in searchbar
searchBar.addEventListener("keyup", () => {
    const searchName = searchBar.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    const names = document.querySelectorAll(".card-name");

    names.forEach((name, index) => {
        const nameValue = name.textContent.toLowerCase();

        if (nameValue.includes(searchName)) {
            cards[index].style.display = "flex";
        } else {
            cards[index].style.display = "none";
        }
    });
});

// If search bar is empty and submit button is clicked, all employees are returned to grid
searchBarSubmit.addEventListener('click', () => {
    const cards = document.querySelectorAll(".card");
    if (searchBar.value === '') {
        cards.forEach(card => card.style.display = "flex");
    }
});