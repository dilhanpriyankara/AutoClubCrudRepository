import { Injectable } from '@nestjs/common';
import * as http from 'http';
import { rejects } from 'node:assert';
@Injectable()
export class DashboarddataService {

    async  findAllData():Promise<any>{
        
        return new Promise(resolve => {
            setTimeout(() => {

            const query=  this.getquery();        
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
                    //process.stdout.write(d)                    
                    returndata += d;
                });
                res.on('end', () => {
                   // console.log(returndata);
                   resolve(returndata); 
                });
            })
        
            req.on('error', error => {
                console.error(error)               
            })
            
            req.write(query)        
            req.end(); 

           
                
        }, 100);
    });

      
       
    }


    getquery(){
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

