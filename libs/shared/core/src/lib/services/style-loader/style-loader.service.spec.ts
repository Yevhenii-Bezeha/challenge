import { Renderer2, RendererFactory2 } from '@angular/core'; // Import Renderer2 and RendererFactory2
import { TestBed } from '@angular/core/testing';

import { StyleLoaderService } from './style-loader.service';

describe('StyleLoaderService', () => {
    let service: StyleLoaderService;
    let rendererFactoryMock: jest.Mocked<RendererFactory2>; // Create a mock RendererFactory2
    let rendererMock: jest.Mocked<Renderer2>; // Create a mock Renderer2

    beforeEach(() => {
        rendererMock = {
            createElement: jest.fn().mockReturnValue(document.createElement('link')),
            setAttribute: jest.fn(),
            appendChild: jest.fn()
        } as unknown as jest.Mocked<Renderer2>;

        rendererFactoryMock = {
            createRenderer: jest.fn().mockReturnValue(rendererMock) // Set up the mock RendererFactory2 to return the mock Renderer2
        } as unknown as jest.Mocked<RendererFactory2>;

        TestBed.configureTestingModule({
            providers: [
                StyleLoaderService,
                { provide: RendererFactory2, useValue: rendererFactoryMock } // Provide the mock RendererFactory2
            ]
        });

        service = TestBed.inject(StyleLoaderService);
    });

    it('should append style file to DOM', () => {
        const styleName = 'styles.css';

        service.load(styleName);

        expect(rendererFactoryMock.createRenderer).toHaveBeenCalledWith(null, null);
        expect(rendererMock.createElement).toHaveBeenCalledWith('link');
        expect(rendererMock.setAttribute).toHaveBeenCalledWith(expect.any(HTMLLinkElement), 'rel', 'stylesheet');
        expect(rendererMock.setAttribute).toHaveBeenCalledWith(expect.any(HTMLLinkElement), 'type', 'text/css');
        expect(rendererMock.appendChild).toHaveBeenCalledWith(document.head, expect.any(HTMLLinkElement));
    });
});
