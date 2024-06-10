export namespace weather {
  export interface hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    pop: number;
  }

  /* -------------------------------------------------------------------------- */

  export interface daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: number;
    pop: number;
    rain: number;
    uvi: number;
  }

  /* -------------------------------------------------------------------------- */

  export namespace geocoding {
    export interface P {}

    export interface Q {
      readonly city: string;
    }

    export interface B {}

    export interface R
      extends ReadonlyArray<{
        name: string;
        // не уверен на счет типизации локальных имен
        local_names: {
          [key: string]: string;
        };
        lat: number;
        lon: number;
        country: string;
        state: string;
      }> {}
  }

  /* -------------------------------------------------------------------------- */
  export namespace getDaily {
    export interface P {}

    export interface Q {
      readonly lat: number;
      readonly lon: number;
      readonly units?: string;
      readonly lang?: string;
    }

    export interface B {}

    export interface R {
      lat: number;
      lon: number;
      timezone: string;
      timezone_offset: number;
      current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: [
          {
            id: number;
            main: string;
            description: string;
            icon: string;
          }
        ];
      };
      minutely: [
        {
          dt: number;
          precipitation: number;
        }
      ];

      daily: ReadonlyArray<daily>;

      alerts: [
        {
          sender_name: string;
          event: string;
          start: number;
          end: number;
          description: string;
          tags: Array<string>;
        }
      ];
    }
  }

  /* -------------------------------------------------------------------------- */
  export namespace getHourly {
    export interface P {}

    export interface Q {
      readonly lat: number;
      readonly lon: number;
      readonly units?: string;
      readonly lang?: string;
    }

    export interface B {}

    export interface R {
      lat: number;
      lon: number;
      timezone: string;
      timezone_offset: number;
      current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: [
          {
            id: number;
            main: string;
            description: string;
            icon: string;
          }
        ];
      };
      minutely: [
        {
          dt: number;
          precipitation: number;
        }
      ];

      hourly: ReadonlyArray<hourly>;

      alerts: [
        {
          sender_name: string;
          event: string;
          start: number;
          end: number;
          description: string;
          tags: Array<string>;
        }
      ];
    }
  }

  /* -------------------------------------------------------------------------- */
  export namespace getWeather {
    export interface P {}

    export interface Q {
      readonly lat: number;
      readonly lon: number;
      readonly exclude?: string;
      readonly units?: string;
      readonly lang?: string;
    }

    export interface B {}

    export interface R {
      lat: number;
      lon: number;
      timezone: string;
      timezone_offset: number;
      current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: [
          {
            id: number;
            main: string;
            description: string;
            icon: string;
          }
        ];
      };
      minutely: [
        {
          dt: number;
          precipitation: number;
        }
      ];

      hourly: ReadonlyArray<hourly>;
      daily: ReadonlyArray<daily>;

      alerts: [
        {
          sender_name: string;
          event: string;
          start: number;
          end: number;
          description: string;
          tags: Array<string>;
        }
      ];
    }
  }

  /* -------------------------------------------------------------------------- */
}
