export interface UserModel {
    name: string;
    email: string;
    password: string;
    title?: "Mr" | "Mrs" | "Miss";
    birth_date?: string;
    birth_month?: string; 
    birth_year?: string;
    firstname:string; 
    lastname:string; 
    company?:string; 
    address1:string; 
    address2?:string; 
    country:string; 
    zipcode:string; 
    state:string; 
    city:string; 
    mobile_number:string
}