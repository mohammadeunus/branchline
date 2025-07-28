import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Person {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  site: string;
  salary: number;
  startDate: string;
  lifecycle: string;
  status: string;
  avatar: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private apiService: ApiService) {}

  getPeople(): Observable<Person[]> {
    // Mock data for demonstration
    const mockPeople: Person[] = [
      {
        id: '1',
        name: 'Anatoly Belik',
        jobTitle: 'Head of Design',
        department: 'Product',
        site: 'Stockholm',
        salary: 1350,
        startDate: '2023-03-13',
        lifecycle: 'Hired',
        status: 'Invited',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'anatoly@crextio.com'
      },
      {
        id: '2',
        name: 'Ksenia Bator',
        jobTitle: 'Fullstack Engineer',
        department: 'Engineering',
        site: 'Miami',
        salary: 1500,
        startDate: '2023-10-13',
        lifecycle: 'Hired',
        status: 'Absent',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'ksenia@crextio.com'
      },
      {
        id: '3',
        name: 'Bogdan Nikitin',
        jobTitle: 'Mobile Lead',
        department: 'Product',
        site: 'Kyiv',
        salary: 2600,
        startDate: '2023-11-04',
        lifecycle: 'Employed',
        status: 'Invited',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'bogdan@crextio.com'
      },
      {
        id: '4',
        name: 'Arsen Yatsenko',
        jobTitle: 'Sales Manager',
        department: 'Operations',
        site: 'Ottawa',
        salary: 900,
        startDate: '2021-09-04',
        lifecycle: 'Employed',
        status: 'Invited',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'arsen@crextio.com'
      },
      {
        id: '5',
        name: 'Daria Yurchenko',
        jobTitle: 'Network engineer',
        department: 'Product',
        site: 'Sao Paulo',
        salary: 1000,
        startDate: '2023-02-21',
        lifecycle: 'Hired',
        status: 'Invited',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'daria@crextio.com'
      },
      {
        id: '6',
        name: 'Yulia Polishchuk',
        jobTitle: 'Head of Design',
        department: 'Product',
        site: 'London',
        salary: 1700,
        startDate: '2024-08-02',
        lifecycle: 'Employed',
        status: 'Absent',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
        email: 'yulia@crextio.com'
      }
    ];

    return of(mockPeople);
  }

  getPersonById(id: string): Observable<Person | undefined> {
    return this.apiService.get<Person>(`/people/${id}`);
  }

  createPerson(person: Partial<Person>): Observable<Person> {
    return this.apiService.post<Person>('/people', person);
  }

  updatePerson(id: string, person: Partial<Person>): Observable<Person> {
    return this.apiService.put<Person>(`/people/${id}`, person);
  }

  deletePerson(id: string): Observable<void> {
    return this.apiService.delete<void>(`/people/${id}`);
  }
}