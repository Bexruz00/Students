let elUsername = document.querySelector(".username")
const user = JSON.parse(localStorage.getItem("user"))
elUsername.textContent = user.username
let elStudentTable = document.querySelector(".student-table")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let elSearchInput = document.querySelector(".search-input")

let studentsList = JSON.parse(localStorage.getItem("students")) || []

let date = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const time = `${String(date.getDate()).padStart(2, "0")}-${months[date.getMonth()]}, ${date.getFullYear()}`;

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


// ------- create tr -------
function hendleAddBtnClick(){
  elModalWrapper.classList.remove("scale-0")
  elModalInner.innerHTML = `
  <form class="add-form flex flex-col items-center justify-center">
  <label>
  <input class="hidden addChooseImg" type="file">
  <div class="addUser">
  <img class="mx-auto add-img"  src="./images/add-img.png" alt="images">
  </div>
  </label>
  <div class="flex items-center justify-center gap-[20px]">
  <div class="flex flex-col items-center justify-center">
  <label class="flex flex-col gap-[5px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Name</span>
  <input autocomplete="off" name="userName" type="text" required placeholder="Enter name" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  <label class="flex flex-col gap-[5px] mt-[15px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Email</span>
  <input autocomplete="off" name="email" type="email" required placeholder="Enter email" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  </div>
  <div class="flex flex-col items-center justify-center">
  <label class="flex flex-col gap-[5px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Phone</span>
  <input autocomplete="off" name="phone" type="tel" required placeholder="Enter phone" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  <label class="flex flex-col gap-[5px] mt-[15px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Number</span>
  <input autocomplete="off" name="number" type="number" required placeholder="Enroll Number" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  </div>
  </div>
  <button type="submit" class="addBtn mt-[33px] w-[193px] h-[41px] bg-[#FEAF00] rounded-[4px] font-medium text-[14px] leanding-[17px] text-white">Add student</button>
  </form>
  `
  
  let elChoseInput = document.querySelector(".addChooseImg")
  let elAddImg = document.querySelector(".add-img")
  elChoseInput.addEventListener("change", function(e){
    elAddImg.src = URL.createObjectURL(e.target.files[0])
    
  })
  
  let elAddBtn = document.querySelector(".addBtn")
  
  let elAddForm = document.querySelector(".add-form")
  elAddForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
      id: studentsList.length ? studentsList[studentsList.length - 1].id + 1 : 1,
      imgUrl: elAddImg.src,
      name: e.target.userName.value,
      Email: e.target.email.value,
      telPhone: e.target.phone.value,
      EnNumber: e.target.number.value
    }
    elAddBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] pb-[15px]  mx-auto">`
    setTimeout(() => {    
      elAddBtn.innerHTML = "Add student"
      studentsList.push(data)
      localStorage.setItem("students", JSON.stringify(studentsList))
      renderStudents(studentsList, elStudentTable)
      elModalWrapper.classList.add("scale-0")
    },1000)
  })
  
}
// ------- create tr -------


// ----------- render part ----------
function renderStudents(arr, list){
  list.innerHTML = null
  arr.forEach(item => {
    let elTr = document.createElement("tr")
    elTr.classList = "flex justify-between items-center bg-white py-[15px] px-[13px] rounded-[8px] mb-[10px]"
    elTr.innerHTML = `
    <td class="h-[50px] w-[65px] overflow-hidden rounded-[8px]">
    <img class="mx-center" src="${item.imgUrl}" width="64" height="55" alt="user" />
    </td>
    <td class="text-center text-[14px] text-black">${item.name}</td>
    <td class="text-center text-[14px] text-black">${item.Email}</td>
    <td class="text-center text-[14px] text-black">${item.telPhone}</td>
    <td class="text-center text-[14px] text-black">${item.EnNumber}</td>
    <td class="text-center text-[14px] text-black">${time}</td>
                    <td class="flex items-end justify-center gap-[15px]">
                      <button onclick="handleAddMore()">
                        <img src="./images/more.svg" alt="more" width="20" />
                      </button>
                      <button onclick="handleEdit(${item.id})">
                        <img src="./images/pen.svg" alt="Edit" width="20" />
                      </button>
                      <button onclick="handleDelete(${item.id})">
                        <img src="./images/delete.svg" alt="Delete" width="20" />
                      </button>
                    </td>
        `
        list.append(elTr)
    })

}
renderStudents(studentsList, elStudentTable)

elModalWrapper.addEventListener("click", function(e){
    (e.target.id == "wrapper" && elModalWrapper.classList.add("scale-0"))
})
// ----------- render part ----------


// Delelete part
function handleDelete(id){
  const deleteIndex = studentsList.findIndex(item => item.id == id)
  studentsList.splice(deleteIndex, 1)
  renderStudents(studentsList, elStudentTable)
  localStorage.setItem("students", JSON.stringify(studentsList))
}
// Delelete part


// Edit part
function handleEdit(id){
  elModalWrapper.classList.remove("scale-0")
  let editStudents = studentsList.find(item => item.id == id)
  elModalInner.innerHTML = `
<form class="add-form flex flex-col items-center justify-center">
  <label>
  <input class="hidden addChooseImg" type="file">
  <div class="addUser">
  <img class="mx-auto add-img"  src="./images/add-img.png" alt="images">
  </div>
  </label>
  <div class="flex items-center justify-center gap-[20px]">
  <div class="flex flex-col items-center justify-center">
  <label class="flex flex-col gap-[5px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Name</span>
  <input autocomplete="off" value="${editStudents.name}" name="userName" type="text" required placeholder="Enter name" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  <label class="flex flex-col gap-[5px] mt-[15px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Email</span>
  <input autocomplete="off" value="${editStudents.Email}" name="email" type="email" required placeholder="Enter email" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  </div>
  <div class="flex flex-col items-center justify-center">
  <label class="flex flex-col gap-[5px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Phone</span>
  <input autocomplete="off" value="${editStudents.telPhone}" name="phone" type="tel" required placeholder="Enter phone" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  <label class="flex flex-col gap-[5px] mt-[15px]">
  <span class="text-[14px] leanding-[17px] text-[#898989] pl-1">Number</span>
  <input autocomplete="off" value="${editStudents.EnNumber}" name="number" type="number" required placeholder="Enroll Number" class="w-[250px] h-[50px] outline-none border-solid border-[1px] border-[#E5E5E5] rounded-[10px] pl-[10px]">
  </label>
  </div>
  </div>
  <button type="submit" class="editBtn mt-[33px] w-[193px] h-[41px] bg-[#FEAF00] rounded-[4px] font-medium text-[14px] leanding-[17px] text-white">Change info</button>
  </form>
  `

  
  let elChoseInput = document.querySelector(".addChooseImg")
  let elAddImg = document.querySelector(".add-img")
  elChoseInput.addEventListener("change", function(e){
    elAddImg.src = URL.createObjectURL(e.target.files[0])
    
  })

  let elAddForm = document.querySelector(".add-form")
  elAddForm.addEventListener("submit", function(e){
      e.preventDefault()
      editStudents.imgUrl = elAddImg.src
      editStudents.name = e.target.userName.value
      editStudents.Email = e.target.email.value
      editStudents.telPhone = e.target.phone.value
      editStudents.EnNumber = e.target.number.value

      let elEditBtn = document.querySelector(".editBtn")
      elEditBtn.innerHTML = `<img src="images/loading.png" width="50px" alt="loading" class="scale-[1.5] mx-auto">`

      setTimeout(() => {
          elEditBtn.innerHTML = "Change Student"
          elModalWrapper.classList.add("scale-0")
          renderStudents(studentsList, elStudentTable)
          localStorage.setItem("students", JSON.stringify(studentsList))
      },1000)
  })

}
// Edit part


// ----- Search input ------
elSearchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  const searchedList = studentsList.filter((item) =>
      item.name.toLocaleLowerCase().includes(value)
  );

  renderStudents(searchedList, elStudentTable)
});
// ----- Search input ------

// ----- sort part -----
let sortIcon = document.querySelector(".sortBtn"); 
sortIcon.addEventListener("click", function () {
    studentsList.sort((a, b) => {
        const fist = a.name.toLowerCase();
        const second = b.name.toLowerCase();
        return fist.localeCompare(second);
    });
    localStorage.setItem("students", JSON.stringify(studentsList));
    renderStudents(studentsList, elStudentTable);
});

// ----- sort part -----