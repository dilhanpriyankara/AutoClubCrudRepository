import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { Socketclusterappgateway } from './socketclusterappgateway';


@Module({
    providers:[Gateway,Socketclusterappgateway]
})
export class WebsocketModule {}
