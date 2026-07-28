/* ==========================================
   FORMat
   Version 2.0
   Smart Extraction Engine
   Developed for Gema
========================================== */

const inputText=document.getElementById("inputText");

const extractBtn=document.getElementById("extractBtn");

const clearBtn=document.getElementById("clearBtn");

const pasteBtn=document.getElementById("pasteBtn");

const copyBtn=document.getElementById("copyBtn");

const loading=document.getElementById("loading");

/* ==========================================
CLEAR
========================================== */

clearBtn.onclick=function(){

inputText.value="";

document.querySelectorAll("input").forEach(function(i){

i.value="";

});

document.querySelectorAll("textarea").forEach(function(t){

if(t.id!="inputText"){

t.value="";

}

});

loading.innerHTML="";

};

/* ==========================================
PASTE
========================================== */

pasteBtn.onclick=async function(){

try{

const txt=await navigator.clipboard.readText();

inputText.value=txt;

}catch{

alert("Clipboard Permission Denied");

}

};

/* ==========================================
COPY
========================================== */

copyBtn.onclick=function(){

let data="";

document.querySelectorAll(".field").forEach(function(field){

const label=field.querySelector("label").innerText;

const value=field.querySelector("input,textarea").value;

data+=label+" : "+value+"\n";

});

navigator.clipboard.writeText(data);

alert("Copied Successfully");

};

/* ==========================================
EXTRACT BUTTON
========================================== */

extractBtn.onclick=function(){

loading.innerHTML="🔍 Reading Paragraph...";

const txt=inputText.value;

extractEverything(txt);

loading.innerHTML="";

};

/* ==========================================
MASTER ENGINE
========================================== */

function extractEverything(text){

fillName(text);

fillFather(text);

fillMother(text);

fillDOB(text);

fillAge(text);

fillGender(text);

fillOccupation(text);

fillEducation(text);

fillMobile(text);

fillEmail(text);

fillAddress(text);

fillCity(text);

fillState(text);

fillPincode(text);

fillBlood(text);

fillNationality(text);

}
/* ==========================================
NAME
========================================== */

function fillName(text){

let patterns=[

/my name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i,

/name\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i,

/i am\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("name").value=m[1].trim();

return;

}

}

}

/* ==========================================
FATHER
========================================== */

function fillFather(text){

let patterns=[

/s\/o\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i,

/son of\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i,

/father'?s name\s*[:\-]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("father").value=m[1].trim();

return;

}

}

}

/* ==========================================
MOTHER
========================================== */

function fillMother(text){

let patterns=[

/mother'?s name\s*[:\-]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i,

/d\/o\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("mother").value=m[1].trim();

return;

}

}

}

/* ==========================================
AGE
========================================== */

function fillAge(text){

let patterns=[

/(\d{1,3})\s+years?\s+old/i,

/age\s*[:\-]?\s*(\d{1,3})/i,

/(\d{1,3})\s+yrs?/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("age").value=m[1];

return;

}

}

}

/* ==========================================
GENDER
========================================== */

function fillGender(text){

if(/\bfemale\b/i.test(text)){

document.getElementById("gender").value="Female";

return;

}

if(/\bmale\b/i.test(text)){

document.getElementById("gender").value="Male";

return;

}

if(/\bgirl\b/i.test(text)){

document.getElementById("gender").value="Female";

return;

}

if(/\bboy\b/i.test(text)){

document.getElementById("gender").value="Male";

return;

}

}
/* ==========================================
DATE OF BIRTH
========================================== */

function fillDOB(text){

let patterns=[

/date of birth\s*(is|:)?\s*([A-Za-z]{3,9}\.? ?\d{1,2},? ?\d{4})/i,

/date of birth\s*(is|:)?\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i,

/born on\s*([A-Za-z]{3,9}\.? ?\d{1,2},? ?\d{4})/i,

/born on\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("dob").value=m[m.length-1].trim();

return;

}

}

}

/* ==========================================
OCCUPATION
========================================== */

function fillOccupation(text){

let patterns=[

/i am a[n]?\s+([A-Za-z ]+)/i,

/occupation\s*[:\-]?\s*([A-Za-z ]+)/i,

/profession\s*[:\-]?\s*([A-Za-z ]+)/i,

/working as\s+([A-Za-z ]+)/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

let job=m[1].trim();

job=job.split(".")[0];

job=job.split(",")[0];

document.getElementById("occupation").value=job;

return;

}

}

}

/* ==========================================
EDUCATION
========================================== */

function fillEducation(text){

let patterns=[

/studied in\s+([A-Za-z0-9 ]+)/i,

/study in\s+([A-Za-z0-9 ]+)/i,

/class\s+([A-Za-z0-9]+)/i,

/completed\s+([A-Za-z0-9 ]+)/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("occupation").value +=
(document.getElementById("occupation").value ? " | " : "") +
"Education: "+m[1].trim();

return;

}

}

}

/* ==========================================
ADDRESS
========================================== */

function fillAddress(text){

let patterns=[

/r\/o\s+([^.,\n]+)/i,

/resident of\s+([^.,\n]+)/i,

/address\s*[:\-]?\s*([^.\n]+)/i,

/living at\s+([^.\n]+)/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("address").value=m[1].trim();

return;

}

}

}

/* ==========================================
CITY
========================================== */

function fillCity(text){

let patterns=[

/i live in\s+([A-Za-z ]+)/i,

/city\s*[:\-]?\s*([A-Za-z ]+)/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

let city=m[1].trim();

let old=document.getElementById("address").value;

document.getElementById("address").value=
old+"\nCity : "+city;

return;

}

}

}

/* ==========================================
STATE
========================================== */

function fillState(text){

let states=[

"Delhi",

"Uttar Pradesh",

"Haryana",

"Punjab",

"Rajasthan",

"Bihar",

"Jharkhand",

"Madhya Pradesh",

"Gujarat",

"Maharashtra",

"West Bengal",

"Odisha",

"Tamil Nadu",

"Karnataka",

"Kerala",

"Assam"

];

for(let s of states){

if(text.toLowerCase().includes(s.toLowerCase())){

let old=document.getElementById("address").value;

document.getElementById("address").value=
old+"\nState : "+s;

return;

}

}

}

/* ==========================================
PINCODE
========================================== */

function fillPincode(text){

let m=text.match(/\b\d{6}\b/);

if(m){

document.getElementById("pincode").value=m[0];

}

}
/* ==========================================
MOBILE NUMBER
========================================== */

function fillMobile(text){

let patterns=[

/mobile\s*(number)?\s*(is|:)?\s*([6-9]\d{9})/i,

/contact\s*(number)?\s*(is|:)?\s*([6-9]\d{9})/i,

/phone\s*(number)?\s*(is|:)?\s*([6-9]\d{9})/i,

/\b([6-9]\d{9})\b/

];

for(let p of patterns){

let m=text.match(p);

if(m){

document.getElementById("mobile").value=m[m.length-1];

return;

}

}

}

/* ==========================================
ALTERNATE MOBILE
========================================== */

function fillAlternate(text){

let numbers=text.match(/\b[6-9]\d{9}\b/g);

if(numbers && numbers.length>=2){

document.getElementById("alternate").value=numbers[1];

}

}

/* ==========================================
EMAIL
========================================== */

function fillEmail(text){

let m=text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

if(m){

document.getElementById("email").value=m[0];

}

}

/* ==========================================
BLOOD GROUP
========================================== */

function fillBlood(text){

let m=text.match(/\b(A|B|AB|O)[+-]\b/i);

if(m){

document.getElementById("blood").value=m[0].toUpperCase();

}

}

/* ==========================================
NATIONALITY
========================================== */

function fillNationality(text){

let patterns=[

/nationality\s*(is|:)?\s*([A-Za-z ]+)/i,

/i am an?\s+indian/i,

/i am an?\s+american/i,

/i am an?\s+canadian/i

];

for(let p of patterns){

let m=text.match(p);

if(m){

if(m[2])

document.getElementById("nationality").value=m[2].trim();

else{

document.getElementById("nationality").value=m[0]
.replace(/i am/i,"")
.trim();

}

return;

}

}

}

/* ==========================================
MARITAL STATUS
========================================== */

function fillMarital(text){

if(/married/i.test(text))

document.getElementById("marital").value="Married";

else if(/unmarried/i.test(text))

document.getElementById("marital").value="Unmarried";

else if(/single/i.test(text))

document.getElementById("marital").value="Single";

}

/* ==========================================
IMPROVED ADDRESS
========================================== */

function improveAddress(){

let addr=document.getElementById("address").value;

addr=addr.replace(/\s+/g," ").trim();

document.getElementById("address").value=addr;

}
