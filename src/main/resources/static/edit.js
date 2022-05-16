let editModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
})
const inputRolesEdit = document.querySelector('#rolesEdit')
const postEditUser = document.querySelector('#postEditUser')
const idEdit = document.querySelector('#editId')
const emailEdit = document.querySelector('#editEmail')
const passwordEdit = document.querySelector('#editPassword')
const firstNameEdit = document.querySelector('#editFirstName')
const secondNameEdit = document.querySelector('#editSecondName')
const ageEdit = document.querySelector('#editAge')



const eventButton = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

eventButton(document, 'click', '#buttonEditModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML
    addRolesForSelect(inputRolesEdit)

    fetch(urlUser+id)
        .then(res => res.json())
        .then(user => {
            idEdit.value = user.id
            emailEdit.value = user.username
            passwordEdit.value = ''
            firstNameEdit.value = user.firstName
            secondNameEdit.value = user.secondName
            ageEdit.value = user.age
        })

})

postEditUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = idEdit.value
    let readyUrl;
    let values = getSelectValues(inputRolesEdit)
    if(values.length == 0) {
        readyUrl = urlNewUser
    } else {
        readyUrl = urlNewUser + '?inputRoles=' + values
    }
    fetch(readyUrl,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': idEdit.value,
            'email': emailEdit.value,
            'password': passwordEdit.value,
            'firstname': firstNameEdit.value,
            'lastname': secondNameEdit.value,
            'age': ageEdit.value
        })
    })
        .then(() => {
            editModal.hide()
            Array.from(tableBodyAdmin.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML == id) {
                    let currentNode = tr.firstChild
                    currentNode.textContent = idEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = firstNameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = secondNameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = ageEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = emailEdit.value
                    currentNode = currentNode.nextSibling
                    getRoleForUserById(id, currentNode)
                }
            })
        })
})