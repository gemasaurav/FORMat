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

clearForm();

setField("name",
findPattern(text,PATTERNS.name));

setField("father",
findPattern(text,PATTERNS.father));

setField("mother",
findPattern(text,PATTERNS.mother));

setField("dob",
findPattern(text,PATTERNS.dob));

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

setField("address",
findPattern(text,PATTERNS.address));

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
