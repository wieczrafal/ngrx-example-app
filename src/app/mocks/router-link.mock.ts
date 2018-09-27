import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[routerLink]'
})
export class RouterLinkMockDirective {
    @Input() routerLink;
}