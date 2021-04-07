import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import {BullModule} from '@nestjs/bull';

@Module({
  imports:[
     BullModule.forRoot({
       redis:{
         host:'localhost',
         port:6379,
       },
     }),
     BullModule.registerQueue({
       name:'csv'
     
     }), 
  ],
  providers: [CrudService]
})
export class CrudModule {}
