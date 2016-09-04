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
    public new_component = this.init_new_component();
    public components = [];

    constructor(public storageService: StorageService) {}

    ngOnInit() {
        console.log('ngOnInit');
        //this.get_all_components();
    };

    init_new_component(mutability = ''){
        return {
            mutability : mutability
        };
    };

    set_new_component_mutability(mutability){
        this.new_component =  this.init_new_component( mutability );
    };

    create_component(){
        console.log( this.components );
        if ( !this.new_component.name ) {
            console.log( ' no name was provided ');
            return ;
        }
        if ( this.exist_component_whith_this_name() ) {
            console.log( ' component with such name exists ' );
            return;
        }
        this.storageService.insert('/api/components', {
            name : this.new_component.name,
            group : this.new_component.group || '',
            mutability : this.new_component.mutability,
            body : []
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                console.log( res.msg );
                if ( !res.error ) {
                    this.components = res.components;
                    this.new_component = this.init_new_component(this.new_component.mutability);
                }
        });

    };

    change_component(component){
        if ( !component.new_name ) {
            console.log('no name was provided ');
            return;
        }
        if( this.exist_component_whith_this_name(component.new_name) ){
            console.log( ' component with such name exists ' );
            return;
        }
        this.storageService.update('/api/components',{
            id : component._id,
            name : component.new_name,
            group : component.group,
            mutability : this.new_component.mutability,
            body : component.body
        }).
            subscribe( res => {
                console.log( 'put - ' , res );
                if ( !res.error ) this.components = res.components;
        });
    };

    copy_component(component) {
        if ( !component.new_name ) {
            console.log( 'no name was provided ' );
            return;
        }
        if( this.exist_component_whith_this_name(component.new_name) ){
            console.log( ' component with such name exists ' );
            return;
        }
        this.storageService.insert('/api/components', {
            name : component.new_name,
            group : component.group,
            mutability : component.mutability,
            body : component.body
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                console.log( res.msg );
                if ( !res.error ) this.components = res.components;
         });
    };

    delete_component(id) {
        if ( !id ) {
            console.log('no id was provided ');
            return;
        }
        this.storageService.delete('/api/components', id).
            subscribe( res => {
                console.log( 'delete - ' , res );
                if ( !res.error ) this.components = res.components;
            });
    };

    exist_component_whith_this_name(name = this.new_component.name){
        if(
            this.components.find(el => { return el.name === name ? true : false })
            ) return true;
        return false;
    };



    

/*
        public create_component = {};
    public new_field = {};

    get_all_components() {
        this.storageService.select('/api/components' ).
            subscribe( res => {
                console.log( 'get - ' , res );
                if( !res.error ) this.components = res.components;
            });
    };

    create_component_func() {
        if ( !this.create_component.name ) {
            this.create_component.response = 'no data was provided '
            return;
        }
        if( this.check_if_component_exist(this.create_component.name) ){
            console.log(' this name exists ');
            return;
        }
        this.storageService.insert('/api/components',{
            name : this.create_component.name,
            group : this.create_component.group,
            body : []
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                this.create_component.response = res.msg;
                if ( !res.error ) this.components = res.components;
            });
    };

    change_component(item){
        //console.log( item );
        if ( !item.new_name ) {
            console.log('no name was provided ');
            return;
        }
        if( this.check_if_component_exist(item.new_name) ){
            console.log(' this name exists ');
            return;
        }
        this.storageService.update('/api/components',{
            id : item._id,
            name : item.new_name,
            group : item.group,
            body : item.body
        }).
            subscribe( res => {
                console.log( 'put - ' , res );
                if ( !res.error ) this.components = res.components;
        });
    };

    copy_component(item) {
        if ( !item.new_name ) {
            console.log('no name was provided ');
            return;
        }
        if( this.check_if_component_exist(item.new_name) ){
            console.log(' this name exists ');
            return;
        }
        this.storageService.insert('/api/components',{
            name : item.new_name,
            group :item.group,
            body : item.body
         }).
            subscribe( res => {
                console.log( 'post - ' , res );
                this.create_component.response = res.msg;
                if ( !res.error ) this.components = res.components;
         });
    };

    delete_component(id) {
        if ( !id ) {
            console.log('no id was provided ');
            return;
        }
        this.storageService.delete('/api/components', id).
            subscribe( res => {
                console.log( 'delete - ' , res );
                if ( !res.error ) this.components = res.components;
            });
    };

   check_if_component_exist(component_name){
       let exist = false;
       this.components.map(item => { item.name === component_name ? exist = true : false });
       return exist;
   };

    show_single_component(item){
        this.single_component = item;
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
        this.new_field.id = this.create_guid();
        let new_field  = this.deepCopy(this.new_field);
        this.single_component.body = [...this.single_component.body, new_field];
        this.update_component();
    };

   check_if_field_exist(field_name){
       let exist = false;
       this.single_component.body.map(item => { item.name == field_name ? exist = true : false });
       return exist;
   };

   change_field_func(item, deep) {
       if ( deep ) {
           console.log( 'deep' );
       } 
       let update =  true;
       this.single_component.body.map(el => {
           if ( el.name == item.name && el.id != item.id) {
               update =  false;
               //console.log(el.id +' != '+ item.id)
           }
       });
       if ( update ) this.update_component();

   };

   delete_field_func(item, deep){
       if ( deep ) {
           console.log( 'deep' );
       } 
       this.single_component.body.map( (el, i) => {
           if ( el.id == item.id ) {
               this.single_component.body.splice(i, 1);
               this.update_component();
           }
       });       
   };

   disabled_if_false(type) {
       //console.log( !type );
       return !type;
   };

    update_component() {
         this.storageService.update('/api/components', {
            id : this.single_component._id,
            name : this.single_component.name,
            body : this.single_component.body
        }).
            subscribe( res => {
                console.log( 'put - ' , res );
                if( !res.error ) {
                    this.components = res.components;
                    this.components.map( (el, i) => {
                        if ( this.components[i]._id == this.single_component._id ){
                            this.single_component = this.components[i];
                        }
                    });
                }
            });
    };





    */

    // return unique id
    create_guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
 	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
    };

    //  Returns a deep copy of the object
    deepCopy(oldObj: any) {
        let newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    };




    /*
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
    */

}
