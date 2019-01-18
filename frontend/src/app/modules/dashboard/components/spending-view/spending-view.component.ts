import {Component, Input, OnInit} from '@angular/core';
import {SpendingService} from "../../services/spending.service";
import {CookieService} from "ngx-cookie-service";
import {Spend} from "../../models/spend";

@Component({
  selector: 'app-spending-view',
  templateUrl: './spending-view.component.html',
  styleUrls: ['./spending-view.component.css']
})
export class SpendingViewComponent implements OnInit {

  @Input()
  categoryId: number;

  spending: Spend[];

  constructor(private spendingService: SpendingService, private cookie: CookieService) { }

  ngOnInit() {
    this.spendingService.getSpending(this.cookie.get("username")).subscribe(data => {
      this.spending = data;
    }, error => console.log(error));
  }

}
