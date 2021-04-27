import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";

import { reducers } from "./store";
import { HttpClientModule } from "@angular/common/http";

import { FitmentContainerComponent } from "./fitment-container/fitment-container.component";
import { EffectsModule } from "@ngrx/effects";
import { VehicleEffects } from "./store/effects/vehicle.effects";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature("fitment", reducers),
    EffectsModule.forFeature([VehicleEffects])
  ],
  declarations: [FitmentContainerComponent],
  exports: [FitmentContainerComponent]
})
export class FitmentModule {}
