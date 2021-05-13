import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AutoclubData } from 'src/datamodels/autoclubdata';
import { ExporttocsvService } from './exporttocsv.service';

@Resolver(of => AutoclubData)
export class ExporttocsvResolver {

    constructor(private  exporttocsvService:ExporttocsvService){
        
    }

    @Query(returns => [AutoclubData])
    async exportDatatoCSV(@Args({ name: 'ageofcar', type: () => Int }) ageofcar: number) {       
        var data=await this.exporttocsvService.exportDatatoCSV(ageofcar);  
        console.log(data);       
        return data;        
    }
    
}
