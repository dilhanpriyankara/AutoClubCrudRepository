import {OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import * as fs from 'fs';
import { from } from 'rxjs';

@Processor('csvexporter')
export class ExporttocsvconsumerService {


   @Process()
    async transcode(job: Job<unknown>) {
        let progress = 0;       
        var obj = JSON.parse(JSON.stringify(job.data));
        console.log(obj);
       
       
                
       
        return {};
    }

    @OnQueueCompleted()
    onActive(job: Job) {
        console.log(
        `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

   
}


