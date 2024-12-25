let elForm = document.querySelector(".login-form")
let elLoginBtn = document.querySelector(".login-btn")

elForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    elLoginBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] mx-auto">`

    if(data.username == "Bexruz" && data.password == "123"){
        setTimeout(() => {
            elLoginBtn.innerHTML = "Sign up"
            localStorage.setItem("user", JSON.stringify(data))
            location.pathname = "./students.html"
        },1000)
    }
    else{
        setTimeout(() => {
            elLoginBtn.innerHTML = `wrong password`
        },1000)
        setTimeout(() => {
            elLoginBtn.innerHTML = `Sign up`
        },2500)
    }
    e.target.reset();
})