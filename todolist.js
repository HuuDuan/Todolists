
var ul = document.querySelector("#todoUl");
var input = document.querySelector("#todoText");
var button = document.querySelector("#todoAdd");

// Thêm công việc

function addToDo() {
        var li = document.createElement("li");

        li.innerHTML = `<p> ${input.value} </p>`

        li.innerHTML += `<div class = "icon" > 
            <i class="fa-solid fa-check"></i> 
            <i class="fa-solid fa-pen"></i>    
            <i class="fa-solid fa-trash"></i>  
        </div>`

        var arrToDoList = [...ul.children];

        var textToDos  = arrToDoList.map(function(todo) {
            return todo.querySelector("p").innerText;
        });

        var check =  textToDos.every(function(todo) {
            return input.value != todo 
        });

        if (check) {
            ul.appendChild(li);
            input.value = "";
        } else {
            alert("  Công việc này đã tồn tại, nhập công việc khác");
            input.value = "";
        }

    function checkDoneToDos() {
        var buttonCheck = document.querySelectorAll(".fa-check");
        // chuyển đổi nodelist của các icon check thành mảng  
        var newArrButtonCheck = [...buttonCheck];

        for ( var i = 0; i < newArrButtonCheck.length; i++) {
           newArrButtonCheck[i].addEventListener("click", function(e) {
            e.target.parentNode.parentNode.childNodes[0].classList.toggle("checkDone");
            e.target.classList.toggle("fa-check");
            e.target.classList.toggle("fa-rotate-right");

           });   
        }
    }

    function editToDos() {
        // lấy tất cả icon pen từ danh sách
        var editButton = document.querySelectorAll(".fa-pen");
        // duyệt qua từng icon pen để thêm sự kiện click
        editButton.forEach((editButton) => {
            editButton.addEventListener("click", function(e) {
                // lấy  phần tử công việc hiện tại mà người dùng muốn chỉnh sửa
                var todoItem = e.target.parentNode.parentNode;
                // lấy nội dung công việc hiện tại từ thẻ p
                var todoText = todoItem.querySelector("p");
                var currentText = todoText.innerText;
                // tạo một input mới với giá trị ban đầu là nội dung công việc
                var inputEdit = document.createElement("input");
                inputEdit.type = "text";
                inputEdit.id = "newInput";
                inputEdit.value = currentText;
                // thay thế thẻ p hiện tại bằng thẻ input mới
                todoItem.replaceChild(inputEdit, todoText);
                
                // thay đổi icon pen thành save khi click
                e.target.classList.remove("fa-pen");
                e.target.classList.add("fa-save");

                // sau khi chỉnh sửa xong và nhấn save thì lưu thay đổi
                e.target.addEventListener("click",  function() {
                    // lấy nội dung mới từ input
                    var newText = inputEdit.value;
                    // tạo một thẻ p mới với nội dung mới
                    var newTodoText = document.createElement("p");
                    newTodoText.innerText = newText;
                    // thay thể input bằng thẻ p mới
                    todoItem.replaceChild(newTodoText, inputEdit);
                    // thay đổi icon save thành pen khi nhấn save
                    e.target.classList.remove("fa-save");
                    e.target.classList.add("fa-pen");
                });
            });
        });
    }

    function deleteTodos() {
        var deleteButton = document.querySelectorAll(".fa-trash");

        deleteButton.forEach((deleteButton) => {
            deleteButton.addEventListener("click", function(e) {

                var todoItem = e.target.parentNode.parentNode;
                ul.removeChild(todoItem);
            });
        });

    }
    deleteTodos()
    editToDos()
    checkDoneToDos();
}
button.addEventListener("click", addToDo)
