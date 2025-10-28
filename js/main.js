let tbody = document.getElementById("tbody");
let formModal = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal")

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
}
getStudents(tbody, students);


formModal.addEventListener("submit" , function(e){
    e.preventDefault();
    let obj = {};
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
    getStudents(tbody, students);
    localStorage.setItem("student", JSON.stringify(students));

    outerModal.classList.add("hidden");

})

outerModal.addEventListener("click" , function(){
    outerModal.classList.add("hidden");
})
innerModal.addEventListener("click" , function(e){
    e.stopPropagation();
})

add.addEventListener("click", function(){
    outerModal.classList.remove("hidden")
})

function deleteStudent(id){
    students = students.filter((el) => el.id !== id);
    localStorage.setItem("student", JSON.stringify(students));
    getStudents(tbody, students);

}