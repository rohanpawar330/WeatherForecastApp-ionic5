import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private forecastData: any;
  private errMsg: any;
  private countryList: any;
  private selectedCountry: string;
  private stateList: any;
  private selectedState: string;
  private cityList: any;
  private selectedCity: string;

  constructor(private http: HttpClient) {
    this.getCountry();
  }



  getCountry() {
    let urlCountryList = 'https://api.airvisual.com/v2/countries?';
    this.callForecastApi(urlCountryList).subscribe((data) => {
      if (data) {
        this.countryList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  selectCountry() {
    console.log(this.selectedCountry)
    let urlStateList = `https://api.airvisual.com/v2/states?country=${this.selectedCountry}`;
    this.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.stateList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  selectState() {
    console.log(this.selectedState)
    let urlStateList = `https://api.airvisual.com/v2/cities?state=${this.selectedState}&country=${this.selectedCountry}`;
    this.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.cityList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  getforecastData() {
    let urlCityWeather = `https://api.airvisual.com/v2/city?city=${this.selectedCity}&state=${this.selectedState}&country=${this.selectedCountry}`;
    this.callForecastApi(urlCityWeather).subscribe((data) => {
      if (data) {
        this.forecastData = data.data
        console.log(this.forecastData)
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  callForecastApi(url): Observable<any> {
    return this.http.get(`${url}&key=83d60b33-fc09-4fbd-a5ab-1d4cd7e2e76b`)
      .pipe(catchError(res => this.handleError(res)))
  }

  handleError(error: Response | any) {
    let errorFromServer = error.error.data.message;
    return throwError(errorFromServer);
  }
}

