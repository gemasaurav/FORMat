/* ==========================================
FORMat
Main Controller
Version 2.1
Created for Gema
========================================== */

const inputText=document.getElementById("inputText");

const extractBtn=document.getElementById("extractBtn");

const clearBtn=document.getElementById("clearBtn");

const pasteBtn=document.getElementById("pasteBtn");

const copyBtn=document.getElementById("copyBtn");

const pdfBtn=document.getElementById("pdfBtn");

const saveBtn=document.getElementById("saveBtn");

const loading=document.getElementById("loading");

/* =======================================
CLEAR
======================================= */

clearBtn.onclick=function(){

inputText.value="";

document.querySelectorAll("input").forEach(i=>i.value="");

document.querySelectorAll("textarea").forEach(t=>{

if(t.id!="inputText"){

t.value="";

}

});

loading.innerHTML="";

};

/* =======================================
PASTE
======================================= */

pasteBtn.onclick=async function(){

try{

const txt=await navigator.clipboard.readText();

inputText.value=txt;

}

catch{

alert("Clipboard Permission Denied");

}

};

/* =======================================
EXTRACT
======================================= */

extractBtn.onclick=function(){

loading.innerHTML="🔍 Reading Paragraph...";

extractData(inputText.value);

loading.innerHTML="";

};

/* =======================================
COPY
======================================= */

copyBtn.onclick=function(){

let text="";

document.querySelectorAll(".field").forEach(field=>{

const label=field.querySelector("label").innerText;

const value=field.querySelector("input,textarea").value;

text+=label+" : "+value+"\n";

});

navigator.clipboard.writeText(text);

alert("Copied Successfully");

};

/* =======================================
PDF
======================================= */

pdfBtn.onclick=function(){

generatePDF();

};

/* =======================================
SAVE
======================================= */

saveBtn.onclick=function(){

localStorage.setItem(

"FORMAT_LAST_FORM",

JSON.stringify(getAllFields())

);

alert("Saved Successfully");

};

/* =======================================
GET ALL FIELDS
======================================= */

function getAllFields(){

let obj={};

document.querySelectorAll(".field").forEach(field=>{

const label=field.querySelector("label").innerText;

const value=field.querySelector("input,textarea").value;

obj[label]=value;

});

return obj;

}
