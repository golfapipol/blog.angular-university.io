
import {Component} from '@angular/core';
import {bootstrap} from "@angular/platform-browser-dynamic";
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {SearchBox} from "./search_box";
import {SearchBoxValueAccessor} from "./search_box_value_accessor";

@Component({
    selector: 'app',
    directives: [SearchBox, SearchBoxValueAccessor],
    template: `<form [ngFormModel]="form">

                    <input ngControl="username" [(ngModel)]="username"  placeholder="Username" required>
                    <input ngControl="firstName"  placeholder="First Name">
                    <input [ngFormControl]="lastName" placeholder="Last Name">

                    <search-box [label]='"Search 1"' [(ngModel)]="search"></search-box>
                    <search-box [label]='"Search 2"' ngControl="search" [(ngModel)]="search"></search-box>
                    <search-box [label]='"Search 3"' [ngFormControl]="anotherSearch"></search-box>
       
                    <button (click)="onGo()">Go</button>
        
                </form>
                `
})
export class App {

    form: ControlGroup;

    username:string;
    search:string;

    lastName = new Control("", Validators.required);

    anotherSearch = new Control("",Validators.required);

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            username: ["", Validators.required],
            firstName: ["", Validators.required],
            lastName: this.lastName,
            search: ["", Validators.required],
            anotherSearch: this.anotherSearch
        });

        this.form.valueChanges.subscribe((value) => console.log(value));
    }

    onGo() {
        console.log(this.username + " / " + this.search + " / " + this.anotherSearch.value);
    }

    

}

bootstrap(App, []);