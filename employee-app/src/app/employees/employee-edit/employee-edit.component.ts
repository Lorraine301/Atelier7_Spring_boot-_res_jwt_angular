import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class EmployeeEditComponent implements OnInit {

  employee: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getById(id).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de l\'employé.';
        console.error(err);
      }
    });
  }
  onUpdate() {
    this.submitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.employeeService.update(this.employee.id, this.employee).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Employé modifié avec succès !';

        // Redirection après 1.5 secondes
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 1500);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = 'Erreur lors de la modification. Vérifiez vos données.';
        console.error(err);
      }
    });
  }
}
