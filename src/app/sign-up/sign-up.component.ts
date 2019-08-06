import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { sFields } from './sign-up-fields';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  s_Fields;
  signupForm;
  flag=true;
  vflag=true;
  alertText='';
  url : any ='';

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
  )
  
  { 
    this.s_Fields=sFields;

    this.signupForm = this.formBuilder.group({
      fname: '',
      lname: '',
      eId: '',
      sex: '',
      dob: '',
      mail:'',
      qual: '',
      pos: '',
      aadhar: '',
      pan: '',
      dp: ''
    });
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);

      }
    }
  }

  onSubmit(formData) {
    for(let i in formData) {
      if(formData[i]=='' || formData[i]==null) {
        this.flag=false;
      }
    }

    if(this.flag && this.vflag) {
      window.alert('Employee Details Added Successfully');
      console.log(this.cartService.getEmpDetails());
      formData['url']=this.url;
      this.cartService.addToCart(formData);

      // document.getElementById('addForm').reset();
      this.signupForm.reset();  

      console.log(this.cartService.getEmpDetails());
    }
    else {
      this.alertText = 'Please provide Valid Inputs';
    }
  }

  valid(e) {
    let type = e.target.type;
    let val = e.target.value;
    let name = e.target.name;
    
    let regemail=/^[^ @]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let regeaadhar=/^[0-9]{12}$/;
    let regepan=/^[a-zA-Z0-9]$/;


    if(val=='' || (type=='select-one' && val=='Choose...')) {
      this.alertText = name+' cannot be empty';
      this.vflag=false;
    }
    else if( ( type=='email' && !(regemail.test(val)) ) || 
      ( name=='Aadhar No.' && !(regeaadhar.test(val)) ) ||
      ( name=='PAN No.' && !(regepan.test(val)) ) ){
      this.alertText = "Invalid "+name;
      this.vflag=false;
    }
    else{
      this.vflag=true;
    }
  }
 
  ngOnInit() {
  }

}
