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

// Create multiple employee records from an array of arrays
function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(data => createEmployeeRecord(data));
}

// Create a time-in event and add it to the employee's record
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employeeRecord;
}

// Create a time-out event and add it to the employee's record
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
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

// Calculate payroll for multiple employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}
