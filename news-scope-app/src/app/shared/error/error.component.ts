import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() errorCode: number = 0;
  @Input() errorMessage: string = 'An unexpected error occurred.';

  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data;
    this.errorCode = data['code'] || 0;
  }

  getTitle(): string {
    switch (this.errorCode) {
      case 404:
        return 'Page Not Found';
      case 500:
        return 'Server Error';
      case 403:
        return 'Access Denied';
      case 401:
        return 'Unauthorized';
      default:
        return 'Error';
    }
  }

  getDescription(): string {
    switch (this.errorCode) {
      case 404:
        return 'The page you’re looking for doesn’t exist. Check the URL or go back to the homepage.';
      case 500:
        return 'There’s a server issue. Please try again later.';
      case 403:
        return 'You don’t have permission to access this page.';
      case 401:
        return 'You need to log in to view this page.';
      default:
        return this.errorMessage || 'An unexpected error occurred. Please try again.';
    }
  }
}
