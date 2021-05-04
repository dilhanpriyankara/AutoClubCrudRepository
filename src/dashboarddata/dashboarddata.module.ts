import { Module } from '@nestjs/common';
import { DashboarddataResolver } from './dashboarddata.resolver';
import { DashboarddataService } from './dashboarddata.service';

@Module({
  providers: [DashboarddataResolver,DashboarddataService]
})
export class DashboarddataModule {}
