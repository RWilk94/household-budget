import {Component, OnInit} from '@angular/core';
import {ModuleService} from '../../services/module.service';
import {CalendarEvent, CalendarEventAction, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
import {SpendingService} from '../../services/spending.service';
import {CookieService} from 'ngx-cookie-service';
import {Spend} from '../../models/spend';
import {Toast, ToasterService} from 'angular2-toaster';
import {ToastBuilder} from '../../../shared/utils/toast-builder';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Module} from '../../models/module';
import {NavigationMenuService} from '../../../shared/services/navigation-menu.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  green: {
    primary: '#008000',
    secondary: '#BEFECF'
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

const ACTION_EDIT = 'Edit';
const ACTION_DELETE = 'Delete';

@Component({
  selector: 'app-module',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  private spending: Spend[] = [];
  private modules: Module[] = [];
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();
  activeDayIsOpen = false;
  locale: string = 'pl';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent(ACTION_EDIT, event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent(ACTION_DELETE, event);
      }
    }
  ];

  constructor(private spendingService: SpendingService,
              private cookieService: CookieService,
              private modal: NgbModal,
              private moduleService: ModuleService,
              private router: Router,
              private toasterService: ToasterService,
              private navigationMenu: NavigationMenuService) {
    navigationMenu.activeMenuItem('Calendar');
  }

  ngOnInit() {
    if (this.spendingService.calendarDate !== undefined && this.spendingService.calendarDate !== null) {
      this.viewDate = new Date(
        this.spendingService.calendarDate.year,
        this.spendingService.calendarDate.month - 1,
        this.spendingService.calendarDate.day);
    }

    this.spendingService.getSpending(this.cookieService.get('username')).subscribe(spending => {
      this.spending = spending;
      this.convertSpendingIntoCalendarEvents(spending);
    }, error => console.log(error));

    this.moduleService.getModules().subscribe(modules => {
      this.modules = modules;
    }, error => console.log(error));
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0);
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    switch (action) {
      case ACTION_EDIT: {
        const selectedSpend = this.spending.filter(spend => spend.id === event.id)[0];
        this.router.navigate(['/dashboard/add-spend/' + selectedSpend.id]);
        break;
      }
      case ACTION_DELETE: {
        const spendToDelete = this.spending.filter(spend => spend.id === event.id)[0];
        this.spendingService.deleteSpend(spendToDelete).subscribe(data => {
          this.displayToast(ToastBuilder.successDeleteItem());
          this.spending = this.spending.filter(spend => spend.id !== spendToDelete.id);
          this.convertSpendingIntoCalendarEvents(this.spending);
        }, error => {
          console.log(error);
          this.displayToast(ToastBuilder.errorWhileDeletingItem());
        });
      }
    }
  }

  addEvent(date: Date): void {
    console.log(date);
    this.spendingService.calendarDate = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    this.router.navigate(['/dashboard/add-spend/']);
  }

  private convertSpendingIntoCalendarEvents(spending: Spend[]) {
    this.events = [];
    spending.forEach(spend => {
      const event: CalendarEvent = {
        start: new Date(spend.date),
        end: new Date(spend.date),
        title: spend.name,
        color: this.getColor(spend.category.module),
        allDay: true,
        actions: this.actions,
        id: spend.id
      };
      this.events.push(event);
    });
  }

  private getColor(module: Module) {
    module = this.modules.filter(data => module.id === data.id)[0];
    switch (this.modules.indexOf(module)) {
      case 0:
        return colors.green;
      case 1:
        return colors.yellow;
    }
  }

  private displayToast(toast: Toast): void {
    this.toasterService.pop(toast);
  }
}
