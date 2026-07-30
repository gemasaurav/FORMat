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

/*=========================================================
PERSON PARSER
=========================================================*/

function parsePerson(text){

    const person={};

    /*=========================
    NAME
    =========================*/

    person.name=firstMatch(text,[

/my\s+name\s+is\s+(.+)/i,

/name\s*[:\-]\s*(.+)/i

    ]);

    person.name=cutStopWords(person.name);

    /*=========================
    FATHER
    =========================*/

    person.father=firstMatch(text,[

/S\/o\s+(.+)/i,

/Son\s+of\s+(.+)/i

    ]);

    person.father=cutStopWords(person.father);

    /*=========================
    MOTHER
    =========================*/

    person.mother=firstMatch(text,[

/D\/o\s+(.+)/i,

/Mother\s*[:\-]\s*(.+)/i

    ]);

    person.mother=cutStopWords(person.mother);

    /*=========================
    SPOUSE
    =========================*/

    person.spouse=firstMatch(text,[

/W\/o\s+(.+)/i,

/Husband\s+of\s+(.+)/i,

/Wife\s+of\s+(.+)/i

    ]);

    person.spouse=cutStopWords(person.spouse);

    /*=========================
    AGE
    =========================*/

    let m=text.match(/\b(\d{1,3})\s+years?\s+old\b/i);

    person.age=m?m[1]:"";

    /*=========================
    DATE OF BIRTH
    =========================*/

    m=text.match(/date\s+of\s+birth\s*(?:is|:)?\s*(.+?)(?=\.\s+[A-Z]|$)/i);

    person.dob=m?clean(m[1]):"";

    /*=========================
    GENDER
    =========================*/

    person.gender="";

    if(/\bfemale\b|\bgirl\b/i.test(text))
        person.gender="Female";

    if(/\bmale\b|\bboy\b/i.test(text))
        person.gender="Male";

    /*=========================
    BLOOD GROUP
    =========================*/

    m=text.match(/blood\s*group\s*([A-Za-z0-9+\-]+)/i);

    person.blood=m?clean(m[1]):"";

    /*=========================
    NATIONALITY
    =========================*/

    m=text.match(/\bI am an?\s+(Indian|American|British|Canadian|Australian|Japanese|Chinese|Nepali|Pakistani|Bangladeshi|Sri Lankan)\b/i);

    person.nationality=m?clean(m[1]):"";

    /*=========================
    RELIGION
    =========================*/

    m=text.match(/Religion\s*[:\-]\s*([A-Za-z ]+)/i);

    person.religion=m?clean(m[1]):"";

    /*=========================
    MARITAL STATUS
    =========================*/

    person.marital="";

    if(/\bunmarried\b/i.test(text))
        person.marital="Unmarried";

    else if(/\bmarried\b/i.test(text))
        person.marital="Married";

    return person;

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

