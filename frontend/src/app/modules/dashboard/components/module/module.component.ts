import { Component, OnInit } from '@angular/core';
import {ModuleService} from "../../services/module.service";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {
  }

}
