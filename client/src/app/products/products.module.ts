import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared/shared.module';
import { ItemComponent } from './item/item.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [ProductsComponent, ItemComponent, DetailsComponent],
  imports: [
    SharedModule
  ]
})
export class ProductsModule { }
