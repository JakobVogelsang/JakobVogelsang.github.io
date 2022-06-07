var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  LitElement,
  property
} from "../../../_snowpack/pkg/lit-element.js";
import {translate} from "../../../_snowpack/pkg/lit-translate.js";
import "../../action-pane.js";
import "./d-a-type-editor.js";
import {newActionEvent, newWizardEvent} from "../../foundation.js";
import {getReferencedChild} from "./foundation.js";
import {editDAWizard} from "../../wizards/da.js";
import {editBDAWizard} from "../../wizards/bda.js";
export let DAEditor = class extends LitElement {
  header() {
    const name = this.element.getAttribute("name");
    const desc = this.element.getAttribute("desc");
    return `${name}${desc ? ` - ${desc} ` : ""}`;
  }
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {parent: this.element.parentElement, element: this.element}
    }));
  }
  openEditWizard() {
    if (this.element.tagName === "DA") {
      const wizard = editDAWizard(this.element);
      if (wizard)
        this.dispatchEvent(newWizardEvent(() => editDAWizard(this.element)));
    }
    if (this.element.tagName === "BDA") {
      const wizard = editBDAWizard(this.element);
      if (wizard)
        this.dispatchEvent(newWizardEvent(() => editBDAWizard(this.element)));
    }
  }
  render() {
    return html` <action-pane label="${this.header()}">
      <abbr slot="action" title="${translate("remove")}">
        <mwc-icon-button icon="delete" @click=${this.remove}></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate("edit")}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${getReferencedChild(this.element) ? html`<d-a-type-editor
            class="child"
            .dAoRbDA=${this.element}
            .dAType=${getReferencedChild(this.element)}
          ></d-a-type-editor>` : html``}
    </action-pane>`;
  }
};
DAEditor.styles = css`
    action-pane:focus-within .child {
      display: block;
    }

    .child {
      display: none;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property({attribute: false})
], DAEditor.prototype, "element", 2);
DAEditor = __decorate([
  customElement("d-a-editor")
], DAEditor);
