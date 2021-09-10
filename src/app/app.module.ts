import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AsideComponent } from './components/aside/aside.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ClientOrderComponent } from './pages/client-order/client-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DeliveryComponent,
    AboutComponent,
    DiscountsComponent,
    PaymentComponent,
    BasketComponent,
    OfertaComponent,
    ContactsComponent,
    AsideComponent,
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    ProductCategoryComponent,
    ClientOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCE__kPWV4O1pz8WETsekBCvFrDxYxHINA",
      authDomain: "sushi-stat.firebaseapp.com",
      storageBucket: "sushi-stat.appspot.com",
      projectId: "sushi-stat",
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
