import { Injectable } from '@nestjs/common';
import * as http from 'http';
import { rejects } from 'node:assert';
import { UpdateDataDto } from './updateDataDto';
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
                  //console.log(JSON.parse(returndata)) 
                   resolve(JSON.parse(returndata).data.allAutoclubdata.nodes); 
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
          allAutoclubdata(first: 100, orderBy: ID_ASC, offset:0) {
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


    async deletegraphqlrecord(id: number):Promise<any>{
        return new Promise(resolve => {
            let returndata = '';   
            const data =  this.getDeletequery(id); 
            
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
            console.log(`statusCode: ${res.statusCode}`)
            
            res.on('data', d => {
                //process.stdout.write(d)
                returndata+=d;
            }),
            res.on('end', () => {
                //console.log(returndata);
                resolve(JSON.parse(returndata).data.deleteAutoclubdatumById.autoclubdatum); 
               
                
              });
            })
            
            req.on('error', error => {
            console.error(error)
            })
            
            req.write(data)
            req.end()
   
        },);
      }
  
      getDeletequery(id: any){
        
        const query=`mutation {
          deleteAutoclubdatumById(input: {id:${id}}) {
            autoclubdatum {
              ageOfVehicle
              carMake
              carModel
              email
              firstName
              id
              lastName
              manufacturedDate
            }
          }
        }`
  
        return query;
        
      }
    /////////////////////////////////////////////////////////////////////////////////////////////
    async updategraphqlrecord(updateDataDto:UpdateDataDto):Promise<any>{
      return new Promise(resolve => {
          let returndata = '';    
          const data =  this.getUpdatequery(updateDataDto); 
          
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
          console.log(`statusCode: ${res.statusCode}`)
          
          res.on('data', d => {
              //process.stdout.write(d)
              returndata+=d;
          }),
          res.on('end', () => {
              
              resolve({"msg":"Successfully updated"}); 
           });
          })
          
          req.on('error', error => {
          console.error(error)
          })
          
          req.write(data)
          req.end()
 
      },);
    }

    getUpdatequery(updateDataDto: UpdateDataDto){
      
      const query=`mutation {
        updateAutoclubdatumById(
          input: {autoclubdatumPatch: {ageOfVehicle: ${updateDataDto.ageOfVehicle}, carMake: "${updateDataDto.carMake}", carModel: "${updateDataDto.carModel}", email: "${updateDataDto.email}", firstName: "${updateDataDto.firstName}", lastName: "${updateDataDto.lastName}", manufacturedDate: "${updateDataDto.manufacturedDate}"}, id: ${updateDataDto.id}}
        ) {
          clientMutationId
         
        }
      }`

      return query;
      
    }

    /////////////////////////////////////////////////////////////////////////////////////////////

    async  findPaginationData(pagesize: number):Promise<any>{
        
      return new Promise(resolve => {
          setTimeout(() => {

          const query=  this.getPaginationquery(pagesize);        
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
                 //console.log(returndata);
                 resolve(JSON.parse(returndata).data.allAutoclubdata.nodes); 
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


  getPaginationquery(pagesize: number){
    
      const query=`query MyQuery {
        allAutoclubdata(first:100, orderBy: MANUFACTURED_DATE_ASC,offset:${pagesize}) {
          nodes {
            firstName
            ageOfVehicle
            carMake
            carModel
            email
            id
            lastName
            manufacturedDate
            
          }
        }
      }
      `
      return query;
  }






}

