import { Injectable } from '@nestjs/common';
import * as http from 'http';

import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ExporttocsvService {

    constructor (@InjectQueue('csvexporter') private csvQue:Queue){} 

    async exportDatatoCSV(ageofcar: number):Promise<any>{
        
        
      return new Promise(resolve => {
        

        const query=  this.getCsvExportquery(ageofcar);        
        let returndata = '';   

        const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/graphql',
        method: 'POST',
        headers: {
            'Content-Type': 'application/graphql',
            'Content-Length': query.length
        }
        }
        
        const  req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {                             
                returndata += d;
            });
            res.on('end', () => {
              //console.log(JSON.parse(returndata).data.allAutoclubdata.nodes);
              let arr= JSON.parse(returndata).data.allAutoclubdata.nodes;
              var filteredArray =arr.filter(vehicleage=>vehicleage.ageOfVehicle>ageofcar);
              this.csvQue.add(filteredArray)
              resolve("Successfully added to queue"); 
            });
        })
    
        req.on('error', error => {
            console.error(error)               
        })
        
        req.write(query)        
        req.end();       
            
    
    });

    }

    getCsvExportquery(ageofcar: number){
        const query=`{
            allAutoclubdata {
              nodes {
                id
                firstName
                lastName                
                email
                carModel
                carMake
                ageOfVehicle
                manufacturedDate     
              }
            }
          }
        `
        return query;
    }

}
