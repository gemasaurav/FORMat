/* ==========================================
FORMat
extractor.js
Version 2.1
Smart Extraction Engine
========================================== */

/* ==========================================
FIND PATTERN
========================================== */

function findPattern(text, patternList){

for(let pattern of patternList){

let match=text.match(pattern);

if(match){

return match[match.length-1].trim();

}

}

return "";

}

/* ==========================================
EXTRACT DATA
========================================== */

function extractData(text){
function cleanValue(value){

if(!value) return "";

return value
.replace(/\s+/g," ")
.replace(/[.,;]+$/,"")
.trim();

}

function stopAtBoundary(value){

const boundaries=[
"S/o",
"D/o",
"W/o",
"R/o",
"Son of",
"Daughter of",
"Wife of",
"My age",
"I am",
"Age",
"Date of Birth",
"DOB",
"Mobile",
"Phone",
"Email"
];

let result=value;

boundaries.forEach(b=>{

const i=result.toLowerCase().indexOf(b.toLowerCase());

if(i!=-1){

result=result.substring(0,i);

}

});

return cleanValue(result);

}
clearForm();

let m=text.match(/my name is\s+(.+)/i);

if(m){

document.getElementById("name").value=

stopAtBoundary(m[1]);

}

m=text.match(/S\/o\s+(.+)/i);

if(m){

document.getElementById("father").value=

stopAtBoundary(m[1]);

}

setField("mother",
findPattern(text,PATTERNS.mother));

m = text.match(/date of birth\s*(?:is|:)?\s*(.+?)(?=\.\s+[A-Z]|$)/i);

if (m) {
    document.getElementById("dob").value = cleanValue(m[1]);
}

setField("age",
findPattern(text,PATTERNS.age));

extractGender(text);

setField("mobile",
findPattern(text,PATTERNS.mobile));

setField("email",
findPattern(text,PATTERNS.email));

setField("occupation",
findPattern(text,PATTERNS.occupation));

extractEducation(text);

m=text.match(/Blood\s*Group\s*([A-Za-z0-9+-]+)/i);

if(m){

document.getElementById("blood").value=

cleanValue(m[1]);

}

setField("address",
findPattern(text,PATTERNS.address));
extractAddress(text);
m = text.match(/\bI am an?\s+(Indian|American|British|Canadian|Australian|Japanese|Chinese|Nepali|Bangladeshi|Pakistani|Sri Lankan)\b/i);

if (m) {
    document.getElementById("nationality").value = cleanValue(m[1]);
}

if(/unmarried/i.test(text)){

document.getElementById("marital").value="Unmarried";

}

else if(/married/i.test(text)){

document.getElementById("marital").value="Married";

}

extractAadhaar(text);

extractPAN(text);

extractPassport(text);

extractDL(text);

extractBank(text);

extractIFSC(text);

extractUPI(text);
}

/* ==========================================
SET FIELD
========================================== */

function setField(id,value){

if(value!=""){

document.getElementById(id).value=value;

}

}

/* ==========================================
CLEAR FORM
========================================== */

function clearForm(){

document.querySelectorAll("input").forEach(function(i){

i.value="";

});

document.querySelectorAll("textarea").forEach(function(t){

if(t.id!="inputText"){

t.value="";

}

});

}
/* ==========================================
GENDER
========================================== */

function extractGender(text){

text=text.toLowerCase();

if(text.includes("female")||text.includes("girl")){

document.getElementById("gender").value="Female";

return;

}

if(text.includes("male")||text.includes("boy")){

document.getElementById("gender").value="Male";

return;

}

}

/* ==========================================
EDUCATION
========================================== */

function extractEducation(text){

let edu="";

if(/class\s*xii/i.test(text)){

edu="Class XII";

}

else if(/class\s*xi/i.test(text)){

edu="Class XI";

}

else if(/class\s*x/i.test(text)){

edu="Class X";

}

else if(/graduation/i.test(text)){

edu="Graduation";

}

else if(/b\.?tech/i.test(text)){

edu="B.Tech";

}

else if(/m\.?tech/i.test(text)){

edu="M.Tech";

}

else if(/student/i.test(text)){

edu="Student";

}

if(edu!=""){

let occ=document.getElementById("occupation").value;

if(occ==""){

document.getElementById("occupation").value=edu;

}

else{

document.getElementById("occupation").value=occ+" | "+edu;

}

}

}

/* ==========================================
CITY
========================================== */

function extractCity(text){

let m=text.match(/i\s+live\s+in\s+([A-Za-z ]+)/i);

if(m){

let old=document.getElementById("address").value;

document.getElementById("address").value=

old+"\nCity : "+m[1].trim();

}

}

/* ==========================================
PIN CODE
========================================== */

function extractPin(text){

let m=text.match(/\b\d{6}\b/);

if(m){

document.getElementById("pincode").value=m[0];

}

}

/* ==========================================
STATE
========================================== */

function extractState(text){

const states=[

"Delhi",

"Uttar Pradesh",

"Haryana",

"Punjab",

"Rajasthan",

"Bihar",

"Jharkhand",

"Madhya Pradesh",

"Maharashtra",

"Gujarat",

"West Bengal",

"Odisha",

"Tamil Nadu",

"Karnataka",

"Kerala",

"Assam",

"Telangana",

"Andhra Pradesh"

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
AADHAAR
========================================== */

function extractAadhaar(text){

let m=text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);

if(m){

console.log("Aadhaar Found : "+m[0]);

}

}

/* ==========================================
PAN
========================================== */

function extractPAN(text){

let m=text.match(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/);

if(m){

console.log("PAN Found : "+m[0]);

}

}

/* ==========================================
PASSPORT
========================================== */

function extractPassport(text){

let m=text.match(/\b[A-Z][0-9]{7}\b/);

if(m){

console.log("Passport Found : "+m[0]);

}

}

/* ==========================================
DRIVING LICENCE
========================================== */

function extractDL(text){

let m=text.match(/\b[A-Z]{2}[0-9]{2}[0-9]{11}\b/);

if(m){

console.log("Driving Licence : "+m[0]);

}

}

/* ==========================================
BANK ACCOUNT
========================================== */

function extractBank(text){

let m=text.match(/\b\d{9,18}\b/);

if(m){

console.log("Bank Account : "+m[0]);

}

}

/* ==========================================
IFSC
========================================== */

function extractIFSC(text){

let m=text.match(/\b[A-Z]{4}0[A-Z0-9]{6}\b/i);

if(m){

console.log("IFSC : "+m[0].toUpperCase());

}

}

/* ==========================================
UPI
========================================== */

function extractUPI(text){

let m=text.match(/[A-Za-z0-9.\-_]{2,}@[A-Za-z]{2,}/);

if(m){

console.log("UPI : "+m[0]);

}

}
/* ==========================================
MODULE 2
ADDRESS PARSER
========================================== */

function extractAddress(text){

/* ---------- AREA (R/o) ---------- */

let m=text.match(/R\/o\s+([^.,\n]+)/i);

if(m){

document.getElementById("area").value=

cleanValue(m[1]);

}

/* ---------- CITY ---------- */

m=text.match(/I live in\s+([A-Za-z ]+?)(?:[-, ]\d{6}|\.)/i);

if(m){

document.getElementById("city").value=

cleanValue(m[1]);

}

/* ---------- PIN ---------- */

m=text.match(/\b(\d{6})\b/);

if(m){

document.getElementById("pincode").value=m[1];

}

/* ---------- STATE ---------- */

const states=[

"Delhi",

"Uttar Pradesh",

"Haryana",

"Punjab",

"Rajasthan",

"Bihar",

"Jharkhand",

"Madhya Pradesh",

"Maharashtra",

"Gujarat",

"West Bengal",

"Odisha",

"Tamil Nadu",

"Karnataka",

"Kerala",

"Assam",

"Telangana",

"Andhra Pradesh"

];

for(let s of states){

if(text.toLowerCase().includes(s.toLowerCase())){

document.getElementById("state").value=s;

break;

}

}

/* ---------- COUNTRY ---------- */

document.getElementById("country").value="India";

}
