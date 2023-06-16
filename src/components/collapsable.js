export class JourneyCollapsable extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.appendChild(document.createElement('slot'));

        const overlay = document.createElement('div');
        const button = document.createElement('button');
        button.innerHTML = "open";

        const style = document.createElement('style');
        shadowRoot.append(container, overlay, button, style);

        style.textContent = `
            :host {
                display: grid;
                grid-template-rows: 4lh;
            }

            :host > * { 
                grid-column: 1;
            }

            :host > div:first-of-type { 
                overflow: hidden;
            }

            :host > button {
                width: min-content;
                justify-self: center;
            }
            
            :host > div:nth-of-type(2) {
                grid-row: 2;
                background-color: var(--surface-1);
                contain: strict;
                height: 100%;
                align-self: end;
            }

            :host([open]) > div:first-of-type { 
                grid-row: 1/3;
            }
            :host([open]) > div:nth-of-type(2) {
                transition: all 300ms ease-out;
                height: 0%;
                opacity: 0;
            }
        `;

    }

    connectedCallback() {
      this.shadowRoot.querySelector("button")
        ?.addEventListener("click", (e) => {
            this.setAttribute("open", "");
        });
    }
}

customElements.define("journey-collapsable", JourneyCollapsable);