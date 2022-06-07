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
import "./d-a-editor.js";
import "./d-o-editor.js";
import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent
} from "../../foundation.js";
import {dOTypeWizard} from "../templates/dotype-wizards.js";
export let DOTypeEditor = class extends LitElement {
  header() {
    const id = this.dOType?.getAttribute("id");
    const desc = this.dOType?.getAttribute("desc");
    const cdc = this.dOType?.getAttribute("cdc");
    return `${cdc} ${id} ${desc ? `- ${desc} ` : ""}`;
  }
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {parent: this.dOType.parentElement, element: this.dOType}
    }));
  }
  openEditWizard() {
    const wizard = dOTypeWizard(identity(this.dOType), this.dOType.ownerDocument);
    if (wizard)
      this.dispatchEvent(newWizardEvent(() => dOTypeWizard(identity(this.dOType), this.dOType.ownerDocument)));
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
      ${getChildElementsByTagName(this.dOType, "SDO").map((sDO) => html`<d-o-editor .dOoRsDO=${sDO}></d-o-editor>`)}
      ${getChildElementsByTagName(this.dOType, "DA").map((dA) => html`<d-a-editor .element=${dA}></d-a-editor>`)}
    </action-pane>`;
  }
};
DOTypeEditor.styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property({attribute: false})
], DOTypeEditor.prototype, "dOType", 2);
__decorate([
  property({attribute: false})
], DOTypeEditor.prototype, "dOoRsDO", 2);
DOTypeEditor = __decorate([
  customElement("d-o-type-editor")
], DOTypeEditor);
