import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

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
  selector: 'app-create-account-page',
  standalone: true,
  imports: [
    ...PRIMENG
  ],
  templateUrl: './create-account-page.component.html',
  styles: ``
})
export default class CreateAccountPageComponent {

}
