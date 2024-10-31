import { inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";
import { User } from "../../auth/interfaces/auth.interface";

export const authInitializer = (): () => Observable<User> => {
    const authService = inject(AuthService);
    return () => authService.checkStatus().pipe(
        switchMap(() => authService.getUserInfo())
    );
};