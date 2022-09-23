import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteComponent } from "./cliente/cliente.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }