import { FormsModule } from '@angular/forms';
import { WeatherTableComponent } from './component/weather-table/weather-table.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from './home.service';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  switchMap,
} from 'rxjs';
import { REST } from '../rest/rest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherTableComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    protected readonly homeService: HomeService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  isDaily = true;
  search: string = '';
  error: string = '';
  empty: boolean = false;

  /* -------------------------------------------------------------------------- */

  search$?: Subscription;

  ngOnInit(): void {
    this.addParam('daily');
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(
        () =>
          (this.search$ = this.homeService
            .searchCity({
              city: this.search,
            })
            .subscribe({
              next: (res) => {
                !res.length ? (this.empty = true) : (this.empty = false);
                this.error = '';
                this.cd.detectChanges();
              },
              error: (err) => {
                this.error = err.message;
              },
            }))
      );
  }

  addParam(exclude: string) {
    this.router.navigate([''], {
      queryParams: { city: this.search, exclude },
    });
  }

  changExclude(exclude: string) {
    this.homeService.changeExclude(exclude);
    this.addParam(exclude);
    this.isDaily = exclude === 'daily' ? true : false;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.search$?.unsubscribe();
  }
}
