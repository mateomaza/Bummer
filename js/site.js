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
            displayTable(data, term);
        } else {
            alert("Values must be whole numbers higher than 0");
        }
    }
}

function generateData(b, t, r) {

    let data = []
    
    let payment = b * r / 1200 / (1 - (1 + r / 1200) ** -t).toFixed(2);
    let principalValues = [];
    let interestValues = [];
    let totalIntValues = [];
    let balanceValues = [];
    let interestSum = 0;

    for (let i = 0; i < t; i++) {
        let currentInterest = (b * r / 1200).toFixed(2);
        let currentPrincipal = (payment - currentInterest).toFixed(2);
        b -= currentPrincipal;
        principalValues.push(currentPrincipal);
        interestValues.push(currentInterest);
        interestSum += parseFloat(currentInterest);
        totalIntValues.push(interestSum.toFixed(2));
        balanceValues.push(b.toFixed(2));
    }

    // "payment" is the same every month, that's why it's different
    data = [payment, principalValues, interestValues, totalIntValues, balanceValues]
    
    return data
}

function displayTable(data, t) {

    let tableRows = []

    let principalValues = data[1]
    let interestValues = data [2]
    let totalIntValues = data[3]
    let balanceValues = data[4]
    
    for (let index = 0; index < t; index++) {

        let pV = principalValues[index]
        let iV = interestValues[index]
        let totalIV = totalIntValues[index]
        let bV = balanceValues[index]

        tableRows += `<tr><td>${index+1}</td><td>${data[0]}</td><td>${pV[index]}</td>
        <td>${iV[index]}</td><td>${totalIV[index]}</td><td>${bV[index]}</td>`
    }

    table.innerHTML = tableRows 

}

btn.addEventListener("click", getValues)