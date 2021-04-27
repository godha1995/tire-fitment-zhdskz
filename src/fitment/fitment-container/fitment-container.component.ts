import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getVehicleState,
  VehicleState
} from "../store/reducers/vehicle.reducer";
import {
  LoadYears,
  LoadMakes,
  LoadModels,
  LoadTrims
} from "../store/actions/vehicle.action";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-fitment-container",
  templateUrl: "./fitment-container.component.html",
  styleUrls: ["./fitment-container.component.css"]
})
export class FitmentContainerComponent implements OnInit {
  getTireForm: FormGroup;
  years$: string[];
  makes$: string[];
  models$: string[];
  trims$: string[];

  // import the store into the constructor
  constructor(private store: Store<VehicleState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.store.select(getVehicleState).subscribe((data: any) => {
      if (data.vehicle) {
        this.years$ = data.vehicle.years;
        this.makes$ = data.vehicle.makes;
        this.models$ = data.vehicle.models;
        this.trims$ = data.vehicle.trims;
      }
    });

    this.getTireForm = this.fb.group({
      year: [""],
      make: [""],
      model: [""],
      trim: [""]
    });
  }

  onChangeYear(e) {
    console.log("On Change Year", e);
    if (e) {
      console.log(`Year : ${e}`);

      const action = new LoadMakes({ year: e });
      this.store.dispatch(action);
      this.getTireForm.get("year").setValue(e);
    }
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
  }

  onChangeMake(e) {
    console.log("On Change Make", e);
    if (e) {
      console.log(`Make : ${e}`);
      const action = new LoadModels({
        make: e,
        year: this.getTireForm.get("year").value
      });
      this.store.dispatch(action);
      this.getTireForm.get("make").setValue(e);
    }
    this.models$ = [];
    this.trims$ = [];
  }

  onChangeModel(e) {
    console.log("On Change Model");
    if (e) {
      console.log(`Model : ${e}`);
      const action = new LoadTrims({
        model: e,
        make: this.getTireForm.get("make").value,
        year: this.getTireForm.get("year").value
      });
      this.store.dispatch(action);
      this.getTireForm.get("model").setValue(e);
    }
    this.trims$ = [];
  }

  onChangeTrim(e) {
    console.log("On Change Trim");
    if (e) {
      console.log(`Trim : ${e}`);
      this.getTireForm.get("trim").setValue(e);
    }
  }

  getYears() {
    console.log("getYears");
    const action = new LoadYears();
    console.log(action);
    // dispatch an action to get array of years
    this.store.dispatch(action);
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
  }
}
