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
            let payment = data[0];
            let principalValues = data[1];
            let interestValues = data[2];
            let totalIntValues = data[3];
            let balanceValues = data[4];
            let principalSum = data[5];
            let interestSum = data[6];

            displayTable(term, payment, principalValues, interestValues, totalIntValues,
                balanceValues, principalSum, interestSum);

        } else {
            alert("Values must be whole numbers higher than 0");
        }
    }
}


// Logic

function generateData(b, t, r) {

    let data = []

    let payment = b * r / 1200 / (1 - (1 + r / 1200) ** -t);
    let principalValues = [];
    let interestValues = [];
    let totalIntValues = [];
    let balanceValues = [];
    let principalSum = 0;
    let interestSum = 0;

    for (let i = 0; i < t; i++) {
        let currentInterest = b * r / 1200;
        let currentPrincipal = payment - currentInterest;
        b -= currentPrincipal;
        principalValues.push(currentPrincipal.toFixed(2));
        interestValues.push(currentInterest.toFixed(2));
        principalSum += currentPrincipal
        interestSum += currentInterest;
        totalIntValues.push(interestSum.toFixed(2));
        balanceValues.push(b.toFixed(2));
    }

    // "payment" is the same every month, that's why it's different
    data = [payment, principalValues, interestValues, totalIntValues, balanceValues, principalSum, interestSum];

    return data
}


// Display

function displayTable(t, p, pV, iV, totalIV, bV, pS, iS) {

    let info = document.getElementById("info");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let p3 = document.getElementById("p3");

    let tableRows = [];

    for (let index = 0; index < t; index++) {

        let monthP = pV[index];
        let monthI = iV[index];
        let monthTotalI = totalIV[index];
        let monthB = bV[index];

        tableRows += `<tr><td>${index+1}</td><td>$${p.toFixed(2)}</td><td>$${monthP}</td>
        <td>$${monthI}</td><td>$${monthTotalI}</td><td>$${monthB}</td>`;
    }

    table.innerHTML = tableRows;

    info.innerHTML = `<p class="text-light fs-5 fw-light fst-italic text-decoration-underline">
    Your Monthly Payments</p><p class="text-light fw-bold display-4">${p.toFixed(2)}</p>`;


    p1.innerHTML = `Total Principal: $${pS.toFixed(2)}`;
    p2.innerHTML = `Total Interest: $${iS.toFixed(2)}`;
    p3.innerHTML = `Total Cost: $${(pS + iS).toFixed(2)}`;



}


// Event Handler

btn.addEventListener("click", getValues)