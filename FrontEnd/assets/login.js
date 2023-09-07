/*PAGE DE CONNEXION*/


async function postData(data) {
    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "Post",
        headers: {
            "content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
 }

 document.getElementById("submit") .addEventListener ("click", (event)=>{
    event.preventDefault()
    console.log(event)
    const data = {
        "email": document.getElementById("useremail").value,
        "password": document.getElementById("userpassword").value
    }
    console.log(data)

    postData (data)
    .then (response=>{
        localStorage.setItem("token", response.token)
        window.location.href='/Frontend/index.html'
    })

 })



