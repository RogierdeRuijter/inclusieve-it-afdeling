export class JourneyCollapsable extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.appendChild(document.createElement("slot"));

    const overlay = document.createElement("div");
    const button = document.createElement("button");
    button.innerHTML =
      '<svg width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>';

    const style = document.createElement("style");
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

            :host([open]) > button > svg {
                transition: transform 1s ease-out;
                transform: rotate(180deg);
            }
        `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("button")?.addEventListener("click", (e) => {
      if (this.getAttribute("open") !== "") {
        this.setAttribute("open", "");
      } else {
        this.removeAttribute("open");
      }
    });
  }
}

customElements.define("journey-collapsable", JourneyCollapsable);
