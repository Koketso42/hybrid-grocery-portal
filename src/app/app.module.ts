import { AuthenticationService } from './authentication/authentication.service';
import { ConfigurationService } from './config/configuration.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProcessModule } from './process/process.module';
import { BrandModule } from './brand/brand.module';
import { ProductCatalogueCacheService } from './product-catalogue-cache/product-catalogue-cache.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ProcessModule,
    BrandModule,
    HttpModule
  ],
  providers: [ConfigurationService, ProductCatalogueCacheService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot() {
    return {
      ngModule: AppModule,
      providers: []
    };
  }
}
