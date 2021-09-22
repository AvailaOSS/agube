import { Component, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DwellingService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "../../../../../agube-route";

@Component({
  selector: "app-change-resident",
  templateUrl: "./change-resident.component.html",
  styleUrls: ["./change-resident.component.scss"],
})
export class ChangeResidentComponent {
  @Input() dwellingId: any;
  @Input() titleFormResident?: string = "Cambio de residente";
  title = "Alta Residente";
  residentForm: FormGroup;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    public readonly svcAlert: NotificationService,
    private readonly svcCreateNewDWelling: DwellingService
  ) {
    this.createForm();
  }

  private createForm() {
    // {
    //   "user": {
    //     "first_name": "string",
    //     "last_name": "string",
    //     "email": "user@example.com",
    //     "phones": [
    //       {
    //         "phone_number": "string"
    //       }
    //     ],
    //     "address": [
    //       {
    //         "address": {
    //           "town": "string",
    //           "street": "string",
    //           "is_external": true
    //         },
    //         "number": 0,
    //         "flat": "string",
    //         "gate": "string"
    //       }
    //     ]
    //   }
    // }
    this.residentForm = this.formBuilder.group({
      user: this.formBuilder.group({
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", Validators.required],
        phones: this.formBuilder.array([]),
        address: this.formBuilder.array([]),
      }),
    });
    this.userForm = this.residentForm.controls.user as FormGroup;
  }

  public addPhones() {
    const phones = this.userForm.controls.phones as FormArray;
    phones.push(
      this.formBuilder.group({
        phone_number: ["", Validators.required],
      })
    );
  }

  public removePhone(index) {
    const phones = this.userForm.controls.phones as FormArray;
    phones.removeAt(index);
  }

  public addAddress() {
    const address = this.userForm.controls.address as FormArray;
    address.push(
      this.formBuilder.group({
        number: ["", Validators.required],
        flat: ["", Validators.required],
        gate: ["", Validators.required],
        address: this.formBuilder.group({
          town: ["", Validators.required],
          street: ["", Validators.required],
          is_external: [false, Validators.required],
        }),
      })
    );
  }

  public removeAddress(index) {
    const phones = this.userForm.controls.phones as FormArray;
    phones.removeAt(index);
  }

  public onSubmit(): void {
    this.svcCreateNewDWelling
      .changeCurrentResident(this.dwellingId, this.residentForm.value)
      .subscribe(
        () => {
          this.router.navigate([AgubeRoute.DWELLING]);
        },
        (err) => {
          this.svcAlert.error(JSON.stringify(err.error), {
            autoClose: false,
            keepAfterRouteChange: false,
          });
        }
      );
  }
}
