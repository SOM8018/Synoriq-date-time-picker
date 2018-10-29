import { Component , OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToasterServiceService } from './toaster-service.service'
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
  public dateForm: FormGroup;
  public isReserved = null;

  constructor(private fb: FormBuilder,private atp:AmazingTimePickerService, private toasterService:ToasterServiceService) {
   this.initDateForm();
  }
  public initDateForm(){
  	return this.dateForm = this.fb.group({
  		dateFrom: [null,Validators.required]
  	})
  }
  //init
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
  //Function for nextMonth() right arrow '>'
  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }
  //Function for previousMonth() Left arrow '<'
  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }
  //Select the day
  public selectedDate(day) {
    let dayFormatted = day.format('DD/MM/YYYY');
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
      this.toasterService.Success("Succesfully Added Date "+ dayFormatted);
    } else {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
      this.toasterService.Success("Succesfully Added Date "+ dayFormatted);
    }
  }
  //timepicker from amazing time picker service 
  public open()
  {
  	const picker = this.atp.open();
  	picker.afterClose().subscribe(time =>{
  		
  		this.toasterService.Success("Succesfully Added time"+ picker);
  	})
  }
  public save(){
  	this.toasterService.Success("Succesfully Added Date and Time");
  }
}
