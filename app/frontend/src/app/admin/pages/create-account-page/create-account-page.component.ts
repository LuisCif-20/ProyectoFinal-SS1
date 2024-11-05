import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { ActivatedRoute } from '@angular/router';
import { AccountCreate, AccountType } from '../../../shared/interfaces/account.interface';
import { User } from '../../../auth/interfaces/auth.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';
import { ToastService } from '../../../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

const PRIMENG = [
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
  InputGroupModule,
  InputSwitchModule,
  RadioButtonModule,
  SelectButtonModule,
  InputNumberModule,
  InputGroupAddonModule
];

@Component({
  selector: 'app-create-account-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './create-account-page.component.html',
  styles: ``
})
export default class CreateAccountPageComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  private toastService = inject(ToastService);

  public accountTypes: AccountType[] = [];
  public user?: User;

  public emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]]
  });

  public accountForm: FormGroup = this.formBuilder.group({
    funds: [0, [Validators.required, Validators.min(0)]],
    account_type_id: ['', [Validators.required]],
    notifyme: [false, [Validators.required]]
  });

  constructor() { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountTypes }) => {
      this.accountTypes = accountTypes;
    });
  }

  toogleValue(): void {
    const currentValue = this.emailForm.get('notifyme')?.value;
    this.accountForm.get('notifyme')?.setValue(!currentValue);
  }

  searchUser(): void {
    if (this.emailForm.valid) {
      const email: string = this.emailForm.get('email')?.value;
      this.accountService.getUser(email).subscribe({
        next: (user) => this.user = user,
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.toastService.showError('El usuario no existe.');
          } else {
            this.toastService.showError('Ya tienes una cuenta');
          }
        }
      });
    } else {
      this.toastService.showError('El email es necesario');
    }
  }

  onCreateAccount(): void {
    if (this.accountForm.valid) {
      const { funds, notifyme, account_type_id } = this.accountForm.value;
      const user_id: string = this.user!.id;
      const data: AccountCreate = { user_id, funds, notifyme, account_type_id };
      this.accountService.createAccount(data).subscribe({
        next: () => {
          this.toastService.showSuccess('Cuenta creada correctamente');
          this.emailForm.reset();
          this.accountForm.reset();
          this.user = undefined;
        },
        error: () => this.toastService.showError('Fondos insuficientes.')
      });
    } else {
      this.toastService.showError('Formulario mal llenado')
    }
  }

}
