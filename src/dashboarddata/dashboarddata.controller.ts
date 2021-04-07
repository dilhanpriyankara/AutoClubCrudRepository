import { Controller,Get } from '@nestjs/common';
import { DashboarddataService } from "./dashboarddata.service";
@Controller('dashboarddata')
export class DashboarddataController {
    constructor(private dashboarddataService:DashboarddataService){}

  @Get()
   async findAllData(): Promise<any> {
    var data=await this.dashboarddataService.findAllData();
    //console.log(data);
    return data;
  }

}
