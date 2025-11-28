package ma.fstt.employee_api.entity;

import jakarta.persistence.*;
        import jakarta.validation.constraints.*;
        import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @NotBlank
    private String email;

    @Min(0)
    private double salary;
}
