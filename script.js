
const addBtn = document.getElementById("addBtn");
const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");


const subjects = document.getElementById("subjects");


const cgpa = document.getElementById("cgpa");
const credits = document.getElementById("credits");
const points = document.getElementById("points");
const overallGrade = document.getElementById("overallGrade");


addBtn.addEventListener("click", () => {

const row = document.createElement("div");

row.className = "row";

row.innerHTML = `

<input type="text"
placeholder="Subject Name"
class="subject">

<input type="number"
placeholder="Credits"
class="credit"
min="1"
max="10">

<input type="number"
placeholder="Marks"
class="marks"
min="0"
max="100">

<input type="text"
class="grade"
readonly>

<input type="text"
class="gp"
readonly>

<button class="delete">

🗑

</button>

`;

subjects.appendChild(row);

});

// -------------------------------
// Delete Row
// -------------------------------

subjects.addEventListener("click", function(e){

if(e.target.classList.contains("delete") ||
e.target.parentElement.classList.contains("delete")){

const row = e.target.closest(".row");

if(document.querySelectorAll(".row").length>1){

row.remove();

}

}

});

// -------------------------------
// Grade Function
// -------------------------------

function getGrade(mark){

if(mark>=90){

return ["S",10];

}

else if(mark>=80){

return ["A",9];

}

else if(mark>=70){

return ["B",8];

}

else if(mark>=60){

return ["C",7];

}

else if(mark>=50){

return ["D",6];

}

else if(mark>=40){

return ["E",5];

}

else{

return ["F",0];

}

}

// -------------------------------
// Overall Grade
// -------------------------------

function overall(cg){

if(cg>=9)

return "Outstanding";

if(cg>=8)

return "Excellent";

if(cg>=7)

return "Very Good";

if(cg>=6)

return "Good";

if(cg>=5)

return "Pass";

return "Fail";

}

// -------------------------------
// Calculate Button
// -------------------------------

calcBtn.addEventListener("click",()=>{

let totalCredits=0;

let totalPoints=0;

const rows=document.querySelectorAll(".row");

rows.forEach(row=>{

const credit=row.querySelector(".credit");

const marks=row.querySelector(".marks");

const grade=row.querySelector(".grade");

const gp=row.querySelector(".gp");

let c=Number(credit.value);

let m=Number(marks.value);

if(isNaN(c)||isNaN(m))
return;

const result=getGrade(m);

grade.value=result[0];

gp.value=result[1];

totalCredits+=c;

totalPoints+=c*result[1];

});

if(totalCredits==0){

alert("Please Enter Subject Details");

return;

}

let finalCgpa=(totalPoints/totalCredits).toFixed(2);

cgpa.innerHTML=finalCgpa;

credits.innerHTML=totalCredits;

points.innerHTML=totalPoints;

overallGrade.innerHTML=overall(finalCgpa);

});
// ==========================================
// Part 3B - Auto Update, Reset & Animations
// ==========================================

// Live Grade Calculation
subjects.addEventListener("input", function (e) {

    if (!e.target.classList.contains("marks"))
        return;

    const row = e.target.closest(".row");

    const marks = Number(e.target.value);

    const gradeBox = row.querySelector(".grade");
    const gpBox = row.querySelector(".gp");

    if (marks >= 0 && marks <= 100) {

        const result = getGrade(marks);

        gradeBox.value = result[0];
        gpBox.value = result[1];

    } else {

        gradeBox.value = "";
        gpBox.value = "";

    }

});

// -------------------------------
// Reset Button
// -------------------------------

resetBtn.addEventListener("click", () => {

    subjects.innerHTML = "";

    addFirstRow();

    cgpa.innerHTML = "0.00";

    credits.innerHTML = "0";

    points.innerHTML = "0";

    overallGrade.innerHTML = "-";

    document.querySelector(".cgpa-circle").style.background =
        "linear-gradient(135deg,#00e5ff,#2979ff,#00ff95,#ff00ff)";

});

// -------------------------------
// Add First Row
// -------------------------------

function addFirstRow() {

    const row = document.createElement("div");

    row.className = "row";

    row.innerHTML = `

<input type="text"
placeholder="Subject Name"
class="subject">

<input type="number"
placeholder="Credits"
class="credit"
min="1"
max="10">

<input type="number"
placeholder="Marks"
class="marks"
min="0"
max="100">

<input type="text"
class="grade"
readonly>

<input type="text"
class="gp"
readonly>

<button class="delete">
🗑
</button>

`;

    subjects.appendChild(row);

}

// -------------------------------
// Animate CGPA Number
// -------------------------------

function animateCGPA(value) {

    let start = 0;

    const end = parseFloat(value);

    const speed = 20;

    const timer = setInterval(() => {

        start += 0.05;

        if (start >= end) {

            start = end;

            clearInterval(timer);

        }

        cgpa.innerHTML = start.toFixed(2);

    }, speed);

}

// -------------------------------
// Color according to CGPA
// -------------------------------

function changeCircleColor(cg) {

    const circle = document.querySelector(".cgpa-circle");

    if (cg >= 9) {

        circle.style.background =
            "linear-gradient(135deg,#00ff99,#00ffcc,#00ffff)";

    }

    else if (cg >= 8) {

        circle.style.background =
            "linear-gradient(135deg,#00b0ff,#2979ff,#651fff)";

    }

    else if (cg >= 7) {

        circle.style.background =
            "linear-gradient(135deg,#ff9800,#ff5722,#ff1744)";

    }

    else if (cg >= 6) {

        circle.style.background =
            "linear-gradient(135deg,#ffd600,#ff9800,#ff5722)";

    }

    else {

        circle.style.background =
            "linear-gradient(135deg,#ff1744,#d50000,#880e4f)";

    }

}

// -------------------------------
// Enhance Calculate Button
// -------------------------------

calcBtn.addEventListener("click", () => {

    const finalCG = parseFloat(cgpa.innerHTML);

    animateCGPA(finalCG);

    changeCircleColor(finalCG);

});

// -------------------------------
// Prevent Invalid Marks
// -------------------------------

subjects.addEventListener("input", function (e) {

    if (e.target.classList.contains("marks")) {

        if (e.target.value > 100)
            e.target.value = 100;

        if (e.target.value < 0)
            e.target.value = 0;

    }

});

// -------------------------------
// Welcome Animation
// -------------------------------

window.onload = () => {

    document.querySelector(".container").style.opacity = "0";

    setTimeout(() => {

        document.querySelector(".container").style.opacity = "1";

    }, 200);

};

console.log("CGPA Calculator Loaded Successfully!");