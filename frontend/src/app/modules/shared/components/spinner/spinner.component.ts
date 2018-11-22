import {Component, OnInit} from '@angular/core';
import {HTTPStatusService} from "../../services/spinner-interceptor";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  HTTPActivity: boolean;

  constructor(private httpStatus: HTTPStatusService) {
  }

  ngOnInit(): void {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.HTTPActivity = status;
    });
  }

}
