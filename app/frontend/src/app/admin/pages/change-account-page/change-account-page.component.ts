import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { User } from '../../../auth/interfaces/auth.interface';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from '../../../shared/interfaces/account.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountService } from '../../../shared/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

const PRIMENG = [
  ButtonModule,
  DropdownModule,
  InputTextModule,
  InputGroupModule,
  InputSwitchModule,
  InputGroupAddonModule
];

@Component({
  selector: 'admin-change-account-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './change-account-page.component.html',
  styles: ``
})
export default class ChangeAccountPageComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);
  private activatedRoute = inject(ActivatedRoute);

  public accountTypes: AccountType[] = [];
  public user?: User;
  public emailControl: FormControl = this.formBuilder.control('', [Validators.required]);
  public accountForm: FormGroup = this.formBuilder.group({
    notifyme: [false, [Validators.required]],
    account_type_id: ['', [Validators.required]]
  });

  constructor() { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({accountTypes}) => {
      this.accountTypes = accountTypes;
    });
  }

  public searchUser(): void {
    if (this.emailControl.valid) {
      this.authService.getUserByEmail(this.emailControl.value).subscribe({
        next: (user) => {
          this.user = user;
          this.emailControl.disable();
        },
        error: () => this.toastService.showError('Usuario no encontrado.')
      });
    } else {
      this.toastService.showError('Es necesario el email.');
    }
  }

  public onCancel(): void {
    this.user = undefined;
    this.emailControl.reset();
    this.emailControl.enable();
    this.accountForm.reset();
  }

  public changeAccount(): void {
    if (this.accountForm.valid) {
      const { notifyme, account_type_id } = this.accountForm.value;
      const user_id: string = this.user!.id;
      this.accountService.changeAccount(user_id, account_type_id, notifyme).subscribe({
        next: () => {
          this.user = undefined;
          this.emailControl.reset();
          this.emailControl.enable();
          this.toastService.showSuccess('Cambio realizado con exito.');
        },
        error: () => this.toastService.showError('Fondos insuficientes o cuenta actual clausurada')
      });
    } else {
      this.toastService.showError('Campos invalidos.')
    }
  }

}
