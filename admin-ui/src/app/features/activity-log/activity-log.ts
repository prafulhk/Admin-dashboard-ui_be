import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivityService } from '../../core/services/activity-service';

@Component({
  selector: 'app-activity-log',
  imports: [],
  templateUrl: './activity-log.html',
  styleUrl: './activity-log.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityLog {
  activities: any[] = [];

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe((res) => {
      this.activities = res;
      this.cdr.markForCheck();
      console.log(this.activities);
    });
  }
}
