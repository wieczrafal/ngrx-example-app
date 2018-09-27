import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
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
import { RouterLinkMockDirective } from './../mocks/router-link.mock';
import { BookPreviewComponent } from './book-preview';

@Component({
    template: `<bc-book-preview #component [book]="book"></bc-book-preview>`,
})
class HostComponent {
    @ViewChild('component') public component: BookPreviewComponent;
    public book: Book;
}

describe('BookPreviewComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let component: BookPreviewComponent;
    let debugElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                PipesModule
            ],
            declarations: [
                BookPreviewComponent,
                HostComponent,
                RouterLinkMockDirective
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
            volumeInfo: {
                title: 'test'
            }
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('default state', () => {
        it('should display correct text', () => {
            const title = debugElement.query(By.css('md-card-title-group md-card-title')).nativeElement;

            expect(title.innerText).toEqual(host.book.volumeInfo.title);
        });

        it('should remove elements that would display no data', () => {
            expect(debugElement.query(By.css('md-card-title-group md-card-subtitle'))).toBeNull();
            expect(debugElement.query(By.css('md-card-title-group > img'))).toBeNull();
            expect(debugElement.query(By.css('md-card-content > p'))).toBeNull();
        });
    });

    describe('with all the info', () => {
        it('should display correct text', () => {
            let title: HTMLElement;
            let subtitle: HTMLElement;
            let description: HTMLElement;
            let thumb: HTMLImageElement;
            host.book = <Book>{
                id: '1',
                volumeInfo: {
                    title: 'test',
                    subtitle: 'subtest',
                    description: 'desc',
                    imageLinks: {
                        smallThumbnail: 'thumb'
                    }
                }
            };
            fixture.detectChanges();

            title = debugElement.query(By.css('md-card-title-group md-card-title')).nativeElement;
            subtitle = debugElement.query(By.css('md-card-title-group md-card-subtitle')).nativeElement;
            description = debugElement.query(By.css('md-card-content > p')).nativeElement;
            thumb = debugElement.query(By.css('md-card-title-group > img')).nativeElement;

            expect(title.innerText).toEqual(host.book.volumeInfo.title);
            expect(subtitle.innerText).toEqual(host.book.volumeInfo.subtitle);
            expect(description.innerText).toEqual(host.book.volumeInfo.description);
            expect(thumb.getAttribute('src')).toEqual(host.book.volumeInfo.imageLinks.smallThumbnail);
        });
    });
});
