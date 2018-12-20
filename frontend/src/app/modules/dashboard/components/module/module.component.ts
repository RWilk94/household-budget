import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModuleService} from "../../services/module.service";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {Subject} from "rxjs";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {SpendingService} from "../../services/spending.service";
import {CookieService} from "ngx-cookie-service";
import {Spend} from "../../models/spend";
import {Toast, ToasterService} from "angular2-toaster";
import {ToastBuilder} from "../../../shared/utils/toast-builder";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {MatDialog} from "@angular/material";
import {AddSpendComponent} from "../add-spend/add-spend.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationExtras, Router} from "@angular/router";

let colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  green: {
    primary: '#008000',
    secondary: '#008000'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  private spending: Spend[] = [];
  events: CalendarEvent[] = [];


  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private spendingService: SpendingService,
              private cookieService: CookieService,
              private modal: NgbModal,
              private moduleService: ModuleService,
              private router: Router) {
  }

  ngOnInit() {
    this.spendingService.getSpending(this.cookieService.get('username')).subscribe(spending => {
      this.spending = spending;
      this.convertSpendingIntoCalendarEvents(spending);
    }, error => console.log(error));

  }

  private convertSpendingIntoCalendarEvents(spending: Spend[]) {
    this.events = [];
    spending.forEach(spend => {
      let event: CalendarEvent = {
        start: new Date(spend.date),
        end: new Date(spend.date),
        title: spend.name, // + ' <b>' + spend.value + '</b>',
        color: colors.red,
        allDay: true,
        actions: this.actions,
        id: spend.id
      };
      this.events.push(event);
    });
  }


  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
        // const dialogRef = this.dialog.open(AddSpendComponent, {
        //   width: '250px'
        // });
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        //this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('Deleted', event);
      }
    }
  ];

  addEvent(): void {
    this.moduleService.spend = new Spend();
    this.modal.open(this.modalContent, {size: 'lg', centered: true});
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    console.log('dayClicked');
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleSpend = new Subject<Spend>();

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handleEvent');
    let spend = this.spending.filter(spend => spend.id === event.id)[0];
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "spend" : JSON.stringify(spend)
    //   },
    //   skipLocationChange: false
    //   // skipLocationChange: true
    // };

    this.spendingService.spend =  spend;

    // let route = this.router.config.find(r => r.path === '/dashboard/onSubmit-spend');
    // route.data = {entity: }
    this.router.navigate(['/dashboard/onSubmit-spend/' + spend.id]);
  }

  editItem(item: any) {
    console.log('item');
    console.log(JSON.stringify(item));
  }
}
