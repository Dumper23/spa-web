import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { provideClientHydration } from '@angular/platform-browser';
import { graphqlProvider } from './graphql.provider';
import { PrivateHomeComponent } from './components/private/private-home/private-home.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'private/home', component: PrivateHomeComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), SharedModule],
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(),
        graphqlProvider
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }