import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ManagerService, ReservoirService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "../../agube-route";

@Component({
  selector: "app-create-reservoir",
  templateUrl: "./create-reservoir.component.html",
  styleUrls: ["./create-reservoir.component.scss"],
})
export class CreateReservoirComponent implements OnInit {
  public createFormGroup: FormGroup;
  public reservoirFormGroup: FormGroup;
  public submitted = false;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public username: string;
  public userId: string;

  constructor(
    private router: Router,
    private readonly svcCreateNewReservoir: ReservoirService,
    private readonly svcManager: ManagerService,
    private readonly alertService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
  }

  public ngOnInit(): void {
    this.createFormGroup = this.formBuilder.group({
      street: ["", Validators.required],
      number: ["", Validators.required],
      gate: ["", Validators.required],
      flat: ["", Validators.required],
      city: ["", Validators.required],
      waterMeter: ["", Validators.required],
    });
    this.reservoirFormGroup = this.formBuilder.group({
      capacity: ["", Validators.required],
      inlet: ["", Validators.required],
      outlet: ["", Validators.required],
    });
  }

  get f() {
    return this.createFormGroup.controls;
  }

  public onSubmitReservoir(): void {
    console.log("alta", this.createFormGroup.value);
    console.log("datos", this.reservoirFormGroup.value);
    this.svcCreateNewReservoir
      .createReservoir({
        user_id: +this.userId,
        full_address: {
          address: {
            town: this.createFormGroup.value.city,
            street: this.createFormGroup.value.street,
            is_external: true,
          },
          number: this.createFormGroup.value.number,
          flat: this.createFormGroup.value.flat,
          gate: this.createFormGroup.value.gate,
        },
        capacity: this.reservoirFormGroup.value.capacity,
        outlet_flow: this.reservoirFormGroup.value.outlet,
        inlet_flow: this.reservoirFormGroup.value.inlet,
        water_meter: { code: this.createFormGroup.value.waterMeter },
      })
      .subscribe(
        (value) => {
          this.router.navigate([AgubeRoute.RESERVOIR]);
        },
        (error) => {
          this.alertService.error("Error al actualizar " + error.error.status);
        }
      );
  }
}
