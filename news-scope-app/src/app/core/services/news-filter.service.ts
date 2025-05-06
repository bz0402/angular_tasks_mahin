import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewsFilterService {
  private category$ = new BehaviorSubject<string>('');
  private language$ = new BehaviorSubject<string>('');
  private country$ = new BehaviorSubject<string>('');

  getCategory$() {
    return this.category$.asObservable();
  }

  getLanguage$() {
    return this.language$.asObservable();
  }

  getCountry$() {
    return this.country$.asObservable();
  }

  setCategory(category: string) {
    this.category$.next(category);
  }

  setLanguage(language: string) {
    this.language$.next(language);
  }

  setCountry(country: string) {
    this.country$.next(country);
  }
}
