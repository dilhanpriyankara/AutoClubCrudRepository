import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Gateway } from '../websocket/gateway';
import { ExporttocsvconsumerService } from './exporttocsvconsumer.service';

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
  providers: [ExporttocsvconsumerService,Gateway]
})
export class ExporttocsvconsumerModule {}
