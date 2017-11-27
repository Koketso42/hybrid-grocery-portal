import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCatalogueCacheRoutingModule } from './product-catalogue-cache-routing.module';
import { ProductCatalogueCacheService } from './product-catalogue-cache.service';

@NgModule({
  imports: [
    CommonModule,
    ProductCatalogueCacheRoutingModule
  ],
  declarations: [],
  providers: [ProductCatalogueCacheService]
})
export class ProductCatalogueCacheModule { }
