"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var storage_service_1 = require("../services/storage.service");
var objectToArray_pipe_1 = require("../pipes/objectToArray.pipe");
var AppComponent = (function () {
    function AppComponent(storageService) {
        this.storageService = storageService;
        this.new_component = this.init_new_component();
        this.components = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        //this.get_all_components();
    };
    ;
    AppComponent.prototype.init_new_component = function (mutability) {
        if (mutability === void 0) { mutability = ''; }
        return {
            mutability: mutability
        };
    };
    ;
    AppComponent.prototype.set_new_component_mutability = function (mutability) {
        this.new_component = this.init_new_component(mutability);
    };
    ;
    AppComponent.prototype.create_component = function () {
        var _this = this;
        console.log(this.components);
        if (!this.new_component.name) {
            console.log(' no name was provided ');
            return;
        }
        if (this.exist_component_whith_this_name()) {
            console.log(' component with such name exists ');
            return;
        }
        this.storageService.insert('/api/components', {
            name: this.new_component.name,
            group: this.new_component.group || '',
            mutability: this.new_component.mutability,
            body: []
        }).
            subscribe(function (res) {
            console.log('post - ', res);
            console.log(res.msg);
            if (!res.error) {
                _this.components = res.components;
                _this.new_component = _this.init_new_component(_this.new_component.mutability);
            }
        });
    };
    ;
    AppComponent.prototype.change_component = function (component) {
        var _this = this;
        if (!component.new_name) {
            console.log('no name was provided ');
            return;
        }
        if (this.exist_component_whith_this_name(component.new_name)) {
            console.log(' component with such name exists ');
            return;
        }
        this.storageService.update('/api/components', {
            id: component._id,
            name: component.new_name,
            group: component.group,
            mutability: this.new_component.mutability,
            body: component.body
        }).
            subscribe(function (res) {
            console.log('put - ', res);
            if (!res.error)
                _this.components = res.components;
        });
    };
    ;
    AppComponent.prototype.copy_component = function (component) {
        var _this = this;
        if (!component.new_name) {
            console.log('no name was provided ');
            return;
        }
        if (this.exist_component_whith_this_name(component.new_name)) {
            console.log(' component with such name exists ');
            return;
        }
        this.storageService.insert('/api/components', {
            name: component.new_name,
            group: component.group,
            mutability: component.mutability,
            body: component.body
        }).
            subscribe(function (res) {
            console.log('post - ', res);
            console.log(res.msg);
            if (!res.error)
                _this.components = res.components;
        });
    };
    ;
    AppComponent.prototype.delete_component = function (id) {
        var _this = this;
        if (!id) {
            console.log('no id was provided ');
            return;
        }
        this.storageService.delete('/api/components', id).
            subscribe(function (res) {
            console.log('delete - ', res);
            if (!res.error)
                _this.components = res.components;
        });
    };
    ;
    AppComponent.prototype.exist_component_whith_this_name = function (name) {
        if (name === void 0) { name = this.new_component.name; }
        if (this.components.find(function (el) { return el.name === name ? true : false; }))
            return true;
        return false;
    };
    ;
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
    AppComponent.prototype.create_guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    ;
    //  Returns a deep copy of the object
    AppComponent.prototype.deepCopy = function (oldObj) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.template.html',
            styleUrls: ['app.style.css'],
            providers: [storage_service_1.StorageService],
            pipes: [objectToArray_pipe_1.ObjectToArrayPipe]
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBRTFDLGdDQUE2Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzNELG1DQUFnQyw2QkFBNkIsQ0FBQyxDQUFBO0FBVTlEO0lBSUksc0JBQW1CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUgxQyxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFDLGVBQVUsR0FBRyxFQUFFLENBQUM7SUFFNkIsQ0FBQztJQUVyRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4Qiw0QkFBNEI7SUFDaEMsQ0FBQzs7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsVUFBZTtRQUFmLDBCQUFlLEdBQWYsZUFBZTtRQUM5QixNQUFNLENBQUM7WUFDSCxVQUFVLEVBQUcsVUFBVTtTQUMxQixDQUFDO0lBQ04sQ0FBQzs7SUFFRCxtREFBNEIsR0FBNUIsVUFBNkIsVUFBVTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxVQUFVLENBQUUsQ0FBQztJQUNoRSxDQUFDOztJQUVELHVDQUFnQixHQUFoQjtRQUFBLGlCQXlCQztRQXhCRyxPQUFPLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFFLHdCQUF3QixDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFFO1FBQ1osQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQywrQkFBK0IsRUFBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFF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RSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7SUF0VUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7WUFDM0IsS0FBSyxFQUFFLENBQUMsc0NBQWlCLENBQUM7U0FDN0IsQ0FBQzs7b0JBQUE7SUFxV0YsbUJBQUM7QUFBRCxDQXBXQSxBQW9XQyxJQUFBO0FBcFdZLG9CQUFZLGVBb1d4QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtTdG9yYWdlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge09iamVjdFRvQXJyYXlQaXBlfSBmcm9tIFwiLi4vcGlwZXMvb2JqZWN0VG9BcnJheS5waXBlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsIFxyXG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnYXBwLnN0eWxlLmNzcyddLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvcmFnZVNlcnZpY2VdLFxyXG4gICAgcGlwZXM6IFtPYmplY3RUb0FycmF5UGlwZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgbmV3X2NvbXBvbmVudCA9IHRoaXMuaW5pdF9uZXdfY29tcG9uZW50KCk7XHJcbiAgICBwdWJsaWMgY29tcG9uZW50cyA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdG9yYWdlU2VydmljZTogU3RvcmFnZVNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25nT25Jbml0Jyk7XHJcbiAgICAgICAgLy90aGlzLmdldF9hbGxfY29tcG9uZW50cygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpbml0X25ld19jb21wb25lbnQobXV0YWJpbGl0eSA9ICcnKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtdXRhYmlsaXR5IDogbXV0YWJpbGl0eVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHNldF9uZXdfY29tcG9uZW50X211dGFiaWxpdHkobXV0YWJpbGl0eSl7XHJcbiAgICAgICAgdGhpcy5uZXdfY29tcG9uZW50ID0gIHRoaXMuaW5pdF9uZXdfY29tcG9uZW50KCBtdXRhYmlsaXR5ICk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZV9jb21wb25lbnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyggdGhpcy5jb21wb25lbnRzICk7XHJcbiAgICAgICAgaWYgKCAhdGhpcy5uZXdfY29tcG9uZW50Lm5hbWUgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnIG5vIG5hbWUgd2FzIHByb3ZpZGVkICcpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRoaXMuZXhpc3RfY29tcG9uZW50X3doaXRoX3RoaXNfbmFtZSgpICkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggJyBjb21wb25lbnQgd2l0aCBzdWNoIG5hbWUgZXhpc3RzICcgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmluc2VydCgnL2FwaS9jb21wb25lbnRzJywge1xyXG4gICAgICAgICAgICBuYW1lIDogdGhpcy5uZXdfY29tcG9uZW50Lm5hbWUsXHJcbiAgICAgICAgICAgIGdyb3VwIDogdGhpcy5uZXdfY29tcG9uZW50Lmdyb3VwIHx8ICcnLFxyXG4gICAgICAgICAgICBtdXRhYmlsaXR5IDogdGhpcy5uZXdfY29tcG9uZW50Lm11dGFiaWxpdHksXHJcbiAgICAgICAgICAgIGJvZHkgOiBbXVxyXG4gICAgICAgICB9KS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdwb3N0IC0gJyAsIHJlcyApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHJlcy5tc2cgKTtcclxuICAgICAgICAgICAgICAgIGlmICggIXJlcy5lcnJvciApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSByZXMuY29tcG9uZW50cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld19jb21wb25lbnQgPSB0aGlzLmluaXRfbmV3X2NvbXBvbmVudCh0aGlzLm5ld19jb21wb25lbnQubXV0YWJpbGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBjaGFuZ2VfY29tcG9uZW50KGNvbXBvbmVudCl7XHJcbiAgICAgICAgaWYgKCAhY29tcG9uZW50Lm5ld19uYW1lICkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gbmFtZSB3YXMgcHJvdmlkZWQgJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHRoaXMuZXhpc3RfY29tcG9uZW50X3doaXRoX3RoaXNfbmFtZShjb21wb25lbnQubmV3X25hbWUpICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCAnIGNvbXBvbmVudCB3aXRoIHN1Y2ggbmFtZSBleGlzdHMgJyApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2UudXBkYXRlKCcvYXBpL2NvbXBvbmVudHMnLHtcclxuICAgICAgICAgICAgaWQgOiBjb21wb25lbnQuX2lkLFxyXG4gICAgICAgICAgICBuYW1lIDogY29tcG9uZW50Lm5ld19uYW1lLFxyXG4gICAgICAgICAgICBncm91cCA6IGNvbXBvbmVudC5ncm91cCxcclxuICAgICAgICAgICAgbXV0YWJpbGl0eSA6IHRoaXMubmV3X2NvbXBvbmVudC5tdXRhYmlsaXR5LFxyXG4gICAgICAgICAgICBib2R5IDogY29tcG9uZW50LmJvZHlcclxuICAgICAgICB9KS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdwdXQgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXMuZXJyb3IgKSB0aGlzLmNvbXBvbmVudHMgPSByZXMuY29tcG9uZW50cztcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29weV9jb21wb25lbnQoY29tcG9uZW50KSB7XHJcbiAgICAgICAgaWYgKCAhY29tcG9uZW50Lm5ld19uYW1lICkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggJ25vIG5hbWUgd2FzIHByb3ZpZGVkICcgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggdGhpcy5leGlzdF9jb21wb25lbnRfd2hpdGhfdGhpc19uYW1lKGNvbXBvbmVudC5uZXdfbmFtZSkgKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coICcgY29tcG9uZW50IHdpdGggc3VjaCBuYW1lIGV4aXN0cyAnICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5pbnNlcnQoJy9hcGkvY29tcG9uZW50cycsIHtcclxuICAgICAgICAgICAgbmFtZSA6IGNvbXBvbmVudC5uZXdfbmFtZSxcclxuICAgICAgICAgICAgZ3JvdXAgOiBjb21wb25lbnQuZ3JvdXAsXHJcbiAgICAgICAgICAgIG11dGFiaWxpdHkgOiBjb21wb25lbnQubXV0YWJpbGl0eSxcclxuICAgICAgICAgICAgYm9keSA6IGNvbXBvbmVudC5ib2R5XHJcbiAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3Bvc3QgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggcmVzLm1zZyApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhcmVzLmVycm9yICkgdGhpcy5jb21wb25lbnRzID0gcmVzLmNvbXBvbmVudHM7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVfY29tcG9uZW50KGlkKSB7XHJcbiAgICAgICAgaWYgKCAhaWQgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBpZCB3YXMgcHJvdmlkZWQgJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5kZWxldGUoJy9hcGkvY29tcG9uZW50cycsIGlkKS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdkZWxldGUgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXMuZXJyb3IgKSB0aGlzLmNvbXBvbmVudHMgPSByZXMuY29tcG9uZW50cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGV4aXN0X2NvbXBvbmVudF93aGl0aF90aGlzX25hbWUobmFtZSA9IHRoaXMubmV3X2NvbXBvbmVudC5uYW1lKXtcclxuICAgICAgICBpZihcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLmZpbmQoZWwgPT4geyByZXR1cm4gZWwubmFtZSA9PT0gbmFtZSA/IHRydWUgOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICApIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbi8qXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZV9jb21wb25lbnQgPSB7fTtcclxuICAgIHB1YmxpYyBuZXdfZmllbGQgPSB7fTtcclxuXHJcbiAgICBnZXRfYWxsX2NvbXBvbmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5zZWxlY3QoJy9hcGkvY29tcG9uZW50cycgKS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdnZXQgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiggIXJlcy5lcnJvciApIHRoaXMuY29tcG9uZW50cyA9IHJlcy5jb21wb25lbnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY3JlYXRlX2NvbXBvbmVudF9mdW5jKCkge1xyXG4gICAgICAgIGlmICggIXRoaXMuY3JlYXRlX2NvbXBvbmVudC5uYW1lICkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZV9jb21wb25lbnQucmVzcG9uc2UgPSAnbm8gZGF0YSB3YXMgcHJvdmlkZWQgJ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCB0aGlzLmNoZWNrX2lmX2NvbXBvbmVudF9leGlzdCh0aGlzLmNyZWF0ZV9jb21wb25lbnQubmFtZSkgKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyB0aGlzIG5hbWUgZXhpc3RzICcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2UuaW5zZXJ0KCcvYXBpL2NvbXBvbmVudHMnLHtcclxuICAgICAgICAgICAgbmFtZSA6IHRoaXMuY3JlYXRlX2NvbXBvbmVudC5uYW1lLFxyXG4gICAgICAgICAgICBncm91cCA6IHRoaXMuY3JlYXRlX2NvbXBvbmVudC5ncm91cCxcclxuICAgICAgICAgICAgYm9keSA6IFtdXHJcbiAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3Bvc3QgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZV9jb21wb25lbnQucmVzcG9uc2UgPSByZXMubXNnO1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhcmVzLmVycm9yICkgdGhpcy5jb21wb25lbnRzID0gcmVzLmNvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjaGFuZ2VfY29tcG9uZW50KGl0ZW0pe1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coIGl0ZW0gKTtcclxuICAgICAgICBpZiAoICFpdGVtLm5ld19uYW1lICkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gbmFtZSB3YXMgcHJvdmlkZWQgJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHRoaXMuY2hlY2tfaWZfY29tcG9uZW50X2V4aXN0KGl0ZW0ubmV3X25hbWUpICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdGhpcyBuYW1lIGV4aXN0cyAnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZSgnL2FwaS9jb21wb25lbnRzJyx7XHJcbiAgICAgICAgICAgIGlkIDogaXRlbS5faWQsXHJcbiAgICAgICAgICAgIG5hbWUgOiBpdGVtLm5ld19uYW1lLFxyXG4gICAgICAgICAgICBncm91cCA6IGl0ZW0uZ3JvdXAsXHJcbiAgICAgICAgICAgIGJvZHkgOiBpdGVtLmJvZHlcclxuICAgICAgICB9KS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdwdXQgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXMuZXJyb3IgKSB0aGlzLmNvbXBvbmVudHMgPSByZXMuY29tcG9uZW50cztcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29weV9jb21wb25lbnQoaXRlbSkge1xyXG4gICAgICAgIGlmICggIWl0ZW0ubmV3X25hbWUgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBuYW1lIHdhcyBwcm92aWRlZCAnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggdGhpcy5jaGVja19pZl9jb21wb25lbnRfZXhpc3QoaXRlbS5uZXdfbmFtZSkgKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyB0aGlzIG5hbWUgZXhpc3RzICcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2UuaW5zZXJ0KCcvYXBpL2NvbXBvbmVudHMnLHtcclxuICAgICAgICAgICAgbmFtZSA6IGl0ZW0ubmV3X25hbWUsXHJcbiAgICAgICAgICAgIGdyb3VwIDppdGVtLmdyb3VwLFxyXG4gICAgICAgICAgICBib2R5IDogaXRlbS5ib2R5XHJcbiAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3Bvc3QgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZV9jb21wb25lbnQucmVzcG9uc2UgPSByZXMubXNnO1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhcmVzLmVycm9yICkgdGhpcy5jb21wb25lbnRzID0gcmVzLmNvbXBvbmVudHM7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVfY29tcG9uZW50KGlkKSB7XHJcbiAgICAgICAgaWYgKCAhaWQgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBpZCB3YXMgcHJvdmlkZWQgJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5kZWxldGUoJy9hcGkvY29tcG9uZW50cycsIGlkKS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdkZWxldGUgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXMuZXJyb3IgKSB0aGlzLmNvbXBvbmVudHMgPSByZXMuY29tcG9uZW50cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgY2hlY2tfaWZfY29tcG9uZW50X2V4aXN0KGNvbXBvbmVudF9uYW1lKXtcclxuICAgICAgIGxldCBleGlzdCA9IGZhbHNlO1xyXG4gICAgICAgdGhpcy5jb21wb25lbnRzLm1hcChpdGVtID0+IHsgaXRlbS5uYW1lID09PSBjb21wb25lbnRfbmFtZSA/IGV4aXN0ID0gdHJ1ZSA6IGZhbHNlIH0pO1xyXG4gICAgICAgcmV0dXJuIGV4aXN0O1xyXG4gICB9O1xyXG5cclxuICAgIHNob3dfc2luZ2xlX2NvbXBvbmVudChpdGVtKXtcclxuICAgICAgICB0aGlzLnNpbmdsZV9jb21wb25lbnQgPSBpdGVtO1xyXG4gICAgfTtcclxuXHJcbiAgICBjaGFuZ2VfbmV3X2ZpZWxkX3R5cGUoKXtcclxuICAgICAgICB0aGlzLm5ld19maWVsZC52YWx1ZSA9ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRfbmV3X2ZpZWxkKCApIHtcclxuICAgICAgICBpZiggIXRoaXMubmV3X2ZpZWxkLm5hbWUgfHwgdGhpcy5jaGVja19pZl9maWVsZF9leGlzdCh0aGlzLm5ld19maWVsZC5uYW1lICkgKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyB0aGlzIG5hbWUgaXMgbm90IE9LICcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5uZXdfZmllbGQudHlwZSA9PSAnbnVtYmVyJyApIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdfZmllbGQudmFsdWUgPyB0aGlzLm5ld19maWVsZC52YWx1ZSA9IE51bWJlcih0aGlzLm5ld19maWVsZC52YWx1ZSkgOiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLm5ld19maWVsZC50eXBlID09ICdib29sZWFuJyApIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdfZmllbGQudmFsdWUgPSAhIXRoaXMubmV3X2ZpZWxkLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5ld19maWVsZC5pZCA9IHRoaXMuY3JlYXRlX2d1aWQoKTtcclxuICAgICAgICBsZXQgbmV3X2ZpZWxkICA9IHRoaXMuZGVlcENvcHkodGhpcy5uZXdfZmllbGQpO1xyXG4gICAgICAgIHRoaXMuc2luZ2xlX2NvbXBvbmVudC5ib2R5ID0gWy4uLnRoaXMuc2luZ2xlX2NvbXBvbmVudC5ib2R5LCBuZXdfZmllbGRdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2NvbXBvbmVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgIGNoZWNrX2lmX2ZpZWxkX2V4aXN0KGZpZWxkX25hbWUpe1xyXG4gICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XHJcbiAgICAgICB0aGlzLnNpbmdsZV9jb21wb25lbnQuYm9keS5tYXAoaXRlbSA9PiB7IGl0ZW0ubmFtZSA9PSBmaWVsZF9uYW1lID8gZXhpc3QgPSB0cnVlIDogZmFsc2UgfSk7XHJcbiAgICAgICByZXR1cm4gZXhpc3Q7XHJcbiAgIH07XHJcblxyXG4gICBjaGFuZ2VfZmllbGRfZnVuYyhpdGVtLCBkZWVwKSB7XHJcbiAgICAgICBpZiAoIGRlZXAgKSB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coICdkZWVwJyApO1xyXG4gICAgICAgfSBcclxuICAgICAgIGxldCB1cGRhdGUgPSAgdHJ1ZTtcclxuICAgICAgIHRoaXMuc2luZ2xlX2NvbXBvbmVudC5ib2R5Lm1hcChlbCA9PiB7XHJcbiAgICAgICAgICAgaWYgKCBlbC5uYW1lID09IGl0ZW0ubmFtZSAmJiBlbC5pZCAhPSBpdGVtLmlkKSB7XHJcbiAgICAgICAgICAgICAgIHVwZGF0ZSA9ICBmYWxzZTtcclxuICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlbC5pZCArJyAhPSAnKyBpdGVtLmlkKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG4gICAgICAgaWYgKCB1cGRhdGUgKSB0aGlzLnVwZGF0ZV9jb21wb25lbnQoKTtcclxuXHJcbiAgIH07XHJcblxyXG4gICBkZWxldGVfZmllbGRfZnVuYyhpdGVtLCBkZWVwKXtcclxuICAgICAgIGlmICggZGVlcCApIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyggJ2RlZXAnICk7XHJcbiAgICAgICB9IFxyXG4gICAgICAgdGhpcy5zaW5nbGVfY29tcG9uZW50LmJvZHkubWFwKCAoZWwsIGkpID0+IHtcclxuICAgICAgICAgICBpZiAoIGVsLmlkID09IGl0ZW0uaWQgKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuc2luZ2xlX2NvbXBvbmVudC5ib2R5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfY29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7ICAgICAgIFxyXG4gICB9O1xyXG5cclxuICAgZGlzYWJsZWRfaWZfZmFsc2UodHlwZSkge1xyXG4gICAgICAgLy9jb25zb2xlLmxvZyggIXR5cGUgKTtcclxuICAgICAgIHJldHVybiAhdHlwZTtcclxuICAgfTtcclxuXHJcbiAgICB1cGRhdGVfY29tcG9uZW50KCkge1xyXG4gICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZSgnL2FwaS9jb21wb25lbnRzJywge1xyXG4gICAgICAgICAgICBpZCA6IHRoaXMuc2luZ2xlX2NvbXBvbmVudC5faWQsXHJcbiAgICAgICAgICAgIG5hbWUgOiB0aGlzLnNpbmdsZV9jb21wb25lbnQubmFtZSxcclxuICAgICAgICAgICAgYm9keSA6IHRoaXMuc2luZ2xlX2NvbXBvbmVudC5ib2R5XHJcbiAgICAgICAgfSkuXHJcbiAgICAgICAgICAgIHN1YnNjcmliZSggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAncHV0IC0gJyAsIHJlcyApO1xyXG4gICAgICAgICAgICAgICAgaWYoICFyZXMuZXJyb3IgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzID0gcmVzLmNvbXBvbmVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLm1hcCggKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5jb21wb25lbnRzW2ldLl9pZCA9PSB0aGlzLnNpbmdsZV9jb21wb25lbnQuX2lkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbmdsZV9jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIHJldHVybiB1bmlxdWUgaWRcclxuICAgIGNyZWF0ZV9ndWlkKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG4gXHQgICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xyXG4gICAgICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyAgUmV0dXJucyBhIGRlZXAgY29weSBvZiB0aGUgb2JqZWN0XHJcbiAgICBkZWVwQ29weShvbGRPYmo6IGFueSkge1xyXG4gICAgICAgIGxldCBuZXdPYmogPSBvbGRPYmo7XHJcbiAgICAgICAgaWYgKG9sZE9iaiAmJiB0eXBlb2Ygb2xkT2JqID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIG5ld09iaiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvbGRPYmopID09PSBcIltvYmplY3QgQXJyYXldXCIgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG9sZE9iaikge1xyXG4gICAgICAgICAgICAgICAgbmV3T2JqW2ldID0gdGhpcy5kZWVwQ29weShvbGRPYmpbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdPYmo7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICBpbnNlcnRfZnVuYygpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmluc2VydCgnL2FwaS9wYWdlcycse1xyXG4gICAgICAgICAgICBuYW1lIDogdGhpcy5jcmVhdGVfcGFnZS5uYW1lLFxyXG4gICAgICAgICAgICBib2R5IDogW11cclxuICAgICAgICAgfSkuXHJcbiAgICAgICAgICAgIHN1YnNjcmliZSggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAncG9zdCAtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0ID0gIEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVfZnVuYygpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZSgnL2FwaS9wYWdlcycse1xyXG4gICAgICAgICAgICBpZCA6IHRoaXMudXBkYXRlX2lkLFxyXG4gICAgICAgICAgICBuYW1lIDogJyBoZWFkZXIgJyxcclxuICAgICAgICAgICAgYm9keSA6IFt7IG5hbWU6ICd0ZXN0JywgdHlwZTogJ1N0cmluZyd9XVxyXG4gICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3B1dC0gJyAsIHJlcyApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSAgSlNPTi5zdHJpbmdpZnkocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZV9mdW5jKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2UuZGVsZXRlKCcvYXBpL3BhZ2VzJywgdGhpcy5kZWxldGVfaWQpLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ2RlbGV0ZS0gJyAsIHJlcyApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUgPSAgSlNPTi5zdHJpbmdpZnkocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgKi9cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
