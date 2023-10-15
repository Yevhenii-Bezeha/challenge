import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StyleLoaderService {
    private renderer: Renderer2;

    constructor(
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    load(name: string): void {
        const lStyle: HTMLLinkElement = this.renderer.createElement('link');

        this.renderer.setAttribute(lStyle, 'rel', 'stylesheet');
        this.renderer.setAttribute(lStyle, 'type', 'text/css');
        this.renderer.setAttribute(lStyle, 'href', `${name}`);
        this.renderer.appendChild(document.head, lStyle);
    }
}
