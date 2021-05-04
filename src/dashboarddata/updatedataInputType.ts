import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class  UpdatedataInputType{
    @Field()    
    id: number;
    @Field()    
    firstName: string;
    @Field()    
    lastName: string;
    @Field()    
    email:string;
    @Field()    
    carModel:string;
    @Field()    
    carMake:string;
    @Field()    
    ageOfVehicle:number;
    @Field()    
    manufacturedDate:string;

}