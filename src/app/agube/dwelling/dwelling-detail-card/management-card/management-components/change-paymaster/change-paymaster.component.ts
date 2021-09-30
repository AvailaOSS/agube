import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DwellingService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { isUndefined } from "lodash";
import { AgubeRoute } from "../../../../../agube-route";

@Component({
  selector: "app-change-paymaster",
  templateUrl: "./change-paymaster.component.html",
  styleUrls: ["./change-paymaster.component.scss"],
})
export class ChangePaymasterComponent implements OnInit {
  public registerForm: FormGroup;
  public username: string;
  public changePayId: string;
  public owner: string;

  public addressOwn: string;
  public phoneOwn: string;
  public resident: string;

  public addressRes: string;
  public phoneRes: string;
  public selectRow: string;

  public formConfigurationData: EventEmitter<string> = new EventEmitter<
    string
  >();

  constructor(
    private route: ActivatedRoute,
    private readonly svcChangePay: DwellingService,
    private formBuilder: FormBuilder,
    private svcRouter: Router,
    public alertService: NotificationService
  ) {
    //
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.changePayId = params.data;
    });
    this.registerForm = this.formBuilder.group({
      numberBank: new FormControl(),
    });
    this.svcChangePay.getCurrentOwner(+this.changePayId).subscribe((owner) => {
      this.owner = Object.entries(owner)[2][1]["username"];
      this.addressOwn = Object.entries(owner)[2][1][
        "address"
      ][0].address.street;
      this.phoneOwn = Object.entries(owner)[2][1]["phones"][0].phone_number;
    });
    this.svcChangePay
      .getCurrentResident(+this.changePayId)
      .subscribe((value) => {
        this.resident = Object.entries(value)[2][1]["username"];
        this.addressRes = Object.entries(value)[2][1][
          "address"
        ][0].address.street;
        this.phoneRes = Object.entries(value)[2][1]["phones"][0].phone_number;
      });
  }

  public onSubmit(): void {
    if (!isUndefined(this.selectRow)) {
      // TODO:
    } else {
      this.alertService.error("Debe de seleccionar un pagador");
    }
  }

  public selectedRow(event): void {
    if (!isUndefined(event)) {
      this.selectRow = event;
    }
  }

  public goToControlPanel(): void {
    this.svcRouter.navigate([AgubeRoute.DWELLING]);
  }
}
