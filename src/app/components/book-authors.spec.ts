import {
    Component,
    DebugElement,
    ViewChild
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Book } from '../models/book';
import { PipesModule } from '../pipes';
import { BookAuthorsComponent } from './book-authors';

@Component({
    template: `<bc-book-authors #component [book]="book"></bc-book-authors>`,
})
class HostComponent {
    @ViewChild('component') public component: BookAuthorsComponent;
    public book: Book;
}

describe('BookAuthorsComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: BookAuthorsComponent;
    let debugElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                PipesModule
            ],
            declarations: [
                BookAuthorsComponent,
                HostComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        component = host.component;
        debugElement = fixture.debugElement;
        host.book = <Book>{
            id: '1',
            volumeInfo: { }
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display names of authors', () => {
        let text: HTMLElement;
        host.book = <Book>{
            id: '1',
            volumeInfo: {
                authors: ['aaa']
            }
        };
        fixture.detectChanges();
        text = debugElement.query(By.css('span')).nativeElement;

        expect(text.innerText).toEqual('aaa');

        host.book = <Book>{
            id: '1',
            volumeInfo: {
                authors: ['aaa', 'bbb']
            }
        };
        fixture.detectChanges();
        text = debugElement.query(By.css('span')).nativeElement;

        expect(text.innerText).toEqual('aaa and bbb');

        host.book = <Book>{
            id: '1',
            volumeInfo: {
                authors: ['aaa', 'bbb', 'ccc']
            }
        };
        fixture.detectChanges();
        text = debugElement.query(By.css('span')).nativeElement;

        expect(text.innerText).toEqual('aaa, bbb, and ccc');
    });
});
