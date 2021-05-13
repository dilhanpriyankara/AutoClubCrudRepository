import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExporttocsvController } from './exporttocsv.controller';
import { ExporttocsvService } from './exporttocsv.service';
import { ExporttocsvResolver } from './exporttocsv.resolver';

@Module({
  imports:[
    BullModule.forRoot({
      redis:{
        host:'localhost',
        port:6379,
      },
    }),
    BullModule.registerQueue({
      name:'csvexporter'
    
    }), 
 ],
  controllers: [ExporttocsvController],
  providers: [ExporttocsvService, ExporttocsvResolver]
})
export class ExporttocsvModule {}
