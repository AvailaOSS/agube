import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reservoir-utils',
  templateUrl: './reservoir-utils.component.html',
  styleUrls: ['./reservoir-utils.component.scss'],
})
export class ReservoirUtilsComponent implements OnInit {
  @Input() titleCard: string;
  @Input() formDataConfiguration: BehaviorSubject<any> = new BehaviorSubject(5);
  @Input() isHiddenAddress = false;
  @Input() isHiddenBank = false;
  @Input() isHiddenCount = false;
  @Input() isHiddenCapacity = false;
  @Input() isHiddenInletFlow = false;
  @Input() isHiddenOutletFlow = false;
  @Input() ownerTitle = 'Alta Depósito';
  @Input() residentTitle = 'Alta Residente';
  @Input() error = false;

  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();

  public registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      address: new FormControl(),
      number: new FormControl(),
      flat: new FormControl(),
      gate: new FormControl(),
      town: new FormControl(),
      numberBank: new FormControl(),
      code: new FormControl(),
      capacity: new FormControl(),
      inlet_flow: new FormControl(),
      outlet_flow: new FormControl(),
    });

    this.formDataConfiguration.subscribe((value) => {
      if (!isUndefined(value) && value !== 5) {
        console.log(value)
        this.registerForm.get('numberBank').setValue(value.iban);
        this.registerForm.get('code').setValue(value.code);
        this.registerForm.get('number').setValue(value.user.address[0].number);
        this.registerForm.get('flat').setValue(value.user.address[0].flat);
        this.registerForm.get('gate').setValue(value.user.address[0].gate);
        this.registerForm
          .get('town')
          .setValue(value.user.address[0].address.town);
        this.registerForm.get('capacity').setValue(value.capacity);
        this.registerForm.get('inlet_flow').setValue(value.inlet_flow);
        this.registerForm.get('outlet_flow').setValue(value.outlet_flow);
      }
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    this.sendForm.emit(this.registerForm.value);
  }
}
