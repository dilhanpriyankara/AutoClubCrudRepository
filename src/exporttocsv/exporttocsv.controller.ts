import { Controller,Get, Param } from '@nestjs/common';
import { ExporttocsvService } from './exporttocsv.service';

@Controller('exporttocsv')
export class ExporttocsvController {
    constructor(private exporttocsvService:ExporttocsvService){}
    
    @Get(':ageofcar')
    async exportDatatoCSV(@Param('ageofcar') ageofcar: number): Promise<any> {
        console.log("export started "+ageofcar);

        var data=await this.exporttocsvService.exportDatatoCSV(ageofcar);
        //console.log(data);
        return data;
    }
    


}
