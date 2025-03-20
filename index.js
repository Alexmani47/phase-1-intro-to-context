// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let inEvent = employee.timeInEvents.find(e => e.date === date);
    let outEvent = employee.timeOutEvents.find(e => e.date === date);
    return inEvent && outEvent ? (outEvent.hour - inEvent.hour) / 100 : 0;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0);
}

function calculatePayroll(employeeArray) {
    if (!Array.isArray(employeeArray)) {
        throw new TypeError("Expected an array of employee records");
    }
    return employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0);
}


let employees = createEmployeeRecords([
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcy", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]);

createTimeInEvent(employees[0], "2018-01-01 0800");
createTimeOutEvent(employees[0], "2018-01-01 1600");

createTimeInEvent(employees[1], "2018-01-01 0700");
createTimeOutEvent(employees[1], "2018-01-01 1700");

console.log("Payroll Total:", calculatePayroll(employees));
