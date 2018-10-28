import { Component , OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'synoriq-date-time-picker';
   public date = moment();
  public daysArr;

  constructor() {
   
  }
  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }
  //To show the dates in the table using moment
  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });
    for(let n=0;n<firstDay.weekday();n++)
    {
    	days.unshift(null);
    }
    return days;
  }
  //Current date in red colour
  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }
}
