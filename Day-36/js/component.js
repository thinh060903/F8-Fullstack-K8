class F8 {
  static components = {};

  static component(name, options) {
    F8.components[name] = options;

    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();
          this._data = options.data ? options.data() : {};
          this.attachShadow({ mode: "open" });

          this.templateEl = document.createElement("template");
          this.templateEl.innerHTML = options.template;

          this.render();
        }

        connectedCallback() {
          this.attachEvents();
        }

        render() {
          let innerHTML = this.templateEl.innerHTML;
          const matches = innerHTML.match(/{{\s*[\w.]+\s*}}/g);
          if (matches) {
            matches.forEach((match) => {
              const key = match.replace(/[{}]/g, "").trim();
              innerHTML = innerHTML.replace(match, this._data[key]);
            });
          }
          this.shadowRoot.innerHTML = innerHTML;
        }

        attachEvents() {
          this.shadowRoot.querySelectorAll("[v-on\\:click]").forEach((el) => {
            const method = el.getAttribute("v-on:click");
            if (method.includes("++")) {
              el.addEventListener("click", () => {
                this._data.count++;
                this.render();
                this.attachEvents();
              });
            } else if (method.includes("--")) {
              el.addEventListener("click", () => {
                if (this._data.count > 0) {
                  this._data.count--;
                  this.render();
                  this.attachEvents();
                }
              });
            }
          });

          this.shadowRoot
            .querySelectorAll("[v-on\\:dblclick]")
            .forEach((el) => {
              el.addEventListener("dblclick", () => {
                this._data.title = "Xin chào F8";
                this.render();
                this.attachEvents();
              });
            });
        }
      }
    );
  }
}

new F8();
