import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DwellingService, Owner } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "./../../../../../agube-route";

@Component({
  selector: "app-change-owner",
  templateUrl: "./change-owner.component.html",
  styleUrls: ["./change-owner.component.scss"],
})
export class ChangeOwnerComponent implements OnInit {
  @Input() titleFormOwner?: string = "Cambio de Propietario";
  public ownerFormGroup: FormGroup;
  public submitted = false;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public ownerId: string;
  public userId: string;
  public ownerData: Owner;
  public owner: Owner;
  public name: string;
  public lastName: string;
  public email: string;
  public phone: string;

  constructor(
    private svcRouter: Router,
    private route: ActivatedRoute,
    private readonly svcChangeOwner: DwellingService,
    private readonly alertService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    //
  }

  get f() {
    return this.ownerFormGroup.controls;
  }

  public ngOnInit(): void {
    this.ownerFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.ownerId = params.data;
      this.userId = params.user_id;
    });
    this.svcChangeOwner
      .getCurrentOwner(+this.ownerId)
      .subscribe((value: Owner[]) => {
        this.owner = (value as unknown) as Owner;
        this.ownerData = this.owner;
        this.name = this.owner.user.first_name;
        this.lastName = this.owner.user.last_name;
        this.email = this.owner.user.email;
        this.owner.user.phones.map((ph) => {
          this.phone = ph.phone_number;
        });
      });
  }

  public onSubmit(): void {
    this.svcChangeOwner
      .changeCurrentOwner(+this.ownerId, {
        user: {
          address: [
            {
              address: {
                street: this.ownerData.user.address[0].address.street,
                town: this.ownerData.user.address[0].address.town,
                is_external: true,
              },
              number: this.ownerData.user.address[0].number,
              flat: this.ownerData.user.address[0].flat,
              gate: this.ownerData.user.address[0].gate,
            },
          ],
          phones: [
            {
              phone_number: this.ownerFormGroup.value.phone,
            },
          ],
          email: this.ownerFormGroup.value.email,
          first_name: this.ownerFormGroup.value.name,
          last_name: this.ownerFormGroup.value.lastName,
        },
      })
      .subscribe(
        () => {
          this.svcRouter.navigate([AgubeRoute.DWELLING]);
        },
        (error) => {
          this.alertService.error("Error" + error.error.status, this.options);
        }
      );
  }
}
