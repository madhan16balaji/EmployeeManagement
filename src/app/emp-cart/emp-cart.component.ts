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
  delflag=false;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
  ) { 
    this.empDetails = this.cartService.getEmpDetails();
    for(let i in this.empDetails) {
      this.searchRes.push(parseInt(i));
    }
  }

  searchEmp(){
    if(this.searchVal) {
      this.searchRes = [];
      for(let i in this.empDetails) {
        let name = (this.empDetails[i].fname+' '+this.empDetails[i].lname).toLowerCase();
        let eId = (this.empDetails[i].eId).toLowerCase();
        let pos = (this.empDetails[i].pos).toLowerCase();

        let sVal = this.searchVal.toLowerCase();

        if(name.includes(sVal) || eId.includes(sVal) || pos.includes(sVal) ) {
          this.searchRes.push(parseInt(i));
        }
      }
    }
    else {
      this.searchRes = [];
      for(let i in this.empDetails) {
          this.searchRes.push(parseInt(i));
      }
    }
  }

  openDialog(i) {
    const dialogRef1 = this.dialog.open(EmpDetDialog, {
      height: '400px',
      width: '600px',
      data: this.empDetails[i]
    });
    
  }

  onDelete(i) {
    console.log(i);
    const dialogRef2 = this.dialog.open(DelAlertDialog, {
      height: '200px',
      width: '350px',
      data: {delflag: this.delflag, empdet: this.empDetails[i]}
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.delflag=result;
      if(this.delflag) {
        this.cartService.deleteEmpDetail(i);
        this.empDetails = this.cartService.getEmpDetails();
        this.searchEmp();
      }
    });
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
    public dialogRef1: MatDialogRef<EmpDetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef1.close();
  }

}

@Component({
  selector: 'del-alert-dialog',
  templateUrl: 'del-alert-dialog.html',
})
export class DelAlertDialog {

  constructor(
    public dialogRef2: MatDialogRef<EmpDetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef2.close();
  }

}