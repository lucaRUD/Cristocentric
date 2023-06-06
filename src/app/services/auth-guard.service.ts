import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export function canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> {
  console.log('canActivate called');
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn.pipe(
    map((isLoggedIn) => {
      console.log('isLoggedIn:', isLoggedIn);
      if (route.routeConfig?.path === 'login' && isLoggedIn) {
        return router.createUrlTree(['/home']);
      }
      return true;
    })
  );
}

export function isRedirected(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree {
  const router = inject(Router);

  // Check if user was redirected to this page
  const navigation = router.getCurrentNavigation();
  if (
    navigation &&
    navigation.extras.state &&
    navigation.extras.state['redirected']
  ) {
    // User was redirected to this page
    return true;
  }

  // User was not redirected to this page
  return router.createUrlTree(['/home']);
  return false;
}
