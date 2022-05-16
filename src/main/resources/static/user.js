const tableBodyUser = document.querySelector('#tableBodyUser')

fetch(urlUserAuth)
    .then(res => res.json())
    .then(data => {
        let roles = getRoleForUser(data)
        let output = `
            <tr>
                <td> ${data.id} </td>
                <td> ${data.firstName} </td>
                <td> ${data.secondName} </td>
                <td> ${data.age} </td>
                <td> ${data.username} </td>
                <td> ${roles}</td>
            </tr>`
        tableBodyUser.innerHTML = output
    })


