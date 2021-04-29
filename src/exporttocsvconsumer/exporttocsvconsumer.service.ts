import {OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import * as fs from 'fs';
import { from } from 'rxjs';
import * as converter from 'json-2-csv';
import { Gateway } from '../websocket/gateway';

@Processor('csvexporter')
export class ExporttocsvconsumerService {

    constructor(private gateway: Gateway){}

   @Process()
    async transcode(job: Job<unknown>) {
        let progress = 0;       
        var obj = JSON.parse(JSON.stringify(job.data));
        
        try {
            converter.json2csvAsync(obj).then(csv=>{
                console.log(csv);
                fs.writeFileSync('C:/Users/damarasena/Documents/csv/autoclub.csv', csv);        
            }).catch(err=>console.log(err));
        } catch (error) {
            console.log(error);
        }     
        
       
        
       
        return {};
    }

    @OnQueueCompleted()
    onActive(job: Job) {
        this.gateway.emitfrontendData();
        console.log(`Processing job ${job.id} is completed...`);
    }

   
}


