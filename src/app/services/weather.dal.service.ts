import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REST } from '../rest/rest';
import { Observable } from 'rxjs';
import { cachedRequest } from '../classes/cache/cache-decorator';
import { CacheService } from '../classes/cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherDalService {
  constructor(
    private readonly http: HttpClient,
    private readonly cache: CacheService
  ) {}

  // строго говоря я бы получал ключ с сервера и хранил их env но у меня нет сервера :(
  appid = '010721642521f31b0fbc8c3831d45951';
  apiLink = 'https://api.openweathermap.org/';

  searchCity(
    query: REST.weather.geocoding.Q
  ): Observable<REST.weather.geocoding.R> {
    return this.http.get<REST.weather.geocoding.R>(
      this.apiLink + 'geo/1.0/direct',
      {
        params: new HttpParams().appendAll({
          q: query.city,
          limit: 1,
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
    params = params.append('appid', this.appid);
    return this.http.get<REST.weather.getWeather.R>(
      this.apiLink + 'data/2.5/onecall',
      {
        params,
      }
    );
  }

  @cachedRequest(function () {
    return this.cache;
  })
  getHourly(
    query: REST.weather.getHourly.Q
  ): Observable<REST.weather.getHourly.R> {
    return this.getWeather({ ...query, exclude: 'daily' });
  }

  @cachedRequest(function () {
    return this.cache;
  })
  getDaily(
    query: REST.weather.getDaily.Q
  ): Observable<REST.weather.getDaily.R> {
    return this.getWeather({ ...query, exclude: 'hourly' });
  }
}
