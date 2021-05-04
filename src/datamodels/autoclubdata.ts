import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AutoclubData{
    
    @Field(type => Int)
    id: number;

    @Field(type => String)
    firstName: string;

    @Field(type => String)
    lastName: string;

    @Field(type => String)
    phone: number;

    @Field(type => String)
    email:string;

    @Field(type => String)
    carModel:String;

    @Field(type => String)
    carMake:String;

    @Field(type => String)
    ageOfVehicle:number;
    
    @Field(type => String)
    manufacturedDate:String;


}