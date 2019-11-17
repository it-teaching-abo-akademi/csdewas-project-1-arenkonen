function decoder(){
    x = document.getElementById("virtualbarcode").value;
    JsBarcode("#barcode", x);

    var version = x[0];
    var IBAN = x.substr(1,16);
    var amount = x.substr(17,8);
    var duedate = x.substr(48,6);

    console.log(IBAN);
    console.log(amount);
    //console.log(reference);
    console.log(duedate);
    
   if(version==4){
       console.log("4");
       var reference = x.substr(28,20);
       document.getElementById("iban").innerHTML = IBAN;
       document.getElementById("amount").innerHTML = amount;
       document.getElementById("reference").innerHTML = reference;
       document.getElementById("duedate").innerHTML = duedate;
    }
   else if(version==5){
       console.log("5");
       var reference = x.substr(25,23);
       document.getElementById("iban").innerHTML = IBAN;
       document.getElementById("amount").innerHTML = amount;
       document.getElementById("reference").innerHTML = reference;
       document.getElementById("duedate").innerHTML = duedate;
   }
   else{
       console.log("error");
   }
}
