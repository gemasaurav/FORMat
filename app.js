/*=========================================================
FORMat Lite v1.0
Created for Gema
=========================================================*/

"use strict";

/*=========================================================
ELEMENTS
=========================================================*/

const inputText=document.getElementById("inputText");

const extractBtn=document.getElementById("extractBtn");

const clearBtn=document.getElementById("clearBtn");

const copyBtn=document.getElementById("copyBtn");

const loading=document.getElementById("loading");

/*=========================================================
BUTTON EVENTS
=========================================================*/

extractBtn.addEventListener("click",extractData);

clearBtn.addEventListener("click",clearAll);

copyBtn.addEventListener("click",copyForm);

/*=========================================================
MAIN FUNCTION
=========================================================*/

function extractData(){

const text=inputText.value.trim();

if(text===""){

alert("Please paste a paragraph.");

return;

}

loading.innerHTML="Reading Paragraph...";

setTimeout(function(){

processParagraph(text);

loading.innerHTML="";

},200);

}

/*=========================================================
PROCESS PARAGRAPH
=========================================================*/

function processParagraph(text){

clearFields();

text=text.replace(/\n/g," ");

extractName(text);

extractFather(text);

extractAge(text);

extractDOB(text);

extractGender(text);

extractMobile(text);

extractEmail(text);

extractBlood(text);

extractNationality(text);

extractMarital(text);

extractOccupation(text);

extractAddress(text);

}

/*=========================================================
SET VALUE
=========================================================*/

function setValue(id,value){

const box=document.getElementById(id);

if(box){

box.value=value;

}

}

/*=========================================================
GET MATCH
=========================================================*/

function getMatch(text,regex){

const m=text.match(regex);

if(m){

return m[1].trim();

}

return "";

}
/*=========================================================
NAME
=========================================================*/

function extractName(text){

let name=getMatch(

text,

/my\s+name\s+is\s+(.+?)(?=\s+S\/o|\s+D\/o|\s+W\/o|\.|,)/i

);

setValue("name",name);

}

/*=========================================================
FATHER
=========================================================*/

function extractFather(text){

let father=getMatch(

text,

/S\/o\s+(.+?)(?=\s+R\/o|\.|,)/i

);

setValue("father",father);

}

/*=========================================================
AGE
=========================================================*/

function extractAge(text){

let age=getMatch(

text,

/(\d{1,3})\s+years?\s+old/i

);

setValue("age",age);

}

/*=========================================================
DATE OF BIRTH
=========================================================*/

function extractDOB(text){

let dob=getMatch(

text,

/date\s+of\s+birth\s*(?:is|:)?\s*(.+?)(?=\.\s|$)/i

);

setValue("dob",dob);

}

/*=========================================================
GENDER
=========================================================*/

function extractGender(text){

let gender="";

if(/\bfemale\b|\bgirl\b/i.test(text))
gender="Female";

if(/\bmale\b|\bboy\b/i.test(text))
gender="Male";

setValue("gender",gender);

}
