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
import {identity, newActionEvent, newWizardEvent} from "../../foundation.js";
import {sDOWizard} from "../templates/dotype-wizards.js";
import {dOWizard} from "../templates/lnodetype-wizard.js";
import {getReferencedChild} from "./foundation.js";
export let DOEditor = class extends LitElement {
  header() {
    const name = this.dOoRsDO.getAttribute("name");
    const desc = this.dOoRsDO.getAttribute("desc");
    return `${name}${desc ? ` - ${desc} ` : ""}`;
  }
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {parent: this.dOoRsDO.parentElement, element: this.dOoRsDO}
    }));
  }
  openEditWizard() {
    if (!this.dOoRsDO)
      return;
    if (this.dOoRsDO.tagName === "DO") {
      const wizard = dOWizard({
        identity: identity(this.dOoRsDO),
        doc: this.dOoRsDO.ownerDocument
      });
      if (wizard)
        this.dispatchEvent(newWizardEvent(() => dOWizard({
          identity: identity(this.dOoRsDO),
          doc: this.dOoRsDO.ownerDocument
        })));
    }
    if (this.dOoRsDO.tagName === "SDO") {
      const wizard = sDOWizard({
        identity: identity(this.dOoRsDO),
        doc: this.dOoRsDO.ownerDocument
      });
      if (wizard)
        this.dispatchEvent(newWizardEvent(() => sDOWizard({
          identity: identity(this.dOoRsDO),
          doc: this.dOoRsDO.ownerDocument
        })));
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
      ${getReferencedChild(this.dOoRsDO) ? html`<d-o-type-editor
            class="child"
            .dOoRsDO=${this.dOoRsDO}
            .dOType=${getReferencedChild(this.dOoRsDO)}
          ></d-o-type-editor>` : html``}
    </action-pane>`;
  }
};
DOEditor.styles = css`
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
], DOEditor.prototype, "dOoRsDO", 2);
DOEditor = __decorate([
  customElement("d-o-editor")
], DOEditor);
