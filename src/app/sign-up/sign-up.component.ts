import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from '../cart.service';
import { sFields } from './sign-up-fields';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  s_Fields;
  isNew : boolean=true;
  index = 'new';
  empDetail = {
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
  };
  signupForm;
  flag=true;
  vflag=true;
  alertText='';
  url : any ='assets/no_img_prev.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router:Router,
  )
  
  { 
    this.s_Fields=sFields;
    this.signupForm = this.formBuilder.group(this.empDetail);
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
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
      
      if(this.isNew) {
        window.alert('Employee Details Added Successfully');
        formData['url']=this.url;
        this.cartService.addToCart(formData);
      }
      else {
        window.alert('Employee Details Updated Successfully');
        formData['url']=this.url;
        console.log(this.url);
        this.cartService.updateCart(formData, this.index);
        this.router.navigate(['/cart']);
      }

      // (<HTMLInputElement>document.getElementById('addForm')).reset();
      this.signupForm.reset();

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
      if(type=="file") {
        this.url = 'assets/no_img_prev.jpg';
      }
      this.alertText = name+' cannot be empty';
      this.vflag=false;
    }
    else if( ( type=='email' && !(regemail.test(val)) ) || 
      ( name=='Aadhar No.' && !(regeaadhar.test(val)) ) ||
      ( name=='PAN No.' && !(regepan.test(val)) ) ){
      this.alertText = "Invalid "+name;
      this.vflag=false;
    }
    else {
      this.vflag=true;
      this.flag=true;
    }
  }
 
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.index = params.get('empId');
      if( this.index !='new' ) {
        this.isNew=false;
        this.empDetail = this.cartService.getEmpDetails()[this.index];
        let filtEmpDetail = {};
        for(let x in this.empDetail) {
          if(x!='url') {
            if(x=='sex' || x=='pos' || x=='dp') {
              filtEmpDetail[x]='';
            }
            else {
              filtEmpDetail[x]=this.empDetail[x];
            }
          }
        }
        this.signupForm = this.formBuilder.group(filtEmpDetail);
      }
      else {
        this.empDetail = {
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
        };
      }
    });
  }

}
