function decoder() {
    x = document.getElementById("virtualbarcode").value;

    var version = x[0];
    var IBAN = x.substr(1, 16);
    var IBANformated = formatNumbersIBAN(IBAN);

    var amount = formatNumbersAmount(x);

    var duedate = formatNumbersDate(x);
    document.getElementById("error").innerHTML = "";
    console.log(IBAN);
    console.log(amount);
    //console.log(reference);
    console.log(duedate);

    if (version == 4) {
        console.log("4");
        //The reference in version 4 is 20 characters long and starts at 28
        var reference = x.substr(28, 20);
        var parsedref = parseInt(reference, 10);
        var formatedref = formatNumbersReference(parsedref);

        document.getElementById("iban").innerHTML = IBANformated;
        document.getElementById("amount").innerHTML = amount + " euro";
        document.getElementById("reference").innerHTML = formatedref;
        document.getElementById("duedate").innerHTML = duedate;
        document.getElementById("barcode").style.display = "block";
        JsBarcode("#barcode", x);
    } else if (version == 5) {
        console.log("5");
        //The reference in version 5 is 23 characters long and starts at 25
        var reference = x.substr(25, 23);
        var formatedref = formatNumbersReference5(reference);

        document.getElementById("iban").innerHTML = IBANformated;
        document.getElementById("amount").innerHTML = amount;
        document.getElementById("reference").innerHTML = formatedref;
        document.getElementById("duedate").innerHTML = duedate;
        document.getElementById("barcode").style.display = "block";
        JsBarcode("#barcode", x);
    } else {
        //If the version is neither 4 nor 5 it warns the user
        console.log("error");
        document.getElementById("error").innerHTML =
            "The inserted code is invalid";
        document.getElementById("iban").innerHTML = "";
        document.getElementById("amount").innerHTML = "";
        document.getElementById("reference").innerHTML = "";
        document.getElementById("duedate").innerHTML = "";
        document.getElementById("barcode").style.display = "none";
    }
}

// Hides the information in the element with ID hide when it is visible and shows when hidden, also changes the text on the button
function hideInfo() {
    var x = document.getElementById("hide");
    var y = document.getElementById("hidebutt");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide";
    } else {
        x.style.display = "none";
        y.innerHTML = "Show";
    }
}

// formats the IBAN to have a space between the first 2 and last 2 number and a space between each 4th
function formatNumbersIBAN(x) {
    var first2 = x.substr(0, 2);
    var last2 = x.substr(14, 2);
    var rest = x.substr(2, 12);
    var b = rest.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    return first2 + " " + b + " " + last2;
}

// formats the reference to have spaces between each 5th number
function formatNumbersReference(x) {
    return x.toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
}

// formats the reference number for version 5 to have a space between each 4th number and an RF at the beginning
function formatNumbersReference5(x) {
    x = "RF" + x.replace(/[^\d]|(.)\1/g, "");
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
}

// formats the amount to be paid to remove the zeroes at the beginning and adds a . between euros and cents
function formatNumbersAmount(x) {
    var amounteuro = x.substr(17, 6);

    //The regex expression adds a "," between every third letter in the euro amount
    var parsedeur = parseInt(amounteuro, 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var amountcent = x.substr(23, 2);
    return parsedeur + "." + amountcent;
}

// formats the date to be in the correct order and adds a 20 to the beginning of the year
function formatNumbersDate(x) {
    var dueyear = x.substr(48, 2);
    var duemonth = x.substr(50, 2);
    var dueday = x.substr(52, 2);
    var finaldate = dueday + "." + duemonth + ".20" + dueyear;
    //If a duedate is not given it will return None instead of 00.00.2000
    if (finaldate == "00.00.2000") {
        return "None";
    } else return finaldate;
}

//Event handler changes the background colour of the input field when in focus
function handler(evt) {
    if (evt.type == "focus") {
        evt.target.style.backgroundColor = "lightgray";
    } else if (evt.style == "blur") {
        evt.target.style.backgroundColor = "white";
    }
}
