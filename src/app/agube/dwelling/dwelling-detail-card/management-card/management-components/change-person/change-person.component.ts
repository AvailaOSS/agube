import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DwellingService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "../../../../../agube-route";

@Component({
  selector: "app-change-person",
  templateUrl: "./change-person.component.html",
  styleUrls: ["./change-person.component.scss"],
})
export class ChangePersonComponent {
  title = "Alta Persona";
  dwellingId: number;
  personForm: FormGroup;
  userForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    public readonly router: Router,
    public readonly svcAlert: NotificationService,
    public readonly svcCreateNewDWelling: DwellingService
  ) {
    this.createForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.dwellingId = params.data;
    });
  }

  private createForm(): void {
    this.personForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      address: this.formBuilder.array([this.getAddressForm()]),
      phones: this.formBuilder.array([this.getPhoneForm()]),
    });
  }

  private getPhoneForm() {
    return this.formBuilder.group({
      phone_number: ["", Validators.required],
    });
  }

  public addPhone(): void {
    this.userForm = this.personForm.get("phones") as FormArray;
    this.userForm.push(this.getPhoneForm());
  }

  public removePhone(index: number): void {
    this.userForm = this.personForm.get("phones") as FormArray;
    this.userForm.removeAt(index);
  }

  private getAddressForm() {
    return this.formBuilder.group({
      number: ["", Validators.required],
      flat: ["", Validators.required],
      gate: ["", Validators.required],
      address: this.formBuilder.group({
        town: ["", Validators.required],
        street: ["", Validators.required],
        is_external: [true, Validators.required],
      }),
    });
  }

  public addAddress(): void {
    this.userForm = this.personForm.get("address") as FormArray;
    this.userForm.push(this.getAddressForm());
  }

  public removeAddress(index: number): void {
    this.userForm = this.personForm.get("address") as FormArray;
    this.userForm.removeAt(index);
  }

  public onSubmit(): void {
    this.svcCreateNewDWelling
      .changeCurrentResident(this.dwellingId, {
        user: this.personForm.value,
      })
      .subscribe(
        () => this.router.navigate([AgubeRoute.DWELLING]),
        (err) =>
          this.svcAlert.error(JSON.stringify(err.error), {
            autoClose: false,
            keepAfterRouteChange: false,
          })
      );
  }
}
