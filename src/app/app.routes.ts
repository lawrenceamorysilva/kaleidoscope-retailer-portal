import { Routes } from '@angular/router';
import { SandboxComponent } from './component/sandbox/sandbox.component';

export const routes: Routes = [
  { path: 'sandbox', component: SandboxComponent },
  { path: '', redirectTo: '/sandbox', pathMatch: 'full' },
];
