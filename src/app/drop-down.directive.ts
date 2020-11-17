import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropDown]'
})
export class DropDownDirective {

    constructor() { }

    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toogleOpen() {
        this.isOpen = !this.isOpen;
    }

}
