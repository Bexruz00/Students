let elUsername = document.querySelector(".username")
const user = JSON.parse(localStorage.getItem("user"))
elUsername.textContent = user.username

let studentsList = JSON.parse(localStorage.getItem("students")) || []
let elStudentsCard = document.querySelector(".studentsCard")

let date = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const time = `${String(date.getDate()).padStart(2, "0")}-${months[date.getMonth()]}, ${date.getFullYear()}`;


// ----- render pard ------
function renderStudents(arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.innerHTML = `
       <div class="flex justify-between pt-[20px] px-[30px]">
              <div class="border-b-[1px] border-solid border-[#E5E5E5] flex items-center justify-between w-full pb-[20px]">
                <strong class="addStudentName font-bold text-[17px] leanding-[20px] text-black">${item.name}</strong>
              </div>
            </div>
            <div class="bg-white relative mt-[41px] w-[592px] rounded-[8px] min-h-[390px] p-[28px] flex gap-[50px]">
              <div class="w-[220px] h-[220px] rounded-[8px] overflow-hidden">
                <img class="w-[220px] h-[220px]" src="${item.imgURL}" alt="students">
              </div>
              <div class="flex flex-col justify-center gap-[15px] h-[220px]">
                <div class="flex flex-col">
                  <span class="text-[12px] text-[#ACACAC] font-semibold">Name</span>
                  <strong class="mt-[-8px] text-[16px] font-normal">${item.name}</strong>
                </div>
                <div class="flex flex-col">
                  <span class="text-[12px] text-[#ACACAC] font-semibold">Email</span>
                  <strong class="mt-[-8px] text-[16px] font-normal">${item.Email}</strong>
                </div>
                <div class="flex flex-col">
                  <span class="text-[12px] text-[#ACACAC] font-semibold">Phone</span>
                  <strong class="mt-[-8px] text-[16px] font-normal">${item.telPhone}</strong>
                </div>
                <div class="flex flex-col">
                  <span class="text-[12px] text-[#ACACAC] font-semibold">Date admission</span>
                  <strong class="mt-[-8px] text-[16px] font-normal">${time}</strong>
                </div>
              </div>
              <img class="absolute top-[28px] right-[28px]" src="images/pencil.svg" alt="icon">
            </div>
        `
        list.append(elItem)
    })
}
renderStudents(studentsList, elStudentsCard)
// ----- render pard ------


// ------- AdminImg -------
function addAdminImg() {
    let elAdminInput = document.querySelector(".userImg");
    let elAdminImg = document.querySelector(".edit-img");
    
    let addImg = localStorage.getItem("userImg");
    if (addImg) {
      elAdminImg.src = addImg;
    }
    
    elAdminInput.addEventListener("change", function (e) {
      let imgURL = URL.createObjectURL(e.target.files[0]);
      elAdminImg.src = imgURL;
      localStorage.setItem("userImg", imgURL); 
    });
  }
  addAdminImg();
  // ------- AdminImg -------