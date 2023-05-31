import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/product';


@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css'],
})



export class ProductCatalogComponent implements OnInit {
   products: Product[] = [];
  ApiURL= 'http://localhost:8000/accounts/products/';
  dbproduct:any
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http.get<Product[]>(this.ApiURL).subscribe(data => {
      this.products = data;
      this.products.forEach(product => console.log(product.id));
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['store/product', id]);
  }




  }
  

  // products = [
  //   {
  //     name: 'Product 1',
  //     price: 9.99,
  //     image: 'assets/prodigi-sweatshirt-uk-s-jet-black.png/'
  //   },
  //   {
  //     name: 'Product 2',
  //     price: 19.99,
  //     image: 'assets/prodigi-tshirt-uk-s-black.png'
  //   },
  // ]
  



