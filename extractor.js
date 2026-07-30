/*=========================================================
FORMat v4.0
Core Extraction Engine
Created for Gema
=========================================================*/

"use strict";

/*=========================================================
MAIN FUNCTION
=========================================================*/

function extractData(rawText){

    if(!rawText) return;

    const text = normalizeText(rawText);

    clearForm();

    const person = parsePerson(text);

    const address = parseAddress(text);

    const contact = parseContact(text);

    const identity = parseIdentity(text);

    const education = parseEducation(text);

    const employment = parseEmployment(text);

    fillForm({

        ...person,

        ...address,

        ...contact,

        ...identity,

        ...education,

        ...employment

    });

}

/*=========================================================
TEXT NORMALIZATION
=========================================================*/

function normalizeText(text){

    return text

        .replace(/\r/g," ")

        .replace(/\n/g," ")

        .replace(/\t/g," ")

        .replace(/\s+/g," ")

        .trim();

}

/*=========================================================
SAFE VALUE
=========================================================*/

function clean(value){

    if(!value) return "";

    return value

        .replace(/\s+/g," ")

        .replace(/^[,:.\- ]+/,"")

        .replace(/[,:.\- ]+$/,"")

        .trim();

}

/*=========================================================
FIRST MATCH
=========================================================*/

function firstMatch(text,patterns){

    for(const p of patterns){

        const m=text.match(p);

        if(m){

            return clean(m[1]);

        }

    }

    return "";

}

/*=========================================================
STOP WORDS
=========================================================*/

const STOP_WORDS=[

"S/o",

"D/o",

"W/o",

"C/o",

"R/o",

"Son of",

"Daughter of",

"Wife of",

"Husband of",

"Near",

"Behind",

"Opp",

"Age",

"DOB",

"Date of Birth",

"Mobile",

"Phone",

"Email"

];

/*=========================================================
CUT AT STOP WORD
=========================================================*/

function cutStopWords(value){

    let result=value;

    STOP_WORDS.forEach(word=>{

        const pos=result.toLowerCase()

        .indexOf(word.toLowerCase());

        if(pos!=-1){

            result=result.substring(0,pos);

        }

    });

    return clean(result);

}

/*=========================================================
EMPTY PARSERS
Will be completed in next Parts
=========================================================*/

function parsePerson(text){

    return {};

}

function parseAddress(text){

    return {};

}

function parseContact(text){

    return {};

}

function parseIdentity(text){

    return {};

}

function parseEducation(text){

    return {};

}

function parseEmployment(text){

    return {};

}

/*=========================================================
FILL HTML FORM
=========================================================*/

function fillForm(data){

    Object.keys(data).forEach(key=>{

        const field=document.getElementById(key);

        if(field){

            field.value=data[key];

        }

    });

}

/*=========================================================
CLEAR FORM
=========================================================*/

function clearForm(){

    document

    .querySelectorAll("input,textarea")

    .forEach(el=>{

        if(el.id!="inputText"){

            el.value="";

        }

    });

}

