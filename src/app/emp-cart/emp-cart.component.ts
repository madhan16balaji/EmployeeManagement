import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-emp-cart',
  templateUrl: './emp-cart.component.html',
  styleUrls: ['./emp-cart.component.css']
})
export class EmpCartComponent implements OnInit {
  empDetails;

  constructor(
    private cartService: CartService
  ) { 
    this.empDetails = this.cartService.getEmpDetails();
  }

  ngOnInit() {
  }

}
