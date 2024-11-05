import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { MakeUser } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

const PRIMENG = [
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
  InputGroupModule,
  RadioButtonModule,
  SelectButtonModule,
  InputGroupAddonModule
];

@Component({
  selector: 'admin-add-user-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './add-user-page.component.html',
  styles: ``
})
export default class AddUserPageComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  public genders: { label: string; value: string }[] = [
    {
      label: 'Femenino',
      value: 'female'
    },
    {
      label: 'Masculino',
      value: 'male'
    },
    {
      label: 'Otro',
      value: 'other'
    }
  ];

  public types: { label: string; value: string }[] = [
    {
      label: 'Administrador',
      value: 'admin'
    },
    {
      label: 'Cliente',
      value: 'client'
    }
  ];

  public userForm: FormGroup = this.formBuilder.group({
    user_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    pin: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    type: ['', [Validators.required]],
    birthdate: ['', [Validators.required]]
  });

  private makeBody(): MakeUser {
    return this.userForm.value;
  }

  public onCreate(): void {
    if (this.userForm.invalid) {
      this.toastService.showError('Campos invalidos.');
    } else {
      this.authService.createUser(this.makeBody()).subscribe({
        next: () => {
          this.toastService.showSuccess('Usuario creado correctamente');
          this.userForm.reset();
        },
        error: () => this.toastService.showError('Algo salio mal')
      });
    }
  }

}
