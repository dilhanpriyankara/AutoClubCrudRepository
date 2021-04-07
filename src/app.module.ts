import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './consumer/crud.module';
import { DashboarddataController } from './dashboarddata/dashboarddata.controller';
import { DashboarddataService } from './dashboarddata/dashboarddata.service';
import { DashboarddataModule } from './dashboarddata/dashboarddata.module';



@Module({
  imports: [CrudModule, DashboarddataModule,],
  controllers: [AppController, DashboarddataController,],
  providers: [AppService, DashboarddataService,],
})
export class AppModule {}
