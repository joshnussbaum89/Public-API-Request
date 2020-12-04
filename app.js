const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');

fetch(url)
    .then(res => res.json())
    .then(data => displayEmployeeCard(data))
    .catch(error => console.log('Looks like there was a problem', error))



function displayEmployeeCard(employee) {
    const employees = employee.results;
    // console.log(employees[0].location.city)

    employees.forEach(user => gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
    `))

}

