import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ProductDeleteDataSource,
  ProductDeleteItem,
} from './product-delete-datasource';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id !== null
      ? this.productService.readById(Number(id)).subscribe((product) => {
          this.product = product;
        })
      : null;
  }
  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe();
    {
      this.productService.showMessage('Produto Excluido!');
      this.router.navigate(['/products']);
    }
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
