import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExporttocsvController } from './exporttocsv.controller';
import { ExporttocsvService } from './exporttocsv.service';

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
  providers: [ExporttocsvService]
})
export class ExporttocsvModule {}
