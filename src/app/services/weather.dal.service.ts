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

  getWeather(
    query: REST.weather.getWeather.Q
  ): Observable<REST.weather.getWeather.R> {
    let params = new HttpParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== '' && v !== undefined && v !== null) {
        params = params.append(k, v);
      }
    }

    return this.http.get<REST.weather.getWeather.R>(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: new HttpParams().appendAll({
          ...params,
          appid: this.appid,
        }),
      }
    );
  }

  getHourly(
    query: REST.weather.getHourly.Q
  ): Observable<REST.weather.getHourly.R> {
    return this.getWeather({ ...query, exclude: 'hourly' });
  }

  getDaily(
    query: REST.weather.getDaily.Q
  ): Observable<REST.weather.getDaily.R> {
    return this.getWeather({ ...query, exclude: 'daily' });
  }
}
