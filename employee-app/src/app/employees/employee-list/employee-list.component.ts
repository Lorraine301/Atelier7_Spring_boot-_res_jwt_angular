import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];

  // Injection du Router + AuthService
  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (res) => this.employees = res,
      error: (err) => console.error('Erreur chargement employés', err)
    });
  }

  deleteEmployee(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet employé ?')) return;

    this.employeeService.delete(id).subscribe({
      next: () => this.employees = this.employees.filter(e => e.id !== id),
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }

  logout() {
    if (!confirm("Voulez-vous vraiment vous déconnecter ?")) return;

    // 1. Nettoyage du token via AuthService
    this.auth.logout();

    // 2. Redirection
    this.router.navigate(['/login']);
  }
}
