
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserStorageService } from './services/storage/user-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // if (authService.isAuth == false) {
    //     router.navigate(['/login']);
    //     return false;
    // }

    if(UserStorageService.getToken()){
        return true;
    }else{
        router.navigate(['login']);
        return false;
    }

    return authService.isAuth;
};