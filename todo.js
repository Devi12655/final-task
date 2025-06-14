let ulelement = document.getElementById("ullist");
let add = document.getElementById("b");
let savebutton = document.getElementById('save')

function getlist() {
    let get = localStorage.getItem("todoitems")
    let parse = JSON.parse(get)
    if (parse === null) {
        return [];
    } else {
        return parse;
    }
}

let todoList = getlist();
//let todoList = [];

savebutton.onclick = function () {
    localStorage.setItem("todoitems", JSON.stringify(todoList))

}
let tlenth = todoList.length;


function check(checkboxId, labelId, todoId) {
    let labelelement = document.getElementById(labelId);
    let ch = document.getElementById(checkboxId);

    labelelement.classList.toggle('checked');

    let index = todoList.findIndex(
        function (eachitem) {
            let eachitemid = "todo" + eachitem.uid
            if (eachitemid === todoId)
                return true
            else
                return false
        })

    let checkindex = todoList[index]
    if (checkindex.ischecked === true)
        checkindex.ischecked = false
    else
        checkindex.ischecked = true
}

function del(todoId) {
    let lielement = document.getElementById(todoId);
    ulelement.removeChild(lielement);                                     
    let todoindex = todoList.findIndex(
        function (eachitem) {
            let eachitemid = "todo" + eachitem.uid;
            if (eachitemid === todoId)
                return true
            else
                return false
        });
    todoList.splice(todoindex, 1);
    console.log(todoList);
}

function createtodo(tod) {

    let todoId = 'todo' + tod.uid;
    let checkboxId = 'checkbox' + tod.uid;
    let labelId = 'label' + tod.uid;


    let lielement = document.createElement('li');
    lielement.classList.add("todoli", "d-flex", "flex-row");
    lielement.id = todoId;
    ulelement.appendChild(lielement);


    let inputelement = document.createElement('input');
    inputelement.type = "checkbox";
    inputelement.classList.add("checkb");
    inputelement.id = checkboxId;
    inputelement.checked=tod.ischecked

    inputelement.onclick = function () {
        check(checkboxId, labelId, todoId);
    }
    lielement.appendChild(inputelement);


    let divelement = document.createElement('div');
    divelement.classList.add("labelcon", "d-flex", "d-row");
    lielement.appendChild(divelement);


    let labelelement = document.createElement("label");
    labelelement.setAttribute("for", checkboxId);
    labelelement.id = labelId;
    labelelement.classList.add("HTML")
    labelelement.textContent = tod.text;

    if(tod.ischecked===true)
        labelelement.classList.add("checked")
    
    divelement.appendChild(labelelement);


    let deldiv = document.createElement('div');
    deldiv.classList.add("del");
    divelement.appendChild(deldiv);


    let delitem = document.createElement('i');
    delitem.classList.add("fa-solid", "fa-trash", "deleteicon");

    delitem.onclick = function () {
        del(todoId);
    }
    deldiv.appendChild(delitem);
}

for (let todo of todoList) {
    createtodo(todo);
}

function addto() {
    let takeinput = document.getElementById("input1");
    let takein = takeinput.value;


    if (takein === "") {
        alert("enter valid text");
        return;
    }

    tlenth += 1;


    let newtodo = {
        text: takein,
        uid: tlenth,
        ischecked: false
    };
    todoList.push(newtodo);

    createtodo(newtodo);
    takeinput.value = "";

}

add.onclick = function () {
    addto();
}


