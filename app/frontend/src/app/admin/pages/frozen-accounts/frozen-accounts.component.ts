import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../shared/interfaces/account.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frozen-accounts',
  standalone: true,
  imports: [

    CommonModule
  ],
  templateUrl: './frozen-accounts.component.html',
  styles: ``
})
export default class FrozenAccountsComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  public frozen: Account[] = [];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ frozen }) => {
      this.frozen = frozen;
      console.log(this.frozen)
    })
  }

}
