const btn = document.getElementById("calculate");
const table = document.getElementById("table");

// Controller
function getValues() {
    let balance = document.getElementById("loanAmount").value;
    let term = document.getElementById("payments").value;
    let rate = document.getElementById("interestRate").value;

    balance = Number(balance);
    term = Number(term);
    rate = Number(rate);

    if (Number.isInteger(balance) && Number.isInteger(term) && Number.isInteger(rate)
    && balance > 0 && term > 0 )


}

// Logic

// Display