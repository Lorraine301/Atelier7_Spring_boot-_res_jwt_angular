package ma.fstt.employee_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ma.fstt.employee_api.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
