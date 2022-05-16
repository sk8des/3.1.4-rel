let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: false
})
const inputRolesDelete = document.querySelector('#deleteRoles')
const postDeleteUser = document.querySelector('#postDeleteUser')
const idDelete = document.querySelector('#deleteId')
const emailDelete = document.querySelector('#deleteEmail')
const firstNameDelete = document.querySelector('#deleteFirstName')
const secondNameDelete = document.querySelector('#deleteSecondName')
const ageDelete = document.querySelector('#deleteAge')

eventButton(document, 'click', '#buttonDeleteModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML
    addRolesForSelectById(inputRolesDelete, id)

    fetch(urlUser+id)
        .then(res => res.json())
        .then(user => {
            idDelete.value = user.id
            emailDelete.value = user.username
            firstNameDelete.value = user.firstName
            secondNameDelete.value = user.secondName
            ageDelete.value = user.age
        })

})

postDeleteUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = idDelete.value
    fetch(urlUser + id,{
        method: 'DELETE'
    })
        .then(() => {
            deleteModal.hide()
            Array.from(tableBodyAdmin.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML === id) {
                    tr.parentNode.removeChild(tr)
                }
            })
        })
})