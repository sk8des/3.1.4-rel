const postNewUser = document.querySelector('#postNewUser')
const navUsersTab = document. querySelector('#newUser')
const emailNew = document.querySelector('#newEmail')
const passwordNew = document.querySelector('#newPassword')
const firstNameNew = document.querySelector('#newFirstName')
const secondNameNew = document.querySelector('#newSecondName')
const ageNew = document.querySelector('#newAge')

postNewUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let readyUrl;
    let values = getSelectValues(newRoles)
    if(values.length === 0) {
        readyUrl = urlNewUser
    } else {
        readyUrl = urlNewUser + '?inputRoles=' + values
    }
    fetch(readyUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': emailNew.value,
            'password': passwordNew.value,
            'firstName': firstNameNew.value,
            'secondName': secondNameNew.value,
            'age': ageNew.value
        })
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            navUsersTab.click()
            showUser(res, tableBodyAdmin)
            emailNew.value = ''
            passwordNew.value = ''
            firstNameNew.value = ''
            secondNameNew.value = ''
            ageNew.value = ''
        })
})

function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value);
        }
    }
    return result;
}