import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  providers: [
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
