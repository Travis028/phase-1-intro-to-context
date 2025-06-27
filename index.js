// Create a single employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Context-aware time-in event creation
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
        employee: `${employeeRecord.firstName} ${employeeRecord.familyName}`
    });
    return employeeRecord;
}

// Context-aware time-out event creation
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
        employee: `${employeeRecord.firstName} ${employeeRecord.familyName}`
    });
    return employeeRecord;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

// Calculate all wages earned by an employee
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

// Create a bound version of any function
function bindFunction(context, functionName) {
    const fn = window[functionName];
    return fn.bind(context);
}

// Create multiple employee records from an array
function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(data => createEmployeeRecord(data));
}

// Calculate payroll for multiple employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}

// Example usage:
// const employee = createEmployeeRecord(["John", "Doe", "Developer", 25]);
// const boundTimeIn = bindFunction(employee, 'createTimeInEvent');
// boundTimeIn("2025-06-27 0900");
// employee.createTimeOutEvent("2025-06-27 1700");
// console.log(allWagesFor(employee)); // Outputs the total wages for the day

// Export for testing
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    calculatePayroll,
    bindFunction
};
