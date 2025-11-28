package ma.fstt.employee_api.service;

import ma.fstt.employee_api.entity.Employee;
import ma.fstt.employee_api.exception.ResourceNotFoundException;
import ma.fstt.employee_api.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repo;

    @Override
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found : " + id));
    }

    @Override
    public Employee save(Employee employee) {
        return repo.save(employee);
    }

    @Override
    public Employee update(Long id, Employee emp) {
        Employee e = getById(id);
        e.setFirstName(emp.getFirstName());
        e.setLastName(emp.getLastName());
        e.setEmail(emp.getEmail());
        e.setSalary(emp.getSalary());
        return repo.save(e);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
