const { jsPDF } = window.jspdf;

function generatePDF() {

    const doc = new jsPDF();

    let y = 20;

    doc.setFont("helvetica","bold");
    doc.setFontSize(20);
    doc.text("FORMat Lite",20,y);

    y += 15;

    doc.setFontSize(11);
    doc.setFont("helvetica","normal");

    const fields = [

        ["Full Name","name"],

        ["Father's Name","father"],

        ["Age","age"],

        ["Date of Birth","dob"],

        ["Gender","gender"],

        ["Mobile Number","mobile"],

        ["Email","email"],

        ["Blood Group","blood"],

        ["Nationality","nationality"],

        ["Marital Status","marital"],

        ["Occupation","occupation"],

        ["Address","address"]

    ];

    fields.forEach(function(item){

        let value = document.getElementById(item[1]).value || "";

        doc.text(item[0] + " :",20,y);

        doc.text(value,75,y);

        y += 10;

    });

    doc.save("FORMat_Lite.pdf");

}
