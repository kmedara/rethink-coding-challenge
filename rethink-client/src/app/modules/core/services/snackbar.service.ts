import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
    private defaultConfig: MatSnackBarConfig = {
        duration: 3500
    };

    constructor(public snackbar: MatSnackBar) { }

    private mergeConfigWithDefault(config: MatSnackBarConfig): MatSnackBarConfig {
        return Object.assign({}, this.defaultConfig, config || {});
    }

    openComponent<T, M = any>(componentRef: ComponentType<T>, model: M, config: MatSnackBarConfig<M>): MatSnackBarRef<T> {
        config = this.mergeConfigWithDefault(config);

        if (model) {
            config.data = model;
        }

        return this.snackbar.openFromComponent(componentRef, config);
    }

    open(msg: string): MatSnackBarRef<SimpleSnackBar> {
        const config = this.mergeConfigWithDefault({ });
        return this.snackbar.open(msg, undefined, config);
    }

    success(msg: string): MatSnackBarRef<SimpleSnackBar> {
        const config = this.mergeConfigWithDefault({
            panelClass: ['success']
        });
        return this.snackbar.open(msg, undefined, config);
    }

    error(msg: string): MatSnackBarRef<SimpleSnackBar> {
        console.log("ERROR", msg)
        const config = this.mergeConfigWithDefault({
            panelClass: ['error']
        });
        return this.snackbar.open(msg, undefined, config);
    }
}
