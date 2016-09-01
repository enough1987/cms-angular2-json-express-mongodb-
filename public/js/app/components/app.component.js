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
        this.create_page = {};
        this.change_page_name = {};
        this.new_field = {};
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        this.get_all_pages();
    };
    ;
    AppComponent.prototype.get_all_pages = function () {
        var _this = this;
        this.storageService.select('/api/pages').
            subscribe(function (res) {
            console.log('get - ', res);
            if (!res.error)
                _this.pages = res.pages;
        });
    };
    ;
    AppComponent.prototype.create_page_func = function () {
        var _this = this;
        if (!this.create_page.name) {
            this.create_page.response = 'no data was provided ';
            return;
        }
        if (this.check_if_page_exist(this.create_page.name)) {
            console.log(' this name exists ');
            return;
        }
        this.storageService.insert('/api/pages', {
            name: this.create_page.name,
            body: []
        }).
            subscribe(function (res) {
            console.log('post - ', res);
            _this.create_page.response = res.msg;
            if (!res.error)
                _this.pages = res.pages;
        });
    };
    ;
    AppComponent.prototype.change_page_name_func = function (item) {
        var _this = this;
        console.log(item);
        if (!this.change_page_name[item._id]) {
            console.log('no name was provided ');
            return;
        }
        if (this.check_if_page_exist(this.change_page_name[item._id])) {
            console.log(' this name exists ');
            return;
        }
        this.storageService.update('/api/pages', {
            id: item._id,
            name: this.change_page_name[item._id],
            body: item.body
        }).
            subscribe(function (res) {
            console.log('put - ', res);
            if (!res.error)
                _this.pages = res.pages;
        });
    };
    ;
    AppComponent.prototype.delete_page_func = function (id) {
        var _this = this;
        if (!id) {
            console.log('no id was provided ');
            return;
        }
        this.storageService.delete('/api/pages', id).
            subscribe(function (res) {
            console.log('delete - ', res);
            if (!res.error)
                _this.pages = res.pages;
        });
    };
    ;
    AppComponent.prototype.check_if_page_exist = function (page_name) {
        var exist = false;
        this.pages.map(function (item) { item.name === page_name ? exist = true : false; });
        return exist;
    };
    ;
    AppComponent.prototype.show_single_page = function (item) {
        this.single_page = item;
    };
    ;
    AppComponent.prototype.change_new_field_type = function () {
        this.new_field.value = '';
    };
    ;
    AppComponent.prototype.add_new_field = function () {
        if (!this.new_field.name || this.check_if_field_exist(this.new_field.name)) {
            console.log(' this name is not OK ');
            return;
        }
        if (this.new_field.type == 'number') {
            this.new_field.value ? this.new_field.value = Number(this.new_field.value) : '';
        }
        if (this.new_field.type == 'boolean') {
            this.new_field.value = !!this.new_field.value;
        }
        if (this.new_field.type == 'boolean') {
            this.new_field.value = !!this.new_field.value;
        }
        if (this.new_field.type == 'object') {
            this.new_field.value = {};
        }
        if (this.new_field.type == 'array') {
            this.new_field.value = [];
        }
        var new_field = this.deepCopy(this.new_field);
        this.single_page.body = this.single_page.body.concat([new_field]);
        this.update_page();
    };
    ;
    AppComponent.prototype.check_if_field_exist = function (field_name) {
        var exist = false;
        this.single_page.body.map(function (item) { item.name == field_name ? exist = true : false; });
        return exist;
    };
    ;
    AppComponent.prototype.change_field_func = function (item, deep) {
        if (deep) {
            console.log('deep');
        }
        console.log(item);
        console.log(this.single_page);
        this.single_page.body.map(function (el) {
            if (el.name == item.name) {
                el = item;
                console.log(el);
            }
        });
        console.log('after ', this.single_page);
    };
    ;
    AppComponent.prototype.delete_field_func = function () {
    };
    ;
    AppComponent.prototype.update_page = function () {
        var _this = this;
        this.storageService.update('/api/pages', {
            id: this.single_page._id,
            name: this.single_page.name,
            body: this.single_page.body
        }).
            subscribe(function (res) {
            console.log('put - ', res);
            if (!res.error)
                _this.pages = res.pages;
        });
    };
    ;
    /**
        * Returns a deep copy of the object
    */
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
    AppComponent.prototype.insert_func = function () {
        var _this = this;
        this.storageService.insert('/api/pages', {
            name: this.create_page.name,
            body: []
        }).
            subscribe(function (res) {
            console.log('post - ', res);
            _this.insert = JSON.stringify(res);
        });
    };
    ;
    AppComponent.prototype.update_func = function () {
        var _this = this;
        this.storageService.update('/api/pages', {
            id: this.update_id,
            name: ' header ',
            body: [{ name: 'test', type: 'String' }]
        }).
            subscribe(function (res) {
            console.log('put- ', res);
            _this.update = JSON.stringify(res);
        });
    };
    ;
    AppComponent.prototype.delete_func = function () {
        var _this = this;
        this.storageService.delete('/api/pages', this.delete_id).
            subscribe(function (res) {
            console.log('delete- ', res);
            _this.delete = JSON.stringify(res);
        });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBRTFDLGdDQUE2Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzNELG1DQUFnQyw2QkFBNkIsQ0FBQyxDQUFBO0FBVTlEO0lBS0ksc0JBQW1CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUoxQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQUU4QixDQUFDO0lBRXJELCtCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDOztJQUVELG9DQUFhLEdBQWI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBRTtZQUNyQyxTQUFTLENBQUUsVUFBQSxHQUFHO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBRSxRQUFRLEVBQUcsR0FBRyxDQUFFLENBQUM7WUFDOUIsRUFBRSxDQUFBLENBQUUsQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFDO2dCQUFDLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7O0lBRUQsdUNBQWdCLEdBQWhCO1FBQUEsaUJBa0JDO1FBakJHLEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFBO1lBQ25ELE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBRSxJQUFJLENBQUMsbUJBQW1CLENB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T0FBTyxDQUFDLEdBQUcsQ0FBRSxPQUFPLEVBQUcsR0FBRyxDQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7SUFFRCxrQ0FBVyxHQUFYO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNwRCxTQUFTLENBQUUsVUFBQSxHQUFHO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBRSxVQUFVLEVBQUcsR0FBRyxDQUFFLENBQUM7WUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7SUExTUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQzVCLFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7WUFDM0IsS0FBSyxFQUFFLENBQUMsc0NBQWlCLENBQUM7U0FDN0IsQ0FBQzs7b0JBQUE7SUFxTUYsbUJBQUM7QUFBRCxDQXBNQSxBQW9NQyxJQUFBO0FBcE1ZLG9CQUFZLGVBb014QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtTdG9yYWdlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge09iamVjdFRvQXJyYXlQaXBlfSBmcm9tIFwiLi4vcGlwZXMvb2JqZWN0VG9BcnJheS5waXBlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC50ZW1wbGF0ZS5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWydhcHAuc3R5bGUuY3NzJ10sXHJcbiAgICBwcm92aWRlcnM6IFtTdG9yYWdlU2VydmljZV0sXHJcbiAgICBwaXBlczogW09iamVjdFRvQXJyYXlQaXBlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyBjcmVhdGVfcGFnZSA9IHt9O1xyXG4gICAgcHVibGljIGNoYW5nZV9wYWdlX25hbWUgPSB7fTtcclxuICAgIHB1YmxpYyBuZXdfZmllbGQgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RvcmFnZVNlcnZpY2U6IFN0b3JhZ2VTZXJ2aWNlKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCduZ09uSW5pdCcpO1xyXG4gICAgICAgIHRoaXMuZ2V0X2FsbF9wYWdlcygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRfYWxsX3BhZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2Uuc2VsZWN0KCcvYXBpL3BhZ2VzJyApLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ2dldCAtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIGlmKCAhcmVzLmVycm9yICkgdGhpcy5wYWdlcyA9IHJlcy5wYWdlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9OyBcclxuXHJcbiAgICBjcmVhdGVfcGFnZV9mdW5jKCkge1xyXG4gICAgICAgIGlmICggIXRoaXMuY3JlYXRlX3BhZ2UubmFtZSApIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVfcGFnZS5yZXNwb25zZSA9ICdubyBkYXRhIHdhcyBwcm92aWRlZCAnXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHRoaXMuY2hlY2tfaWZfcGFnZV9leGlzdCh0aGlzLmNyZWF0ZV9wYWdlLm5hbWUpICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdGhpcyBuYW1lIGV4aXN0cyAnKTtcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmluc2VydCgnL2FwaS9wYWdlcycse1xyXG4gICAgICAgICAgICBuYW1lIDogdGhpcy5jcmVhdGVfcGFnZS5uYW1lLFxyXG4gICAgICAgICAgICBib2R5IDogW11cclxuICAgICAgICAgfSkuXHJcbiAgICAgICAgICAgIHN1YnNjcmliZSggcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCAncG9zdCAtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlX3BhZ2UucmVzcG9uc2UgPSByZXMubXNnO1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhcmVzLmVycm9yICkgdGhpcy5wYWdlcyA9IHJlcy5wYWdlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNoYW5nZV9wYWdlX25hbWVfZnVuYyhpdGVtKXtcclxuICAgICAgICBjb25zb2xlLmxvZyggaXRlbSApO1xyXG4gICAgICAgIGlmICggIXRoaXMuY2hhbmdlX3BhZ2VfbmFtZVtpdGVtLl9pZF0gKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBuYW1lIHdhcyBwcm92aWRlZCAnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggdGhpcy5jaGVja19pZl9wYWdlX2V4aXN0KHRoaXMuY2hhbmdlX3BhZ2VfbmFtZVtpdGVtLl9pZF0pICl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgdGhpcyBuYW1lIGV4aXN0cyAnKTtcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnVwZGF0ZSgnL2FwaS9wYWdlcycse1xyXG4gICAgICAgICAgICBpZCA6IGl0ZW0uX2lkLFxyXG4gICAgICAgICAgICBuYW1lIDogdGhpcy5jaGFuZ2VfcGFnZV9uYW1lW2l0ZW0uX2lkXSxcclxuICAgICAgICAgICAgYm9keSA6IGl0ZW0uYm9keVxyXG4gICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3B1dCAtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIGlmICggIXJlcy5lcnJvciApIHRoaXMucGFnZXMgPSByZXMucGFnZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZV9wYWdlX2Z1bmMoaWQpIHtcclxuICAgICAgICBpZiAoICFpZCApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGlkIHdhcyBwcm92aWRlZCAnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmRlbGV0ZSgnL2FwaS9wYWdlcycsIGlkKS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdkZWxldGUgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXMuZXJyb3IgKSB0aGlzLnBhZ2VzID0gcmVzLnBhZ2VzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICBjaGVja19pZl9wYWdlX2V4aXN0KHBhZ2VfbmFtZSl7XHJcbiAgICAgICBsZXQgZXhpc3QgPSBmYWxzZTtcclxuICAgICAgIHRoaXMucGFnZXMubWFwKGl0ZW0gPT4geyBpdGVtLm5hbWUgPT09IHBhZ2VfbmFtZSA/IGV4aXN0ID0gdHJ1ZSA6IGZhbHNlIH0pO1xyXG4gICAgICAgcmV0dXJuIGV4aXN0O1xyXG4gICB9O1xyXG5cclxuICAgIHNob3dfc2luZ2xlX3BhZ2UoaXRlbSl7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVfcGFnZSA9IGl0ZW07XHJcbiAgICB9O1xyXG5cclxuICAgIGNoYW5nZV9uZXdfZmllbGRfdHlwZSgpe1xyXG4gICAgICAgIHRoaXMubmV3X2ZpZWxkLnZhbHVlID0gJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZF9uZXdfZmllbGQoICkge1xyXG4gICAgICAgIGlmKCAhdGhpcy5uZXdfZmllbGQubmFtZSB8fCB0aGlzLmNoZWNrX2lmX2ZpZWxkX2V4aXN0KHRoaXMubmV3X2ZpZWxkLm5hbWUgKSApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIHRoaXMgbmFtZSBpcyBub3QgT0sgJyk7XHJcbiAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLm5ld19maWVsZC50eXBlID09ICdudW1iZXInICkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld19maWVsZC52YWx1ZSA/IHRoaXMubmV3X2ZpZWxkLnZhbHVlID0gTnVtYmVyKHRoaXMubmV3X2ZpZWxkLnZhbHVlKSA6ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRoaXMubmV3X2ZpZWxkLnR5cGUgPT0gJ2Jvb2xlYW4nICkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld19maWVsZC52YWx1ZSA9ICEhdGhpcy5uZXdfZmllbGQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5uZXdfZmllbGQudHlwZSA9PSAnYm9vbGVhbicgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3X2ZpZWxkLnZhbHVlID0gISF0aGlzLm5ld19maWVsZC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLm5ld19maWVsZC50eXBlID09ICdvYmplY3QnICkge1xyXG4gICAgICAgICAgICB0aGlzLm5ld19maWVsZC52YWx1ZSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRoaXMubmV3X2ZpZWxkLnR5cGUgPT0gJ2FycmF5JyApIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdfZmllbGQudmFsdWUgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld19maWVsZCAgPSB0aGlzLmRlZXBDb3B5KHRoaXMubmV3X2ZpZWxkKTtcclxuICAgICAgICB0aGlzLnNpbmdsZV9wYWdlLmJvZHkgPSBbLi4udGhpcy5zaW5nbGVfcGFnZS5ib2R5LCBuZXdfZmllbGRdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3BhZ2UoKTtcclxuICAgIH07XHJcblxyXG4gICBjaGVja19pZl9maWVsZF9leGlzdChmaWVsZF9uYW1lKXtcclxuICAgICAgIGxldCBleGlzdCA9IGZhbHNlO1xyXG4gICAgICAgdGhpcy5zaW5nbGVfcGFnZS5ib2R5Lm1hcChpdGVtID0+IHsgaXRlbS5uYW1lID09IGZpZWxkX25hbWUgPyBleGlzdCA9IHRydWUgOiBmYWxzZSB9KTtcclxuICAgICAgIHJldHVybiBleGlzdDtcclxuICAgfTtcclxuXHJcbiAgIGNoYW5nZV9maWVsZF9mdW5jKGl0ZW0sIGRlZXApIHtcclxuICAgICAgIGlmICggZGVlcCApIHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyggJ2RlZXAnICk7XHJcbiAgICAgICB9XHJcbiAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2luZ2xlX3BhZ2UpO1xyXG4gICAgICAgdGhpcy5zaW5nbGVfcGFnZS5ib2R5Lm1hcChlbCA9PiB7XHJcbiAgICAgICAgICAgaWYgKCBlbC5uYW1lID09IGl0ZW0ubmFtZSApIHtcclxuICAgICAgICAgICAgICAgZWwgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcbiAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgJyx0aGlzLnNpbmdsZV9wYWdlKTtcclxuICAgfTtcclxuXHJcbiAgIGRlbGV0ZV9maWVsZF9mdW5jKCl7XHJcblxyXG4gICB9O1xyXG4gICBcclxuICAgIHVwZGF0ZV9wYWdlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZVNlcnZpY2UudXBkYXRlKCcvYXBpL3BhZ2VzJyx7XHJcbiAgICAgICAgICAgIGlkIDogdGhpcy5zaW5nbGVfcGFnZS5faWQsXHJcbiAgICAgICAgICAgIG5hbWUgOiB0aGlzLnNpbmdsZV9wYWdlLm5hbWUsXHJcbiAgICAgICAgICAgIGJvZHkgOiB0aGlzLnNpbmdsZV9wYWdlLmJvZHlcclxuICAgICAgICB9KS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdwdXQgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICBpZiggIXJlcy5lcnJvciApIHRoaXMucGFnZXMgPSByZXMucGFnZXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICAgICogUmV0dXJucyBhIGRlZXAgY29weSBvZiB0aGUgb2JqZWN0XHJcbiAgICAqL1xyXG4gICAgZGVlcENvcHkob2xkT2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3T2JqID0gb2xkT2JqO1xyXG4gICAgICAgIGlmIChvbGRPYmogJiYgdHlwZW9mIG9sZE9iaiA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBuZXdPYmogPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2xkT2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiID8gW10gOiB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBvbGRPYmopIHtcclxuICAgICAgICAgICAgICAgIG5ld09ialtpXSA9IHRoaXMuZGVlcENvcHkob2xkT2JqW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3T2JqO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgaW5zZXJ0X2Z1bmMoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS5pbnNlcnQoJy9hcGkvcGFnZXMnLHtcclxuICAgICAgICAgICAgbmFtZSA6IHRoaXMuY3JlYXRlX3BhZ2UubmFtZSxcclxuICAgICAgICAgICAgYm9keSA6IFtdXHJcbiAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICBzdWJzY3JpYmUoIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ3Bvc3QgLSAnICwgcmVzICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydCA9ICBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlX2Z1bmMoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlU2VydmljZS51cGRhdGUoJy9hcGkvcGFnZXMnLHtcclxuICAgICAgICAgICAgaWQgOiB0aGlzLnVwZGF0ZV9pZCxcclxuICAgICAgICAgICAgbmFtZSA6ICcgaGVhZGVyICcsXHJcbiAgICAgICAgICAgIGJvZHkgOiBbeyBuYW1lOiAndGVzdCcsIHR5cGU6ICdTdHJpbmcnfV1cclxuICAgICAgICB9KS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdwdXQtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gIEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVfZnVuYygpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmRlbGV0ZSgnL2FwaS9wYWdlcycsIHRoaXMuZGVsZXRlX2lkKS5cclxuICAgICAgICAgICAgc3Vic2NyaWJlKCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdkZWxldGUtICcgLCByZXMgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gIEpTT04uc3RyaW5naWZ5KHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
