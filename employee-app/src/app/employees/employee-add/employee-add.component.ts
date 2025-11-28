import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class EmployeeAddComponent {

  employee = { firstName: '', lastName: '', email: '', salary: 0 };
  submitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private employeeService: EmployeeService, private router: Router) {}

  save(form: NgForm) {
    if (form.invalid) {
      return; // Empêche l'envoi si le formulaire n'est pas valide
    }

    this.submitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.employeeService.create(this.employee).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Employé ajouté avec succès !';
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 1500);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = 'Erreur lors de l’enregistrement. Vérifiez vos données ou votre connexion.';
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
