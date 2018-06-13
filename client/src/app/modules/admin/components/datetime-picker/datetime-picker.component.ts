import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  navDate: moment.Moment;
  weekDaysHeader: string[];
  grid: any[];
  @Input()
  selectedDate: moment.Moment;
  selectedHour: string;
  selectedMinutes: string;

  constructor() { }

  ngOnInit() {
    moment.locale('pl');
    this.navDate = moment();

    // date-picker
    this.makeHeader();
    this.makeGrid();

    // time-picker
    this.updateTimePicker();
  }

  changeNavMonth(num, datePart: string): void {
    this.navDate.add(num, 'month');
    this.makeGrid();
  }

  makeHeader() {
    const weekDays = [0, 1, 2, 3, 4, 5, 6];
    this.weekDaysHeader = [];
    weekDays.forEach(day => {
      this.weekDaysHeader.push(moment().weekday(day).format('ddd'));
    });
  }

  makeGrid() {
    this.grid = [];

    const firstDayDate = moment(this.navDate).startOf('month');
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.navDate).endOf('month');
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.navDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    for (let i = 0; i < arrayLength; i++) {
      const obj: any = {};

      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
        obj.available = false;
      } else {
        obj.value = i - initialEmptyCells + 1;
        obj.available = true;
      }

      this.grid.push(obj);
    }
  }

  selectDay(day: any) {
    this.navDate.hours(this.selectedDate.hours());
    this.navDate.minutes(this.selectedDate.minutes());
    this.selectedDate.set(this.dateFromNum(day.value, this.navDate).toObject());
  }

  dateFromNum(num: number, referenceDate: any): moment.Moment {
    const returnDate = moment(referenceDate);

    return returnDate.date(num);
  }

  updateTimePicker(): void {
    this.selectedHour = this.selectedDate.format('HH');
    this.selectedMinutes = this.selectedDate.format('mm');
  }

  changeMinute(num: any): void {
    this.selectedDate.add(num, 'minute');
    this.updateTimePicker();
  }

  changeHour(num: any): void {
    this.selectedDate.add(num, 'hour');
    this.updateTimePicker();
  }
}
