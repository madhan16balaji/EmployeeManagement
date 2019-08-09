import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_empDetails';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( @Inject(LOCAL_STORAGE) private storage: StorageService ) { }

  addToCart(empDetail) {
    const currentEmpDetails = this.storage.get(STORAGE_KEY) || [];

    currentEmpDetails.push(empDetail);

    this.storage.set(STORAGE_KEY, currentEmpDetails);

    console.log(this.storage.get(STORAGE_KEY) || 'Local Storage is Empty');
  }

  updateCart(empDetail, index){
    let currentEmpDetails = this.storage.get(STORAGE_KEY) || [];

    currentEmpDetails[index] = empDetail;

    this.storage.set(STORAGE_KEY, currentEmpDetails);

    console.log(this.storage.get(STORAGE_KEY) || 'Local Storage is Empty');
  }

  getEmpDetails() {
    return this.storage.get(STORAGE_KEY);
  }

  clearCart() {
    this.storage.remove(STORAGE_KEY);
  }

  deleteEmpDetail(index) {
    let currentEmpDetails = this.storage.get(STORAGE_KEY) || [];

    currentEmpDetails.splice(index, 1);

    this.storage.set(STORAGE_KEY, currentEmpDetails);

    console.log(this.storage.get(STORAGE_KEY) || 'Local Storage is Empty');
  }

}
