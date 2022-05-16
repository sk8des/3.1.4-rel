let tableBodyAdmin = document.querySelector('#tableBodyAdmin')

function showUser(user, tableBody) {
    let tr = null
    let td = null
    tr = document.createElement('tr')
    td = document.createElement('td')
    td.textContent = user.id
    tr.appendChild(td)
    td = document.createElement('td')
    td.textContent = user.firstName
    tr.appendChild(td)
    td = document.createElement('td')
    td.textContent = user.secondName
    tr.appendChild(td)
    td = document.createElement('td')
    td.textContent = user.age
    tr.appendChild(td)
    td = document.createElement('td')
    td.textContent = user.username
    tr.appendChild(td)
    td = document.createElement('td')
    td.textContent = getRoleForUser(user)
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerHTML += `
            <button type="button" id="buttonEditModalOpen" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
    `
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerHTML += `
            <button type="button" id="buttonDeleteModalOpen" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
    `
    tr.appendChild(td)

    tableBody.appendChild(tr)
}

fetch(urlUsers)
    .then(res => res.json())
    .then(users => {
        users.forEach(user => {
            showUser(user, tableBodyAdmin)
        })
    })