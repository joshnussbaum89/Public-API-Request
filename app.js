const url = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
let employeeData = [];
let index = 0;


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
function closeModal(modal) {
    modal.remove();
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
        const modalPrev = document.querySelector('.modal-prev');
        const modalNext = document.querySelector('.modal-next');

        closeBtn.addEventListener('click', (event) => {
            const closeBtnStrong = document.querySelector('.modal-close-btn strong');
            const eventTarget = event.target;

            if (eventTarget === closeBtn || eventTarget === closeBtnStrong) {
                closeModal(modal);
            }
        })

        modalBtnContainer.addEventListener('click', (event) => {
            closeModal(modal);
            const closeBtnStrong = document.querySelector('.modal-close-btn strong');
            const eventTarget = event.target;

            if (event.target === modalPrev && index > 0) {
                index--;
            } else if (event.target === modalNext && index < 11) {
                index++;
            } else if (eventTarget === closeBtn || eventTarget === closeBtnStrong) {
                closeModal(modal);
            }

            openEmployeeModal(index);
        });
    }
})