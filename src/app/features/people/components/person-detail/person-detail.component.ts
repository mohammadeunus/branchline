import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService, Person } from '../../services/people.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: Person | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPerson(id);
    }
  }

  loadPerson(id: string): void {
    this.loading = true;
    this.peopleService.getPersonById(id).subscribe({
      next: (person) => {
        this.person = person || null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/people']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }

  editPerson(): void {
    // Navigate to edit form
    console.log('Edit person:', this.person);
  }
}