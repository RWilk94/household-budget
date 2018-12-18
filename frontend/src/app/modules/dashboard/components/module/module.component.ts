import { Component, OnInit } from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  viewDate: Date = new Date();

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
  }

}
