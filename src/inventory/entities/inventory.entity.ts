import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Inventory'})
export class Inventory {

    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    item_name:string;


    @Column()
    price:number;


    @Column()
    description:string;

}
