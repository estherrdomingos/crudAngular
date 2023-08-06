import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductUpdateDataSource, ProductUpdateItem } from './product-update-datasource';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})


export class ProductUpdateComponent implements OnInit {
  product: Product = {
    name : '',
    price : 0
  }
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')
    id !== null ? 
    this.productService.readById(Number(id)).subscribe(product => {
      this.product = product
    }) : null
  }
  updateProduct(): void{
   this.productService.update(this.product).subscribe(() =>{
    this.productService.showMessage('Produto Alterado!');
    this.router.navigate(['products']);
   })

  }
  cancel(): void {
    this.router.navigate(['products'])
  }
}
