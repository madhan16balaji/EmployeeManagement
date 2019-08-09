import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../cart.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  detail;
}

@Component({
  selector: 'app-emp-cart',
  templateUrl: './emp-cart.component.html',
  styleUrls: ['./emp-cart.component.css']
})
export class EmpCartComponent implements OnInit {
  empDetails;
  searchVal='';
  searchRes = [];

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
  ) { 
    this.empDetails = this.cartService.getEmpDetails();
  }

  searchEmp(){
    if(this.searchVal) {
      this.searchRes = [];
      for(let i in this.empDetails) {
        let name = (this.empDetails[i].fname+' '+this.empDetails[i].lname).toLowerCase();
        let sVal = this.searchVal.toLowerCase();

        if(name.includes(sVal)) {
          this.searchRes.push(i);
          console.log(this.searchRes);
        }
      }
    }
    else {
      this.searchRes = [];
    }
  }

  openDialog(i) {
    const dialogRef = this.dialog.open(EmpDetDialog, {
      height: '400px',
      width: '600px',
      data: this.empDetails[i]
    });
    console.log(this.empDetails[i]);
    
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'emp-detail-dialog',
  templateUrl: 'emp-det-dialog.html',
})
export class EmpDetDialog {

  constructor(
    public dialogRef: MatDialogRef<EmpDetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}