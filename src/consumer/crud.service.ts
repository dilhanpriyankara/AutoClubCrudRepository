import { Injectable } from '@nestjs/common';
import { Processor ,Process} from '@nestjs/bull';
import { Job } from 'bull';
import * as http from 'http';

@Processor('csv')
export class CrudService {

    @Process()
    async transcode(job: Job<unknown>) {
        let progress = 0;       
        var obj = JSON.parse(JSON.stringify(job.data));
        var keys = Object.keys(obj);
        var arr=obj[keys[0]];
        //console.log(arr);
        for (var i = 0; i < arr.length; i++) {              
            //console.log(arr[i]);
            this.savetographql(arr[i]);
        }        
       
        return {};
    }


    async savetographql(objectdata: any){      
       
        //         let name=objectdata.first_name;
        //         let id=objectdata.id;
        //         let age=objectdata.age_of_vehicle;
        
        //         const query = `mutation createPost{
        //             createStudent(input:  {
        //                 student: {
        //                   name: "+${name}+",
        //                   id: ${id},
        //                   age: ${age}
        //                 }
        //               })
        //             {
        //                student{
        //                  name
        //                  id
        //                  age
        
        //               }
        //             }
        // }`
                
                const data =  this.getquery(objectdata);    
        
                
                  const options = {
                    hostname: 'localhost',
                    port: 5000,
                    path: '/graphql',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/graphql',
                      'Content-Length': data.length
                    }
                  }
                  
                  const req = http.request(options, res => {
                    //console.log(`statusCode: ${res.statusCode}`)
                  
                    res.on('data', d => {
                      //process.stdout.write(d)
                    })
                  })
                  
                  req.on('error', error => {
                    //console.error(error)
                  })
                  
                  req.write(data)
                  req.end()
               
                
            }
        
            getquery(objectdata: any){
               let id= objectdata.id;
               let first_name= objectdata.first_name;
               let last_name=objectdata.last_name;
               let email= objectdata.email;
               let carMake=objectdata.car_make;
               let carModel= objectdata.car_model;
               let age_of_vehicle=  objectdata.age_of_vehicle;
               let manufactured_date= objectdata.manufactured_date;
               let vin_number= objectdata.vin_number;
              
              
              

                const query=`mutation createPost{
                    createAutoclubdatum(input:  {
                        autoclubdatum: {
                          id: ${id},
                          firstName: "${first_name}",
                          lastName: "${last_name}",
                          email: "${email}",
                          carMake: "${carMake}",
                          carModel: "${carModel}",
                          ageOfVehicle: ${age_of_vehicle},
                          manufacturedDate: "2018-08-12",
                          vinNumber: "${vin_number}"            
                          
                        }
                      })
                    {
                       autoclubdatum{
                        id
                        firstName
                        lastName
                        email
                        carMake
                        carModel
                        ageOfVehicle,
                        manufacturedDate
                        vinNumber
        
                      }
                    }
                }
                `
        
                return query;
            } 

}

