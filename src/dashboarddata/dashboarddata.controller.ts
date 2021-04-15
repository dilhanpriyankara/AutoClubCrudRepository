import { Controller,Get,Delete,Param,Put,Body } from '@nestjs/common';
import { DashboarddataService } from "./dashboarddata.service";
import { UpdateDataDto } from './updateDataDto';
@Controller('dashboarddata')
export class DashboarddataController {
    constructor(private dashboarddataService:DashboarddataService){}

  @Get()
   async findAllData(): Promise<any> {
    var data=await this.dashboarddataService.findAllData();
    //console.log(data);
    return data;
  }

  @Get(':pagesize')
   async findPeginationData(@Param('pagesize') pagesize: number): Promise<any> {
    console.log(pagesize);
    var data=await this.dashboarddataService.findPaginationData(pagesize);
    console.log(data);
    return data;
  }

  @Delete(':id')
  async deletedata(@Param('id') id: number):Promise<any>{
    var data=await this.dashboarddataService.deletegraphqlrecord(id);
    return data;
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) :Promise<any>{
    console.log(updateDataDto.id+" "+updateDataDto.firstName);
    var data=await this.dashboarddataService.updategraphqlrecord(updateDataDto);
    return data;
  }
  
}
