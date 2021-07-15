import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';
import { InventoryListingComponent } from './inventory-listing/inventory-listing.component';

const routes: Routes = [
  { path: 'product/:page', 
  component: InventoryCreateComponent
  },
  { path: 'List', 
  component: InventoryListingComponent
  },
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
