function initListeners() {
    //add a listener for submit btn
    $("#submit").on("click", (e) =>{
        //create e.preventDefault to stop all events and prevent reloading page
        e.preventDefault();

        //get information from input boxes 
        let fn = $("#firstName").val(); //first name
        let ln = $("#lastName").val(); //last name
        let age = $("#age").val(); //age
        let em = $("#emailAddress").val(); //email address
        let cs = $("#classes").val(); //classes

         //validation for required fields
         if (!fn || !ln || !age || !em || !cs) {
            alert("All fields are required! Please fill in all the fields.");
            return; //prevent the form from submitting further
        }

       //normalize spaces and remove excessive spaces around commas
       cs = cs.replace(/\s*,\s*/g, ",");
              
       //split on commas, preserving class names with spaces inside (if user types text and not numbers)
       let newArrClass = cs.split(",").filter(item => item.trim() !== '');

        //final array with new class, will be an empty arr to start with 
        let finalClassArray = [];

        //generate an obj based off of vals of the inputs 
        let studentObj = {
            fName: fn,
            lName: ln,
            sAge: age,
            eAddress: em,
            classes: [], //won't be populated yet
        };

        //loop through the classes split, populate arr
        $.each(newArrClass, (idx, newClass) => {
            if (newClass != '') {
                //new var is an obj w/ class name trimmed (removing whitespace only recognizing letters)
                let cl = {
                    className: newClass.trim(),
                };
                //add this to final class array
                finalClassArray.push(cl);
            }
        });
        studentObj.classes = finalClassArray;

        //clear all values after submit btn is clicked
        $("#firstName").val(""); 
        $("#lastName").val("");
        $("#age").val("");
        $("#emailAddress").val("");
        $("#classes").val("");

        //invoke addUser func, passing userObj
        addStudent(studentObj)
    });

    //retrieve student information once get users btn is clicked
    $("#getStudents").on("click", (e) => {
        //invoke the getAllStudents func
        getAllStudents();
    });
}

//add student info into localStorage
function addStudent(student) {
    //use JSON.parse to get data, using localStorage
    let allStudents = JSON.parse(localStorage.getItem("Classes"));

    //push the information into student param
    allStudents.push(student);

    //set the item with local storage in order to retrieve it later, use JSON.stringify
    localStorage.setItem("Classes", JSON.stringify(allStudents));
}

//get all student information
function getAllStudents() {
    $("#studentList").html("");
    let allStudents = JSON.parse(localStorage.getItem("Classes"));
    let studentString = "";
    //foreach to loop through and display each student info remembered
    $.each(allStudents, (idx, student) => {
        studentString += `<p>`;
        studentString += `<b>Student Name</b>: ${student.fName} ${student.lName} <br>`;
        studentString += `<b>Age</b>: ${student.sAge} <br>`;
        studentString += `<b>Email Address</b>: ${student.eAddress} <br>`;
        studentString += `<b>Student Classes</b>: `;

        //create a nested foreach to loop through all student's classes
        $.each(student.classes, (idx, cls) => {
            studentString += `<span>${cls.className} </span>`;
        });
        studentString += `</p>`;
    });

    //add the info on the page
    $("#studentList").html(studentString);
}

function connectToStorage() {

    //check to see if localstorage is there 
    if(localStorage) {
        console.log("Storage detected");
        //getItem name - will be generated in local storage, hold all of our information
        let classes = localStorage.getItem("Classes");

        if (classes) {
            console.log("Already exists", classes);
        } else {
            localStorage.setItem("Classes", "[]");
        }
    } else {
        console.log("No storage detected.");
    }
}

$(document).ready(function () {
    initListeners();
    connectToStorage();
});