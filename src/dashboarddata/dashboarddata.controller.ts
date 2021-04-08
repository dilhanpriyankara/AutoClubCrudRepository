import { Controller,Get,Delete,Param } from '@nestjs/common';
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

  @Delete(':id')
  async deletedata(@Param('id') id: number):Promise<any>{
    var data=await this.dashboarddataService.deletegraphqlrecord(id);
    return data;
  }
  
  
}
