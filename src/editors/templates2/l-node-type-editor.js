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
import "./d-o-type-editor.js";
import "./d-o-editor.js";
import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent
} from "../../foundation.js";
import {lNodeTypeWizard} from "../templates/lnodetype-wizard.js";
export let LNodeTypeEditor = class extends LitElement {
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {parent: this.element.parentElement, element: this.element}
    }));
  }
  openEditWizard() {
    const wizard = lNodeTypeWizard(identity(this.element), this.element.ownerDocument);
    if (wizard)
      this.dispatchEvent(newWizardEvent(() => lNodeTypeWizard(identity(this.element), this.element.ownerDocument)));
  }
  header() {
    const id = this.element.getAttribute("id");
    const desc = this.element.getAttribute("desc");
    const lnClass = this.element.getAttribute("lnClass");
    return `${lnClass} ${desc ? `- ${desc} ` : ""}(${id})`;
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
      ${getChildElementsByTagName(this.element, "DO").map((dO) => html`<d-o-editor .dOoRsDO=${dO}></d-o-editor>`)}
    </action-pane>`;
  }
};
LNodeTypeEditor.styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property({attribute: false})
], LNodeTypeEditor.prototype, "element", 2);
LNodeTypeEditor = __decorate([
  customElement("l-node-type-editor")
], LNodeTypeEditor);
