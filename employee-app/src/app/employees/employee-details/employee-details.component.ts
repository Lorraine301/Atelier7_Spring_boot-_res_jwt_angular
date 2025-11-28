import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class EmployeeDetailsComponent implements OnInit {

  employee: any = {};

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getById(id).subscribe(res => {
      this.employee = res;
    });
  }
}
