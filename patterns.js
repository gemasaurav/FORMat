/* ==========================================
FORMat
patterns.js
Version 2.1
Pattern Library
========================================== */

const PATTERNS = {

name: [

/my\s+name\s+is\s+([A-Za-z][A-Za-z\s]{2,60})/i,

/name\s*[:\-]\s*([A-Za-z][A-Za-z\s]{2,60})/i,

/i\s+am\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/

],

father: [

/s\/o\s+([A-Za-z][A-Za-z\s]{2,60})/i,

/son\s+of\s+([A-Za-z][A-Za-z\s]{2,60})/i,

/father'?s\s+name\s*[:\-]?\s*([A-Za-z][A-Za-z\s]{2,60})/i

],

mother: [

/d\/o\s+([A-Za-z][A-Za-z\s]{2,60})/i,

/mother'?s\s+name\s*[:\-]?\s*([A-Za-z][A-Za-z\s]{2,60})/i

],

dob: [

/date\s+of\s+birth\s*(?:is|:)?\s*([A-Za-z0-9,\.\/\-\s]+)/i,

/born\s+on\s+([A-Za-z0-9,\.\/\-\s]+)/i

],

age: [

/(\d{1,3})\s+years?\s+old/i,

/age\s*[:\-]?\s*(\d{1,3})/i

],

gender: [

/\bmale\b/i,

/\bfemale\b/i,

/\bboy\b/i,

/\bgirl\b/i

],

mobile: [

/\b[6-9]\d{9}\b/

],

email: [

/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/

],

address: [

/r\/o\s+([^.,\n]+)/i,

/resident\s+of\s+([^.,\n]+)/i,

/address\s*[:\-]?\s*([^.\n]+)/i

],

occupation: [

/i\s+am\s+a[n]?\s+([A-Za-z ]+)/i,

/occupation\s*[:\-]?\s*([A-Za-z ]+)/i,

/profession\s*[:\-]?\s*([A-Za-z ]+)/i

],

education: [

/studied\s+in\s+([A-Za-z0-9 ]+)/i,

/class\s+([A-Za-z0-9]+)/i,

/qualification\s*[:\-]?\s*([A-Za-z0-9 ]+)/i

]

};
