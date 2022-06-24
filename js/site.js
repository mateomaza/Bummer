const btn = document.getElementById("calculate");
const table = document.getElementById("display");


// Controller

function getValues() {

    let balance = document.getElementById("loanAmount").value;
    let term = document.getElementById("payments").value;
    let rate = document.getElementById("interestRate").value;

    if (balance !== '' && term !== '' && rate !== '') {

        balance = Number(balance);
        term = Number(term);
        rate = Number(rate);

        if (Number.isInteger(balance) && Number.isInteger(term) && Number.isInteger(rate) &&
            balance > 0 && term > 0 && rate > 0) {

            let data = generateData(balance, term, rate);
         
            displayTable(data, balance, term)

        } else {
            alert("Values must be whole numbers higher than 0");
        }
    }
}


// Logic

function generateData(b, t, r) {

    let data = {}

    let payment = b * r / 1200 / (1 - (1 + r / 1200) ** -t);
    let principalValues = [];
    let interestValues = [];
    let totalIntValues = [];
    let balanceValues = [];
    let interestSum = 0;

    for (let i = 0; i < t; i++) {
        let currentInterest = b * r / 1200;
        let currentPrincipal = payment - currentInterest;
        b -= currentPrincipal;
        principalValues.push(currentPrincipal.toFixed(2))
        interestValues.push(currentInterest.toFixed(2));
        interestSum += currentInterest;
        totalIntValues.push(interestSum.toFixed(2));
        balanceValues.push(b.toFixed(2));
    }

    data.payment = payment
    data.principalValues = principalValues
    data.interestValues = interestValues
    data.totalIntValues = totalIntValues
    data.balanceValues = balanceValues 
    data.interestSum = interestSum

    return data
}


// Display
//t, p, pV, iV, totalIV, bV, pS, iS

function displayTable(data, b, t) {

    let info = document.getElementById("info");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let p3 = document.getElementById("p3");

    let tableRows = [];

    for (let index = 0; index < t; index++) {

        tableRows += `<tr><td>${index+1}</td><td>$${data.payment.toFixed(2)}</td><td>$${data.principalValues[index]}</td>
        <td>$${data.interestValues[index]}</td><td>$${data.totalIntValues[index]}</td>
        <td>$${data.balanceValues[index]}</td>`;
    }

    table.innerHTML = tableRows;

    info.innerHTML = `<p class="text-light fs-5 fw-light fst-italic text-decoration-underline">
    Your Monthly Payments</p><p class="text-light fw-bold display-4">${data.payment.toFixed(2)}</p>`;


    p1.innerHTML = `Total Principal: $${b.toFixed(2)}`;
    p2.innerHTML = `Total Interest: $${data.interestSum.toFixed(2)}`;
    p3.innerHTML = `Total Cost: $${(b + data.interestSum).toFixed(2)}`;


}


// Event Handler

btn.addEventListener("click", getValues)