import { Component, OnInit } from '@angular/core';
import { PeopleService, Person } from '../../services/people.service';
import { TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  selectedPeople: Person[] = [];

  columns: TableColumn[] = [
    { key: 'avatar', label: '', type: 'avatar', width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'jobTitle', label: 'Job title', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'site', label: 'Site', sortable: true },
    { key: 'salary', label: 'Salary', type: 'number', sortable: true },
    { key: 'startDate', label: 'Start date', type: 'date', sortable: true },
    { key: 'lifecycle', label: 'Lifecycle', type: 'badge', sortable: true },
    { key: 'status', label: 'Status', type: 'badge', sortable: true }
  ];

  actions: TableAction[] = [
    {
      label: 'View',
      icon: '👁️',
      action: (person: Person) => this.viewPerson(person)
    },
    {
      label: 'Edit',
      icon: '✏️',
      action: (person: Person) => this.editPerson(person)
    },
    {
      label: 'Delete',
      icon: '🗑️',
      action: (person: Person) => this.deletePerson(person)
    }
  ];

  // Filter properties
  searchTerm = '';
  selectedDepartment = '';
  selectedSite = '';
  selectedLifecycle = '';
  selectedStatus = '';

  departments: string[] = [];
  sites: string[] = [];
  lifecycles: string[] = [];
  statuses: string[] = [];

  constructor(
    private peopleService: PeopleService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.people = people;
        this.extractFilterOptions();
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Error', 'Failed to load people');
        this.loading = false;
      }
    });
  }

  extractFilterOptions(): void {
    this.departments = [...new Set(this.people.map(p => p.department))];
    this.sites = [...new Set(this.people.map(p => p.site))];
    this.lifecycles = [...new Set(this.people.map(p => p.lifecycle))];
    this.statuses = [...new Set(this.people.map(p => p.status))];
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    // Implement sorting logic
    console.log('Sort:', event);
  }

  onSelectionChange(selectedPeople: Person[]): void {
    this.selectedPeople = selectedPeople;
  }

  viewPerson(person: Person): void {
    this.router.navigate(['/people', person.id]);
  }

  editPerson(person: Person): void {
    // Navigate to edit form or open modal
    console.log('Edit person:', person);
  }

  deletePerson(person: Person): void {
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      this.peopleService.deletePerson(person.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Person deleted successfully');
          this.loadPeople();
        },
        error: () => {
          this.notificationService.error('Error', 'Failed to delete person');
        }
      });
    }
  }

  addPerson(): void {
    // Navigate to add form or open modal
    console.log('Add new person');
  }

  exportData(): void {
    // Implement export functionality
    console.log('Export data');
  }

  get filteredPeople(): Person[] {
    return this.people.filter(person => {
      const matchesSearch = !this.searchTerm || 
        person.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        person.jobTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = !this.selectedDepartment || person.department === this.selectedDepartment;
      const matchesSite = !this.selectedSite || person.site === this.selectedSite;
      const matchesLifecycle = !this.selectedLifecycle || person.lifecycle === this.selectedLifecycle;
      const matchesStatus = !this.selectedStatus || person.status === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesSite && matchesLifecycle && matchesStatus;
    });
  }
}