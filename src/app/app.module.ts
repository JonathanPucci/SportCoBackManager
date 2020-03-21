import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DbmanagerComponent } from "./dbmanager/dbmanager.component";
import { EntityComponent } from "./dbmanager/entity/entity.component";
import { EntityService } from "./dbmanager/entity/entity-service.service";
@NgModule({
  declarations: [AppComponent, DbmanagerComponent, EntityComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EntityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
