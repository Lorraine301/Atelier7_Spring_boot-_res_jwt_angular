package ma.fstt.employee_api.service;


import ma.fstt.employee_api.entity.Employee;
import java.util.List;

public interface EmployeeService {

    List<Employee> getAll();
    Employee getById(Long id);
    Employee save(Employee employee);
    Employee update(Long id, Employee employee);
    void delete(Long id);
}
