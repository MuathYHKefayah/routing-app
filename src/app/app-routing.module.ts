import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';

import { SelectivePreloadingStartegyService } from './selective-preloading-startegy.service';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  { // lazy loaded - admin module
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard] // The PreloadAllModules strategy does not load feature areas protected by a CanLoad guard.
  },
  { // lazy loaded - crisis-center module
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(m=> m.CrisisCenterModule),
    data: { preload: true }
  },
  // heroes => superheroes
  //the empty path route redirects to /heroes, which redirects to /superheroes. 
  //This won't work because the Router handles redirects once at each level of routing configuration
  {path: '', redirectTo: '/superheroes', pathMatch: 'full'}, 
  {path: '**' , component: PageNotFoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // debugging purposes only 
        preloadingStrategy: SelectivePreloadingStartegyService
      } 
    ),
  ],

  exports: [
    RouterModule
  ],
  // we can set [ PreloadAllModules ] To enable preloading of all lazy loaded modules
  // Add this serevice strategy to the AppRoutingModule providers array to be injectable elsewhere in the app.
  providers: [ SelectivePreloadingStartegyService ] 
})
export class AppRoutingModule { }
