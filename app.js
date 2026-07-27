/* ==========================================
   FORMat
   Version 1.0
   Developed for Gema
========================================== */

const inputText=document.getElementById("inputText");

const extractBtn=document.getElementById("extractBtn");

const clearBtn=document.getElementById("clearBtn");

const pasteBtn=document.getElementById("pasteBtn");

const copyBtn=document.getElementById("copyBtn");

const loading=document.getElementById("loading");

/* ===============================
CLEAR
================================ */

clearBtn.onclick=function(){

inputText.value="";

document.querySelectorAll("input").forEach(function(i){

i.value="";

});

document.getElementById("address").value="";

loading.innerHTML="";

};

/* ===============================
PASTE
================================ */

pasteBtn.onclick=async function(){

try{

const text=await navigator.clipboard.readText();

inputText.value=text;

}catch(e){

alert("Clipboard permission denied.");

}

};

/* ===============================
EXTRACT
================================ */

extractBtn.onclick=function(){

loading.innerHTML="🔍 Extracting Details...";

extractDetails(inputText.value);

loading.innerHTML="";

};

/* ===============================
COPY DETAILS
================================ */

copyBtn.onclick=function(){

let text="";

document.querySelectorAll(".field").forEach(function(field){

const label=field.querySelector("label").innerText;

const input=field.querySelector("input,textarea");

text+=label+": "+input.value+"\n";

});

navigator.clipboard.writeText(text);

alert("Copied Successfully.");

};

/* ===============================
MAIN EXTRACTION ENGINE
================================ */

function extractDetails(text){

fillName(text);

fillEmail(text);

fillMobile(text);

fillDOB(text);

fillAge(text);

fillGender(text);

fillPincode(text);

fillBlood(text);

fillNationality(text);

fillOccupation(text);

fillAddress(text);

}

/* ===============================
NAME
================================ */

function fillName(text){

let m=text.match(/name\s*[:\-]?\s*([A-Za-z ]{3,40})/i);

if(m){

document.getElementById("name").value=m[1].trim();

}

}

/* ===============================
EMAIL
================================ */

function fillEmail(text){

let m=text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

if(m){

document.getElementById("email").value=m[0];

}

}

/* ===============================
MOBILE
================================ */

function fillMobile(text){

let m=text.match(/\b[6-9]\d{9}\b/);

if(m){

document.getElementById("mobile").value=m[0];

}

}

/* ===============================
DOB
================================ */

function fillDOB(text){

let m=text.match(/\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/);

if(m){

document.getElementById("dob").value=m[0];

}

}

/* ===============================
AGE
================================ */

function fillAge(text){

let m=text.match(/\b(\d{1,3})\s*(years|yrs|year)\b/i);

if(m){

document.getElementById("age").value=m[1];

}

}

/* ===============================
GENDER
================================ */

function fillGender(text){

if(/female/i.test(text))

document.getElementById("gender").value="Female";

else if(/male/i.test(text))

document.getElementById("gender").value="Male";

}

/* ===============================
PIN
================================ */

function fillPincode(text){

let m=text.match(/\b\d{6}\b/);

if(m){

document.getElementById("pincode").value=m[0];

}

}

/* ===============================
BLOOD
================================ */

function fillBlood(text){

let m=text.match(/\b(A|B|AB|O)[+-]\b/i);

if(m){

document.getElementById("blood").value=m[0].toUpperCase();

}

}

/* ===============================
NATIONALITY
================================ */

function fillNationality(text){

let m=text.match(/Nationality\s*[:\-]?\s*([A-Za-z ]+)/i);

if(m){

document.getElementById("nationality").value=m[1].trim();

}

}

/* ===============================
OCCUPATION
================================ */

function fillOccupation(text){

let m=text.match(/Occupation\s*[:\-]?\s*([A-Za-z ]+)/i);

if(m){

document.getElementById("occupation").value=m[1].trim();

}

}

/* ===============================
ADDRESS
================================ */

function fillAddress(text){

let m=text.match(/Address\s*[:\-]?\s*([\s\S]{10,250})/i);

if(m){

document.getElementById("address").value=m[1].trim();

}

}
