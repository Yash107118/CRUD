//current date picker
var currentdate = new Date();

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
document.getElementById('meeting_time').min = today;

// document.getElementById('2').checked = true;

//validation check for name
function validate_name() {
    let m = document.forms["dinner_form"]["name"].value;
    if (m == "") {
        document.getElementById('check_name').innerHTML = "*";
        document.getElementById('color1').innerHTML = "Invalid Entry";
        document.getElementById('name').style.borderBottomColor = "red";
        return false;
    }
    document.getElementById('check_name').innerHTML = "";
    document.getElementById('name').style.borderBottomColor = "white";
    document.getElementById('color1').innerHTML = "";
    return true;
}

//validation for mobile number
function validate_number() {
    var phoneno = /^\d{10}$/;
    var number = document.getElementById("phone");
    if ((number.value.match(phoneno))) {
        document.getElementById('check_number').innerHTML = "";
        document.getElementById('phone').style.borderBottomColor = "white";
        document.getElementById('color2').innerHTML = "";
        return true;
    }
    else {
        document.getElementById('check_number').innerHTML = "*";
        document.getElementById('color2').innerHTML = "Invalid Entry";
        document.getElementById('phone').style.borderBottomColor = "red";
        return false;
    }
}

//validation for dropdown menu
function Validate_restaurent() {
    var restaurent = document.getElementById("restaurent");
    if (restaurent.value == "") {
        document.getElementById('check_restaurent').innerHTML = "*";
        document.getElementById('color3').innerHTML = "Invalid Entry";
        document.getElementById('restaurent').style.borderBottomColor = "red";
        return false;
    }
    document.getElementById('check_restaurent').innerHTML = "";
    document.getElementById('restaurent').style.borderBottomColor = "white";
    document.getElementById('color3').innerHTML = "";
    return true;
}

//validation for date
function validate_date() {
    var y = document.getElementById("meeting_time").value;
    if (y == "") {
        document.getElementById('check_date').innerHTML = "*";
        document.getElementById('color4').innerHTML = "Invalid Entry";
        document.getElementById('meeting_time').style.borderBottomColor = "red";
        return false;
    } else {
        document.getElementById('check_date').innerHTML = "";
        document.getElementById('meeting_time').style.borderBottomColor = "white";
        document.getElementById('color4').innerHTML = "";
        return true;
    }

}

//validation for radio button meal option
function validate_meal() {
    var radios = document.getElementsByName("meal");
    var formValid = false;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        document.getElementById('check_meal_error').innerHTML = "";
        document.getElementById('color5').innerHTML = "";
        i++;
    }
    if (!formValid) document.getElementById('check_meal_error').innerHTML = "*";
    if (!formValid) document.getElementById('color5').innerHTML = "Invalid Entry";
    return formValid;
}

//validation for checkbox
function validate_checkbox() {
    if (!document.dinner_form.food[0].checked && !document.dinner_form.food[1].checked && !document.dinner_form.food[2].checked) {
        document.getElementById('check_food_error').innerHTML = "*";
        document.getElementById('color6').innerHTML = "Invalid Entry";
        return false;
    } else {
        document.getElementById('check_food_error').innerHTML = "";
        document.getElementById('color6').innerHTML = "";
        return true;
    }
}

//validation for radio button dining space
function validate_person() {
    var radios = document.getElementsByName("person");
    var formValid = false;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        document.getElementById('check_dining_error').innerHTML = "";
        document.getElementById('color7').innerHTML = "";
        i++;
    }
    if (!formValid) document.getElementById('check_dining_error').innerHTML = "*";
    if (!formValid) document.getElementById('color7').innerHTML = "Invalid Entry";
    return formValid;
}

//reset form values
function reset() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("restaurent").value = "";
    document.getElementById("meeting_time").value = "";
    document.getElementById('Lunch').checked = false;
    document.getElementById('Dinner').checked = false;
    document.getElementById('1').checked = false;
    document.getElementById('2').checked = false;
    document.getElementById('3').checked = false;
    document.getElementById('person1').checked = false;
    document.getElementById('person2').checked = false;
    document.getElementById('person3').checked = false;
    document.getElementById('person4').checked = false;
}


//add data in table on submit
document.querySelector('form').onsubmit = function onsubmit(e) {
    e.preventDefault();
    validate_name(); validate_number(); Validate_restaurent(); validate_date(); validate_meal(); validate_checkbox(); validate_person();

    if (!validate_name() || !validate_number() || !Validate_restaurent() || !validate_date() || !validate_meal() || !validate_checkbox() || !validate_person()) {
        return
    }
    // get data from checkbox
    var food_items = '';
    let foodarray = document.getElementsByClassName("food");
    for (var i = 0, n = foodarray.length; i < n; i++) {
        if (foodarray[i].checked) {
            food_items += "," + foodarray[i].value;
        }
    }

    const formdata = {
        Name: document.querySelector('#name').value,
        Mobile_Number: document.querySelector('#phone').value,
        Restaurent: document.querySelector('#restaurent').value,
        My_Date: document.querySelector('#meeting_time').value,
        Meal: document.querySelector('input[name=meal]:checked').value,
        Foods: food_items,
        Dining_Space: document.querySelector('input[name=person]:checked').value,
    };

    let preItems = getLocalStorage();
    if (!preItems) {
        preItems = [];
    }
    preItems.push(formdata);

    setLocalStorage(preItems);
    console.log(preItems.length);
    const index = preItems.length - 1;
    // Add new row
    let newdata = `<tr id='row${index}'><td id="my_name">${formdata.Name}</td><td>${formdata.Mobile_Number}</td><td>${formdata.Restaurent}</td>
    <td>${formdata.My_Date}</td><td>${formdata.Meal}</td><td>${formdata.Foods}</td><td>${formdata.Dining_Space}</td>
    <td><button type='submit' id="editbtn" onclick="dataEdit('${index}')" ><i class="fa fa-edit"></i>
    </button>      <button type='submit' id="deletebtn" onclick='dataDelete(${index});'><i class="fa fa-trash-o"></i>
    </button></td></tr>`;
    tablebody.innerHTML += newdata;
    reset();
}

/**
 * to set the value in local strorage
 * @param {Array} myItems - pass array to this method
 */
function setLocalStorage(myItems) {
    console.log(myItems, 'in set local storage');
    localStorage.setItem("myItems", JSON.stringify(myItems));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("myItems"));
}

function dataEdit(name) {
    reset();
    const trdata = document.getElementById(`row${name}`);

    document.getElementById("name").value = document.getElementById(`row${name}`).cells[0].innerHTML;
    document.getElementById("phone").value = document.getElementById(`row${name}`).cells[1].innerHTML;
    document.getElementById("restaurent").value = document.getElementById(`row${name}`).cells[2].innerHTML;
    document.getElementById("meeting_time").value = document.getElementById(`row${name}`).cells[3].innerHTML;
    document.getElementById(document.getElementById(`row${name}`).cells[4].innerHTML).checked = true;

    const foodList = document.getElementById(`row${name}`).cells[5].innerHTML;
    const foodItem = foodList.split(',');

    let foodarray = document.getElementsByClassName("food");
    for (var i = 0, n = foodarray.length; i < n; i++) {
        if(foodItem.includes(foodarray[i].value)) {
            foodarray[i].checked = true;
        }
    }

    // document.getElementById(document.getElementById(`row${name}`).cells[6].innerHTML).checked = true;
    // console.log(document.getElementById(`row${name}`).cells[6].innerHTML);
}

//delete data from table
function dataDelete(name) {
    // console.log(name);
    const items = getLocalStorage();
    items.splice(name, 1);
    setLocalStorage(items);
    const row = document.getElementById(`row${name}`);
    row.remove();
}

function setInitData() {
    let items = getLocalStorage();
    // console.log(items);
    items.forEach((item, i) => {
        let newRow = `<tr id='row${i}'><td id="my_name">${item.Name}</td><td>${item.Mobile_Number}</td><td>${item.Restaurent}</td><td>${item.My_Date}</td>
            <td>${item.Meal}</td><td>${item.Foods}</td><td>${item.Dining_Space}</td><td><button type='submit' id="editbtn" onclick="dataEdit('${i}')" >
            <i class="fa fa-edit"></i></button>      <button type='submit' id="deletebtn" onclick="dataDelete(${i});"><i class="fa fa-trash-o"></i>
            </button></td></tr>`;
        tablebody.innerHTML += newRow;
    })
}

//get data from local storage
setInitData();
