import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-listing',
  templateUrl: './inventory-listing.component.html',
  styleUrls: ['./inventory-listing.component.css']
})
export class InventoryListingComponent implements OnInit { 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; 
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  getListData: any = [];

  constructor(private inventoryService:InventoryService,private router:Router, private commonService: CommonService) { 
  }

  displayedColumns: any[] = ['name', 'product', 'price', 'description','action'] 
  columns: any[] = [
    { field: 'name', display: 'Name' },
    { field: 'product', display: 'Product' },
    { field: 'price', display: 'Price' }, 
    { field: 'description', display: 'Description' },
    { field: 'action', display: 'Action' },
  ];
  dataSource : MatTableDataSource<any>;
  parentCount = 0;

  ngOnInit(): void {
    this.getInventoryList();
  }   

  displayCounter(count){
    this.parentCount = count;
  }

  getInventoryList(){
    this.inventoryService.getAllFields().subscribe(res => {
      this.getListData = res;
      this.sortAndPaginator();
    },
    err => {
      console.log(this.dataSource)
      this.commonService.openSnackBar('Inventory Load Failed', 'badge-danger');
    }
    )
  }
  sortAndPaginator(){
    this.dataSource = new MatTableDataSource(this.getListData); 
    this.dataSource.sortingDataAccessor = ((data, sortHeaderId) => {
      if (typeof data[sortHeaderId] == 'string') {
        return data[sortHeaderId].toString().toLowerCase();
      }
      else {
        return data[sortHeaderId];
      }
    });      
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  editItems(element){
    sessionStorage.setItem('inventoryData', JSON.stringify(element));
    this.router.navigate(['/inventory/product/edit']);
  }
  deleteItems(element){
  this.inventoryService.deleteInventory(element.id).subscribe(
    res => {
      this.commonService.openSnackBar('Inventory - ' + element.name + ' Deleted Successfully', 'badge-success');
      this.getInventoryList()
    },
    err => {
      this.commonService.openSnackBar('Inventory Delete Failed', 'badge-danger');
    }
  );
  }
  
  applyFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
