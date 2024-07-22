import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  localStorageKey = 'vruticrud';
  userForm: FormGroup;

  userData: any = [];
  userFormsubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = formBuilder.group({
      id: [''],
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],

    });
  }

  ngOnInit() {
    if (localStorage.getItem(this.localStorageKey)) {
      this.userData = JSON.parse(localStorage.getItem(this.localStorageKey) || '');
    }

    if (this.activatedRoute.snapshot.params['id']) {
      this.UpdateUserDate(this.activatedRoute.snapshot.params['id'])
    }
  }

  get UserFormValue() {
    return this.userForm.controls;
  }

  submitForm() {
    this.userFormsubmitted = true;
    if (this.userForm.valid) {
      if (this.userForm.value.id) {
        // update Data
        let index = this.userData.findIndex((x: any) => x.id === this.userForm.value.id);
        this.userData.splice(index, 1, this.userForm.value);
      }
      else {
        // Add Data
        this.userForm.patchValue({
          id: new Date().getTime(),
        })
        this.userData.push(this.userForm.value);
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userData));
      this.userForm.reset();
      this.router.navigateByUrl('/list');
    }
    else {
      console.log('form invalid');

    }
    console.log(this.userData);

  }

  UpdateUserDate(userid: number) {
    let singleData = this.userData.find((x: any) => x.id == userid);
    if (singleData) {

      this.userForm.patchValue({
        Fname: singleData.Fname,
        Lname: singleData.Lname,
        email: singleData.email,
        dob: singleData.dob,
        address: singleData.address,
        phoneno: singleData.phoneno,
        id: singleData.id,
      });
    }
  }


}
