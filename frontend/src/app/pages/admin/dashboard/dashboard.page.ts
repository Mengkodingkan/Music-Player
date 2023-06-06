import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../services/api-admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data: any;

  constructor(
    private apiAdmin: ApiAdminService
  ) {
  }

  ngOnInit() {
    this.apiAdmin.fetchDataDashboard();
    this.apiAdmin.data.subscribe(data => this.data = data)
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.apiAdmin.fetchDataDashboard();
      this.apiAdmin.data.subscribe(data => this.data = data);
      event.target.complete();
    }, 1000);
  }

}
