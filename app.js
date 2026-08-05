/*=========================================================
FORMat Lite v1.0
Created by Gema
=========================================================*/

"use strict";

/*=========================================================
ELEMENTS
=========================================================*/

const inputText = document.getElementById("inputText");

const extractBtn = document.getElementById("extractBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const loading = document.getElementById("loading");

/*=========================================================
BUTTON EVENTS
=========================================================*/

extractBtn.addEventListener("click", extractData);
clearBtn.addEventListener("click", clearForm);
copyBtn.addEventListener("click", copyForm);

/*=========================================================
MAIN EXTRACT FUNCTION
=========================================================*/

function extractData(){

    const text = inputText.value.trim();

    if(text===""){

        alert("Please paste a paragraph.");

        return;

    }

    loading.innerHTML="Reading Paragraph...";

    clearFields();

    setTimeout(function(){

        processText(text);

        loading.innerHTML="";

    },100);

}

/*=========================================================
PROCESS TEXT
=========================================================*/

function processText(text){

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
HELPER
=========================================================*/

function setValue(id,value){

    const box=document.getElementById(id);

    if(box){

        box.value=value || "";

    }

}

/*=========================================================
CLEAR RESULT FIELDS
=========================================================*/

function clearFields(){

const ids=[

"name",

"father",

"age",

"dob",

"gender",

"mobile",

"email",

"blood",

"nationality",

"marital",

"occupation",

"address"

];

ids.forEach(function(id){

setValue(id,"");

});

}

/*=========================================================
CLEAR FORM
=========================================================*/

function clearForm(){

inputText.value="";

clearFields();

loading.innerHTML="";

}

/*=========================================================
COPY FORM
=========================================================*/

function copyForm(){

let text="";

document.querySelectorAll(".field").forEach(function(field){

const label=field.querySelector("label");

const input=field.querySelector("input,textarea");

if(label && input){

text+=label.innerText+": "+input.value+"\n";

}

});

navigator.clipboard.writeText(text);

alert("Form copied successfully.");

}
/*=========================================================
NAME
=========================================================*/

function extractName(text){

let match=text.match(

/my\s+name\s+is\s+(.+?)(?=\s+S\/o|\s+D\/o|\s+W\/o|,|\.|$)/i

);

if(match){

setValue("name",match[1].trim());

}

}

/*=========================================================
FATHER NAME
=========================================================*/

function extractFather(text){

let match=text.match(

/S\/o\s+(.+?)(?=\s+R\/o|,|\.|$)/i

);

if(match){

setValue("father",match[1].trim());

}

}

/*=========================================================
AGE
=========================================================*/

function extractAge(text){

let match=text.match(

/(\d{1,3})\s+years?\s+old/i

);

if(match){

setValue("age",match[1]);

}

}

/*=========================================================
DATE OF BIRTH
=========================================================*/

function extractDOB(text){

let match=text.match(

/date\s+of\s+birth\s*(?:is|:)?\s*([A-Za-z]{3,9}\.?\s*\d{1,2},?\s*\d{4})/i

);

if(match){

setValue("dob",match[1].trim());

}

}

/*=========================================================
PLACEHOLDER FUNCTIONS
(Will be completed in Part 3)
=========================================================*/

function extractGender(text){}

function extractMobile(text){}

function extractEmail(text){}

function extractBlood(text){}

function extractNationality(text){}

function extractMarital(text){}

function extractOccupation(text){}

function extractAddress(text){}
/*=========================================================
GENDER
=========================================================*/

function extractGender(text){

let gender="";

if(/\bfemale\b/i.test(text)) gender="Female";
else if(/\bmale\b/i.test(text)) gender="Male";
else if(/\bgirl\b/i.test(text)) gender="Female";
else if(/\bboy\b/i.test(text)) gender="Male";

setValue("gender",gender);

}

/*=========================================================
MOBILE NUMBER
=========================================================*/

function extractMobile(text){

let match=text.match(/\b([6-9]\d{9})\b/);

if(match){

setValue("mobile",match[1]);

}

}

/*=========================================================
EMAIL
=========================================================*/

function extractEmail(text){

let match=text.match(

/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/

);

if(match){

setValue("email",match[0]);

}

}

/*=========================================================
BLOOD GROUP
=========================================================*/

function extractBlood(text){

let match=text.match(

/blood\s*group\s*([ABO]{1,2}[+-])/i

);

if(match){

setValue("blood",match[1].toUpperCase());

}

}

/*=========================================================
NATIONALITY
=========================================================*/

function extractNationality(text){

let match=text.match(

/I am an?\s+(Indian|American|British|Canadian|Australian|Japanese|Chinese|Nepali|Pakistani|Bangladeshi|Sri Lankan)/i

);

if(match){

setValue("nationality",match[1]);

}

}

/*=========================================================
MARITAL STATUS
=========================================================*/

function extractMarital(text){

if(/\bunmarried\b/i.test(text))

setValue("marital","Unmarried");

else if(/\bmarried\b/i.test(text))

setValue("marital","Married");

}
