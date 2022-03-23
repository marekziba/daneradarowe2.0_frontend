export class DOMElementFactory {
    public static create(tag: string, attributes?: {[key: string]: string}, content?: string): HTMLElement {
        let element = document.createElement(tag);

        if(attributes){
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key, value);
            }
        }

        if(content){
            element.textContent = content;
        }

        return element;
    }
}