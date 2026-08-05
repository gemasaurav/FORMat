/*=========================================================
FORMat Lite v1.0
Created for Gema
=========================================================*/

"use strict";

/*=========================================================
ELEMENTS
=========================================================*/

const inputText = document.getElementById("inputText");
const extractBtn = document.getElementById("extractBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const pdfBtn = document.getElementById("pdfBtn");
const loading = document.getElementById("loading");

/*=========================================================
BUTTON EVENTS
=========================================================*/

extractBtn.addEventListener("click", extractData);
clearBtn.addEventListener("click", clearForm);
copyBtn.addEventListener("click", copyForm);

if (pdfBtn) {
    pdfBtn.addEventListener("click", function () {
        if (typeof generatePDF === "function") {
            generatePDF();
        } else {
            alert("PDF feature will be added later.");
        }
    });
}

/*=========================================================
MAIN EXTRACT FUNCTION
=========================================================*/

function extractData() {
    const text = inputText.value.trim();

    if (text === "") {
        alert("Please paste a paragraph.");
        return;
    }

    loading.innerHTML = "Reading Paragraph...";
    clearFields();

    setTimeout(function () {
        processText(text);
        loading.innerHTML = "";
    }, 100);
}

/*=========================================================
PROCESS TEXT
=========================================================*/

function processText(text) {
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

function setValue(id, value) {
    const box = document.getElementById(id);
    if (box) {
        box.value = value || "";
    }
}

function firstMatch(text, regex) {
    const m = text.match(regex);
    return m ? m[1].trim() : "";
}

/*=========================================================
CLEAR RESULT FIELDS
=========================================================*/

function clearFields() {
    const ids = [
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

    ids.forEach(function (id) {
        setValue(id, "");
    });
}

/*=========================================================
CLEAR FORM
=========================================================*/

function clearForm() {
    inputText.value = "";
    clearFields();
    loading.innerHTML = "";
}

/*=========================================================
COPY FORM
=========================================================*/

function copyForm() {
    let text = "";

    document.querySelectorAll(".field").forEach(function (field) {
        const label = field.querySelector("label");
        const input = field.querySelector("input,textarea");

        if (label && input) {
            text += label.innerText + ": " + input.value + "\n";
        }
    });

    navigator.clipboard.writeText(text);
    alert("Form copied successfully.");
}

/*=========================================================
NAME
=========================================================*/

function extractName(text) {
    let match = firstMatch(
        text,
        /my\s+name\s+is\s+(.+?)(?=\s+S\/o|\s+D\/o|\s+W\/o|\s+R\/o|,|\.|$)/i
    );

    setValue("name", match);
}

/*=========================================================
FATHER NAME
=========================================================*/

function extractFather(text) {
    let match = firstMatch(
        text,
        /S\/o\s+(.+?)(?=\s+R\/o|,|\.|$)/i
    );

    setValue("father", match);
}

/*=========================================================
AGE
=========================================================*/

function extractAge(text) {
    let match = firstMatch(
        text,
        /(\d{1,3})\s+years?\s+old/i
    );

    setValue("age", match);
}

/*=========================================================
DATE OF BIRTH
=========================================================*/

function extractDOB(text){

let match = text.match(

/date\s+of\s+birth\s*(?:is|:)?\s*([A-Za-z]{3,9}\.?\s+\d{1,2},?\s+\d{4})/i

);

if(match){

setValue("dob",match[1].trim());

return;

}

match = text.match(

/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/

);

if(match){

setValue("dob",match[1]);

}

}
/*=========================================================
GENDER
=========================================================*/

function extractGender(text) {
    let gender = "";

    if (/\bfemale\b/i.test(text)) gender = "Female";
    else if (/\bmale\b/i.test(text)) gender = "Male";
    else if (/\bgirl\b/i.test(text)) gender = "Female";
    else if (/\bboy\b/i.test(text)) gender = "Male";

    setValue("gender", gender);
}

/*=========================================================
MOBILE NUMBER
=========================================================*/

function extractMobile(text) {
    let match = firstMatch(text, /\b([6-9]\d{9})\b/);
    setValue("mobile", match);
}

/*=========================================================
EMAIL
=========================================================*/

function extractEmail(text) {
    let match = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    setValue("email", match ? match[0] : "");
}

/*=========================================================
BLOOD GROUP
=========================================================*/

function extractBlood(text) {
    let match = firstMatch(text, /\bblood\s*group\s*([ABO]{1,2}[+-])/i);

    if (!match) {
        match = firstMatch(text, /\b(A|B|AB|O)[+-]\b/i);
    }

    setValue("blood", match ? match.toUpperCase() : "");
}

/*=========================================================
NATIONALITY
=========================================================*/

function extractNationality(text) {
    let match = firstMatch(
        text,
        /I am an?\s+(Indian|American|British|Canadian|Australian|Japanese|Chinese|Nepali|Pakistani|Bangladeshi|Sri Lankan)/i
    );

    setValue("nationality", match);
}

/*=========================================================
MARITAL STATUS
=========================================================*/

function extractMarital(text) {
    if (/\bunmarried\b/i.test(text)) {
        setValue("marital", "Unmarried");
    } else if (/\bmarried\b/i.test(text)) {
        setValue("marital", "Married");
    }
}

/*=========================================================
OCCUPATION
=========================================================*/

function extractOccupation(text) {
    let match = firstMatch(text, /i\s+am\s+a[n]?\s+([A-Za-z ]+?)(?=\.|,|$)/i);

    if (!match) {
        match = firstMatch(text, /occupation\s*[:\-]\s*([A-Za-z ]+)/i);
    }

    setValue("occupation", match);
}

/*=========================================================
ADDRESS
=========================================================*/

function extractAddress(text) {
    let address = "";

    let r = text.match(/R\/o\s+([^\.]+?)(?=\s+I\s+live|\s+I\s+am|\.|$)/i);
    if (r) address = r[1].trim();

    let cityPin = text.match(/I\s+live\s+in\s+([A-Za-z ]+?)-?(\d{6})/i);
    if (cityPin) {
        let city = cityPin[1].trim();
        let pin = cityPin[2].trim();

        if (!address) address = city;
        else if (!address.toLowerCase().includes(city.toLowerCase())) address += ", " + city;

        setValue("address", address);
        return;
    }

    let cityOnly = text.match(/I\s+live\s+in\s+([A-Za-z ]+)/i);
    if (cityOnly && !address) {
        address = cityOnly[1].trim();
    }

    setValue("address", address);
}
