const auth = document.querySelector('#nav')

const urlAuth = 'http://localhost:8080/api/users/auth'
const urlRoles = 'http://localhost:8080/api/roles'
const urlUser = 'http://localhost:8080/api/users/'
const urlNewUser = 'http://localhost:8080/api/users'
const urlUserAuth = 'http://localhost:8080/api/users/auth'
const urlUsers = 'http://localhost:8080/api/users'

fetch(urlAuth)
    .then(res => res.json())
    .then(data => {
        auth.textContent = data.username
        auth.textContent += ' with role: ';
        data.authorities.forEach(role => {
                auth.textContent += role.roleName
        })

    })

function getRoleForUser(user){
    let roles = ''
    user.authorities.forEach(role => {
        roles += role.roleName + ' '
    })
    return roles
}