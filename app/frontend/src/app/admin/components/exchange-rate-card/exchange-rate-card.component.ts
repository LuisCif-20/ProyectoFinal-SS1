import { Component, inject, Input, OnInit } from '@angular/core';
import { ExchangeRate } from '../../../shared/interfaces/account.interface';


import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'admin-exchange-rate-card',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputNumberModule,
    InputGroupAddonModule,
    ReactiveFormsModule
  ],
  templateUrl: './exchange-rate-card.component.html',
  styles: ``
})
export class ExchangeRateCardComponent implements OnInit {

  @Input({ required: true }) public exchangeRate!: ExchangeRate;

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  public rateControl: FormControl = this.formBuilder.control('', [Validators.required, Validators.min(0.01)]);

  ngOnInit(): void {
    this.rateControl.patchValue(this.exchangeRate.rate);
  }

  public updateRate(): void {
    if (this.rateControl.valid) {
      this.accountService.updateExchangeRate(this.exchangeRate.id, this.rateControl.value).subscribe({
        next: () => this.toastService.showSuccess('Tasa de cambio actualizada'),
        error: () => this.toastService.showError('No existe esta moneda')
      });
    } else {
      this.toastService.showError('El valor no es valido.');
    }
  }

}
