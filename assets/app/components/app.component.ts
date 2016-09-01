import { Component } from '@angular/core';

import {StorageService} from "../services/storage.service";
import {ObjectToArrayPipe} from "../pipes/objectToArray.pipe";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.css'],
    providers: [StorageService],
    pipes: [ObjectToArrayPipe]
})
export class AppComponent {
    public create_page = {};
    public change_page_name = {};
    public new_field = {};

    constructor(public storageService: StorageService) {}

    ngOnInit() {
        console.log('ngOnInit');
        this.get_all_pages();
    };

    get_all_pages() {
        this.storageService.select('/api/pages' ).
            subscribe( res => {
                console.log( 'get - ' , res );
                if( !res.error ) this.pages = res.pages;
            });
    }; 

    create_page_func() {
        if ( !this.create_page.name ) {
            this.create_page.response = 'no data was provided '
            return;
        }
        if( this.check_if_page_exist(this.create_page.name) ){
            console.log(' this name exists ');
            return;            
        }
        this.storageService.insert('/api/pages',{
            name : this.create_page.name,
            body : []
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                this.create_page.response = res.msg;
                if ( !res.error ) this.pages = res.pages;
            });
    };

    change_page_name_func(item){
        console.log( item );
        if ( !this.change_page_name[item._id] ) {
            console.log('no name was provided ');
            return;
        }
        if( this.check_if_page_exist(this.change_page_name[item._id]) ){
            console.log(' this name exists ');
            return;            
        }
        this.storageService.update('/api/pages',{
            id : item._id,
            name : this.change_page_name[item._id],
            body : item.body
        }).
            subscribe( res => {
                console.log( 'put - ' , res );
                if ( !res.error ) this.pages = res.pages;
        });
    };

    delete_page_func(id) {
        if ( !id ) {
            console.log('no id was provided ');
            return;
        }
        this.storageService.delete('/api/pages', id).
            subscribe( res => {
                console.log( 'delete - ' , res );
                if ( !res.error ) this.pages = res.pages;
            });
    };

   check_if_page_exist(page_name){
       let exist = false;
       this.pages.map(item => { item.name === page_name ? exist = true : false });
       return exist;
   };

    show_single_page(item){
        this.single_page = item;
    };

    change_new_field_type(){
        this.new_field.value = '';
    };

    add_new_field( ) {
        if( !this.new_field.name || this.check_if_field_exist(this.new_field.name ) ){
            console.log(' this name is not OK ');
            return;            
        }
        if ( this.new_field.type == 'number' ) {
            this.new_field.value ? this.new_field.value = Number(this.new_field.value) : '';
        }
        if ( this.new_field.type == 'boolean' ) {
            this.new_field.value = !!this.new_field.value;
        }
        if ( this.new_field.type == 'boolean' ) {
            this.new_field.value = !!this.new_field.value;
        }
        if ( this.new_field.type == 'object' ) {
            this.new_field.value = {};
        }
        if ( this.new_field.type == 'array' ) {
            this.new_field.value = [];
        }
        let new_field  = this.deepCopy(this.new_field);
        this.single_page.body = [...this.single_page.body, new_field];
        this.update_page();
    };

   check_if_field_exist(field_name){
       let exist = false;
       this.single_page.body.map(item => { item.name == field_name ? exist = true : false });
       return exist;
   };

   change_field_func(item, deep) {
       if ( deep ) {
           console.log( 'deep' );
       }
       console.log(item);
       console.log(this.single_page);
       this.single_page.body.map(el => {
           if ( el.name == item.name ) {
               el = item;
               console.log(el);
           }
       });
       console.log('after ',this.single_page);
   };

   delete_field_func(){

   };
   
    update_page() {
        this.storageService.update('/api/pages',{
            id : this.single_page._id,
            name : this.single_page.name,
            body : this.single_page.body
        }).
            subscribe( res => {
                console.log( 'put - ' , res );
                if( !res.error ) this.pages = res.pages
            });
    };

    /**
        * Returns a deep copy of the object
    */
    deepCopy(oldObj: any) {
        let newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }



    insert_func() {
        this.storageService.insert('/api/pages',{
            name : this.create_page.name,
            body : []
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                this.insert =  JSON.stringify(res);
            });
    };

    update_func() {
        this.storageService.update('/api/pages',{
            id : this.update_id,
            name : ' header ',
            body : [{ name: 'test', type: 'String'}]
        }).
            subscribe( res => {
                console.log( 'put- ' , res );
                this.update =  JSON.stringify(res);
            });
    };

    delete_func() {
        this.storageService.delete('/api/pages', this.delete_id).
            subscribe( res => {
                console.log( 'delete- ' , res );
                this.delete =  JSON.stringify(res);
            });
    };
    
}