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
import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  newWizardEvent
} from "../../foundation.js";
import {editDaTypeWizard} from "../templates/datype-wizards.js";
export let DATypeEditor = class extends LitElement {
  header() {
    const id = this.dAType.getAttribute("id");
    const desc = this.dAType.getAttribute("desc");
    return `${id} ${desc ? `- ${desc} ` : ""}`;
  }
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {parent: this.dAType.parentElement, element: this.dAType}
    }));
  }
  openEditWizard() {
    const wizard = editDaTypeWizard(identity(this.dAType), this.dAType.ownerDocument);
    if (wizard)
      this.dispatchEvent(newWizardEvent(() => editDaTypeWizard(identity(this.dAType), this.dAType.ownerDocument)));
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
      ${getChildElementsByTagName(this.dAType, "BDA").map((bDA) => html`<d-a-editor class="child" .element=${bDA}></d-a-editor>`)}
    </action-pane>`;
  }
};
DATypeEditor.styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property({attribute: false})
], DATypeEditor.prototype, "dAType", 2);
__decorate([
  property({attribute: false})
], DATypeEditor.prototype, "dAoRbDA", 2);
DATypeEditor = __decorate([
  customElement("d-a-type-editor")
], DATypeEditor);
