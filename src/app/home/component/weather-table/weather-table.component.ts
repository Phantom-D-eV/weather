import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from '../../home.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTableComponent {
  constructor(
    protected route: ActivatedRoute,
    protected readonly homeService: HomeService
  ) {}

  getHourly$ = this.homeService.getHourly();
  getDaily$ = this.homeService.getDaily();
}
