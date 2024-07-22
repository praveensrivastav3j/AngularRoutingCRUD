import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  localStorageKey = 'vruticrud';
  userForm: FormGroup;

  userData: any = [];

  constructor(
    private FormBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = FormBuilder.group({
      id: [''],
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],

    })
  }

  ngOnInit() {
    if (localStorage.getItem(this.localStorageKey)) {
      this.userData = JSON.parse(localStorage.getItem(this.localStorageKey) || "");
    }
  }

  UpdateUserDate(userid: number) {
    this.router.navigateByUrl(`/update/${userid}`)
    // let singleData = this.userData.find((x:any)=> x.id === userid);
    // this.userForm.patchValue({
    //   Fname : singleData.Fname,
    //   Lname : singleData.Lname,
    //   email : singleData.email,
    //   dob : singleData.dob,
    //   address : singleData.address,
    //   phoneno : singleData.phoneno,
    //   id : singleData.id,
    // });
  }

  DeleteUserDate(userid: string) {
    console.log(userid)
    let index = this.userData.findIndex((x: any) => x.id === userid);
    if (index > -1) {
      this.userData.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userData));
    }
  }

}
