import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { query } from 'express';
import { of } from 'rxjs';
import { AutoclubData } from 'src/datamodels/autoclubdata';
import { DashboarddataService } from './dashboarddata.service';
import { UpdatedataInputType } from './updatedataInputType';

@Resolver(of => AutoclubData)
export class DashboarddataResolver {

    constructor(private dashboarddataService:DashboarddataService){}

    @Query(returns => [AutoclubData])
    async findAllData() {
       
        var data=await this.dashboarddataService.findAllData();  
        //console.log(data);       
        return data;        
    }


    @Mutation(() => AutoclubData)
    async deletedata(@Args({ name: 'recordid', type: () => Int }) recordid: number): Promise<AutoclubData> {
      return this.dashboarddataService.deletegraphqlrecord(recordid);
    }


    @Mutation(() => AutoclubData)
    async updatedata(@Args('UpdatedataInputType') updatedataInputType: UpdatedataInputType): Promise<AutoclubData> {
      
       console.log(updatedataInputType);
       var data =await this.dashboarddataService.updategraphqlrecord(updatedataInputType);
       console.log(data);
       return data;
    }


    @Query(returns => [AutoclubData])
    async findPeginationData(@Args({ name: 'pagesize', type: () => Int }) pagesize: number) {       
        var data=await this.dashboarddataService.findPaginationData(pagesize);  
        console.log(data);       
        return data;        
    }

      

}
