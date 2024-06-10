import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTableComponent {}
