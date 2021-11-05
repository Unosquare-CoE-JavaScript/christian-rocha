/*
  • A getter method returns the value of the property’s value. A getter is also called an accessor.
  • A setter method updates the property’s value. A setter is also known as a mutator.
*/

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }
}

accounting.mostRecentReport = 'Year End Report';
console.log(accounting.mostRecentReport);
