import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloseAccount } from '../../../shared/interfaces/account.interface';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { AccountService } from '../../../shared/services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-closed-accounts',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './closed-accounts.component.html',
  styles: ``
})
export default class ClosedAccountsComponent {

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  public dateControl: FormControl = this.formBuilder.control('', [Validators.required]);

  public closeAccounts: CloseAccount[] = [];

  public searchAccounts(): void {
    if (this.dateControl.valid) {
      const [ startDate, endDate ] = this.dateControl.value;
      this.accountService.getCloseAccounts(startDate, endDate).subscribe({
        next: (accounts) => {
          this.closeAccounts = accounts;
        }
      });
    } else {
      this.toastService.showError('Ingresa un rango correcto');
    }
  }

}
