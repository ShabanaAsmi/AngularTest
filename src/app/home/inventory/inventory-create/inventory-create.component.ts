import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {
  currentPage: any;
  pageName: string;
  inventoryForm: FormGroup; 
  submitted:boolean
  getData: any;

  constructor(private activeRoute:ActivatedRoute,private router:Router,private formBuilder: FormBuilder,
    private inventoryService:InventoryService, private commonService: CommonService,) {
    this.activeRoute.params.subscribe(params => this.currentPage = params.page);
   }

  ngOnInit(): void {
    this.inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      product: ['',Validators.required],
      price: ['',Validators.required],
      description: ['',Validators.required]
    });
    if(this.currentPage == 'add'){ 
      this.pageName = 'Create'
    }else{ 
      this.pageName = 'Update'
      this.getData = JSON.parse(sessionStorage.getItem('inventoryData'));
      this.inventoryForm.patchValue(this.getData); 
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.inventoryForm.invalid) {
      return;
    } 
    if(this.currentPage == 'add'){
      this.createData();
    }else{
    this.updateData();
    }
  }
  createData(){
    this.inventoryForm.value.id = uuidv4()
    this.inventoryService.createInventory(this.inventoryForm.value).subscribe(res => {
      this.commonService.openSnackBar('Inventory Created Successfully', 'badge-success');
      this.router.navigate(['/inventory/List'])
    },
    err => {
      this.commonService.openSnackBar('Inventory Creation Failed : ' + err.error.message, 'badge-danger');
    }
    )
  }
  updateData(){
    delete this.inventoryForm.value[`s.no`];
    this.inventoryService.updateInventory(this.getData.id,this.inventoryForm.value).subscribe(res => {
      this.commonService.openSnackBar('Inventory Updated Successfully', 'badge-success');
      this.router.navigate(['/inventory/List'])
    },
    err => {
      this.commonService.openSnackBar('Inventory Update Failed : ' + err.error.message, 'badge-danger');
    }
    )
  }
  reset(){
    const url = this.router.url;
    this.router.navigateByUrl('/inventory', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
  get f() { return this.inventoryForm.controls; }
}


