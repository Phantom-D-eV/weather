import { Injectable } from '@angular/core';
import { WeatherDalService } from '../services/weather.dal.service';
import { REST } from '../rest/rest';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly weatherDalService: WeatherDalService) {}

  private readonly exclude$ = new BehaviorSubject<string>('daily');

  public hourly$ = new Subject<
    Array<{ name: string; hourly: REST.weather.getHourly.R }>
  >();
  public daily$ = new Subject<
    Array<{ name: string; daily: REST.weather.getDaily.R }>
  >();
  /* -------------------------------------------------------------------------- */

  private findCity?: REST.weather.geocoding.R;
  private hourlyTable: Array<{
    name: string;
    hourly: REST.weather.getHourly.R;
  }> = [];
  private dailyTable: Array<{ name: string; daily: REST.weather.getDaily.R }> =
    [];

  /* -------------------------------------------------------------------------- */

  searchCity(
    query: REST.weather.geocoding.Q
  ): Observable<REST.weather.geocoding.R> {
    return this.weatherDalService.searchCity(query).pipe(
      tap((res: REST.weather.geocoding.R) => {
        this.findCity = res;
        this.exclude$.next(this.exclude$.value);
      })
    );
  }

  changeExclude(exclude: string) {
    this.exclude$.next(exclude);
  }

  getHourly(): Observable<REST.weather.getHourly.R> {
    return this.exclude$.pipe(
      startWith(),
      filter(() => !!this.findCity?.length),

      switchMap(() =>
        this.weatherDalService
          .getHourly({
            lat: this.findCity?.length ? this.findCity[0].lat : 0,
            lon: this.findCity?.length ? this.findCity[0].lon : 0,
          })
          .pipe(
            tap((res) => {
              this.hourlyTable.push({
                name: this.findCity?.length ? this.findCity[0].name : '',
                hourly: res,
              });
              this.hourlyTable = this.hourlyTable.filter(
                (v, i, a) =>
                  a.findIndex(
                    (t) => JSON.stringify(t) === JSON.stringify(v)
                  ) === i
              );
              this.hourly$.next(this.hourlyTable);
            })
          )
      )
    );
  }

  getDaily(): Observable<REST.weather.getDaily.R> {
    return this.exclude$.pipe(
      startWith(),
      filter(() => !!this.findCity?.length),
      switchMap(() =>
        this.weatherDalService
          .getDaily({
            lat: this.findCity?.length ? this.findCity[0].lat : 0,
            lon: this.findCity?.length ? this.findCity[0].lon : 0,
          })
          .pipe(
            tap((res) => {
              this.dailyTable.push({
                name: this.findCity?.length ? this.findCity[0].name : '',
                daily: res,
              });
              this.dailyTable = this.dailyTable.filter(
                (v, i, a) =>
                  a.findIndex(
                    (t) => JSON.stringify(t) === JSON.stringify(v)
                  ) === i
              );
              this.daily$.next(this.dailyTable);
            })
          )
      )
    );
  }
}
