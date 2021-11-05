/**
  Prefix readonly is used to make a property as read-only. Read-only members can be accessed outside the class, but their value cannot be changed. Since read-only members cannot be changed outside the class, they either need to be initialized at declaration or initialized inside the class constructor.
 */

class Department {
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
  }


  addEmployee(employee: string) {
  }

  printEmployeeInformation() {
  }
}

const accounting = new Department('d1', 'Accounting');
