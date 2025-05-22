import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  postcode: string = '';
  suburb: string = '';
  weight: number | null = null;
  inputSuburb: string = '';
  shippingData: any = null;
  error: string = '';

  constructor(private shippingService: ShippingService) {}

  onSubmit() {
    this.error = ''; // Clear previous error
    this.shippingData = null; // Clear previous data

    if (
      !this.postcode ||
      !this.suburb ||
      this.weight === null ||
      this.weight <= 0
    ) {
      this.error =
        'Please fill all fields with valid values (postcode, suburb, and weight > 0).';
      return;
    }

    this.inputSuburb = this.suburb;
    this.shippingService
      .getShippingCost(this.postcode, this.suburb, this.weight)
      .subscribe({
        next: (data) => {
          if (data.error) {
            this.error = data.error; // Use API error message
            this.shippingData = null;
          } else {
            this.shippingData = data;
          }
        },
        error: (err) => {
          // Extract error message from API response if available
          this.error =
            err.error?.error ||
            'Error fetching shipping costs. Please check your connection and try again.';
          this.shippingData = null;
        },
      });
  }
}
