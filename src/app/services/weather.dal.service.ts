import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST } from '../rest/rest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherDalService {
  constructor(private readonly http: HttpClient) {}

  // строго говоря я бы получал ключ с сервера и хранил их env но у меня нет сервера :(
  appid = '010721642521f31b0fbc8c3831d45951';

  searchCity(
    query: REST.weather.geocoding.Q
  ): Observable<REST.weather.geocoding.R> {
    return this.http.get<REST.weather.geocoding.R>(
      'http://api.openweathermap.org/geo/1.0/direct',
      {
        params: new HttpParams().appendAll({
          q: query.city,
          appid: this.appid,
        }),
      }
    );
  }

  getHourly() {}
  getDaily() {}
}
