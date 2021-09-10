import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ClientOrderComponent } from './pages/client-order/client-order.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'clientsOrder', component: ClientOrderComponent },
  
  // { path: 'rolls', component: RollsComponent },
  // { path: 'sets', component: SetsComponent },
  // { path: 'sushi', component: SushiComponent },
  // { path: 'pizza', component: PizzaComponent },
  // { path: 'wok', component: WokComponent },
  // { path: 'soups', component: SoupsComponent },
  // { path: 'salads', component: SaladsComponent },
  // { path: 'drinks', component: DrinksComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'products/:categoryId', component: ProductCategoryComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'discount' },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent }


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
