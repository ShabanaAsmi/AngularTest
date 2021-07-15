import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListingComponent } from './inventory-listing/inventory-listing.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryChildComponent } from './inventory-child/inventory-child.component';


@NgModule({
  declarations: [InventoryListingComponent, InventoryCreateComponent, InventoryChildComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule 
  ]
})
export class InventoryModule { }
