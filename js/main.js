let tbody = document.getElementById("tbody");
let formModal = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal")
let search = document.getElementById("search")
let searchCards = document.querySelector(".search-cards")
let selectorFilter = document.getElementById("selector-filter");
let locationSelector = document.getElementById("location-selector")
let selectedUser = null;
let ism = document.getElementById("ism");
let familiya = document.getElementById("familiya");
let manzil = document.getElementById("manzil");
let tugilgan = document.getElementById("tugilgan");
let lavozim = document.getElementById("lavozim")
let lavozimT = document.getElementById("lavozim_turi");
let maosh = document.getElementById("maosh");
let uylangan = document.getElementById("uylangan");


let changeBtn = document.getElementById("change-btn")

let students=JSON.parse(localStorage.getItem("student") || "[]");

localStorage.setItem("student", JSON.stringify(students));

function getStudents(content, data){
    content.innerHTML = "";
    data.map((el) => {
        content.innerHTML += `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${el.id}
                                </th>
                                <td class="px-6 py-4">
                                    ${el.firstName}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lastName}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.manzil}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.bornData}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lavozim}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lavozimTuri}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.salary}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.isMarried ? "Uylangan" :"Uylanmagan"}
                                </td>
                                <td class="px-6 py-4">
                                    <button 
                                    onClick="editStudent(${el.id})"
                                    class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                                    </button>
                                    <button
                                    onClick="deleteStudent(${el.id})"
                                    class="px-6 py-4">
                                        <a href="#" class="font-medium text-red-600 hover:underline">Delete</a>
                                    </button>
                                </td>
                            </tr>
                        `
    })
}
getStudents(tbody, students);


formModal.addEventListener("submit" , function(e){
    e.preventDefault();
    let obj = {};

    if(selectedUser){
        students = students.map((el) => {
            if(el.id === selectedUser){
                el.firstName = e.target[0].value;
                el.lastName = e.target[1].value;
                el.manzil = e.target[2].value;
                el.bornData = e.target[3].value;
                el.lavozim = e.target[4].value;
                el.lavozimTuri = e.target[5].value;
                el.salary = e.target[6].value;
                el.isMarried = e.target[7].checked;
            }
            return el;
        }) 
    }else{
        obj.id = students.length + 1;
        obj.firstName = e.target[0].value;
        obj.lastName = e.target[1].value;
        obj.manzil = e.target[2].value;
        obj.bornData = e.target[3].value;
        obj.lavozim = e.target[4].value;
        obj.lavozimTuri = e.target[5].value;
        obj.salary = e.target[6].value;
        obj.isMarried = e.target[7].checked;
        
        students.push(obj);
    }
    getStudents(tbody, students);
    localStorage.setItem("student", JSON.stringify(students));

    outerModal.classList.add("hidden");
    selectedUser = null;

})

outerModal.addEventListener("click" , function(){
    outerModal.classList.add("hidden");
    selectedUser = null;
})
innerModal.addEventListener("click" , function(e){
    e.stopPropagation();
})

add.addEventListener("click", function(){
    changeBtn.textContent = "qo'shish";
    outerModal.classList.remove("hidden")
})

function deleteStudent(id){
    students = students.filter((el) => el.id !== id);
    localStorage.setItem("student", JSON.stringify(students));
    getStudents(tbody, students);

}

function editStudent(id){
    selectedUser = id;
    changeBtn.textContent = "tahrirlash";

    outerModal.classList.remove("hidden")
    let object = students.find((el) => el.id === id);
    ism.value = object.firstName;
    familiya.value = object.lastName;
    manzil.value = object.manzil;
    tugilgan.value = object.bornData;
    lavozim.value = object.lavozim;
    lavozimT.value = object.lavozimTuri;
    maosh.value = object.salary;
    uylangan.checked = object.isMarried;
}



let searchExist = false;
searchExist ? searchCards.classList.remove("hidden") : searchCards.classList.add("hidden");


search.addEventListener("input" , function(e){

    searchCards.innerHTML = "";

    let serachValue = e.target.value;
    let serachProduct = students.filter((el) => el.name.toLowerCase().includes(serachValue.toLowerCase()))
    


    serachValue ? searchExist = true : searchExist = false;
    searchExist ? searchCards.classList.remove("hidden") : searchCards.classList.add("hidden");

    serachProduct.length === 0 ? searchCards.textContent = "Bunday student topilmadi.." : serachProduct.map((el) =>{
        searchCards.innerHTML += `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${el.id}
                                </th>
                                <td class="px-6 py-4">
                                    ${el.firstName}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lastName}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.manzil}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.bornData}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lavozim}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.lavozimTuri}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.salary}
                                </td>
                                <td class="px-6 py-4">
                                    ${el.isMarried ? "Uylangan" :"Uylanmagan"}
                                </td>
                                <td class="px-6 py-4">
                                    <button class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                                    </button>
                                    <button
                                    onClick="deleteStudent(${el.id})"
                                    class="px-6 py-4">
                                        <a href="#" class="font-medium text-red-600 hover:underline">Delete</a>
                                    </button>
                                </td>
                            </tr>
        `
    })

    getStudents(tbody, students);
    localStorage.setItem("student", JSON.stringify(students));

})

selectorFilter.addEventListener("click" , function(e){
    let filterLavozim = e.target.value;
    if(filterLavozim === "Lavozim turini tanlang"){
        filtered = students;

    }else{
        filtered = students.filter((el) => el.lavozimTuri ===  filterLavozim);
    }
    getStudents(tbody, filtered);
})

locationSelector.addEventListener("click" , function (e){
    let filterLocation = e.target.value;
    if(filterLocation === "Manzilni tanlang"){
        filtered = students;
    }else{
        filtered = students.filter((el) => el.manzil ===  filterLocation);
    }
    getStudents(tbody, filtered);

})