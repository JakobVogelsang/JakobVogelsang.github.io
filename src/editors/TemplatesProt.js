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
  html,
  LitElement,
  property,
  query,
  state
} from "../../_snowpack/pkg/lit-element.js";
import "../../_snowpack/pkg/@material/mwc-fab.js";
import "../../_snowpack/pkg/@material/mwc-select.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "./templates2/l-node-type-editor.js";
import "./templates2/d-o-type-editor.js";
import {
  createElement,
  identity,
  newActionEvent,
  newWizardEvent,
  selector
} from "../foundation.js";
import {classMap} from "../../_snowpack/pkg/lit-html/directives/class-map.js";
import {
  compareNames,
  compareSelection,
  styles
} from "./templates2/foundation.js";
import {render} from "../../_snowpack/pkg/lit-html.js";
import {translate} from "../../_snowpack/pkg/lit-translate.js";
import {createLNodeTypeWizard} from "./templates/lnodetype-wizard.js";
import {createDOTypeWizard} from "./templates/dotype-wizards.js";
import {createDATypeWizard} from "./templates/datype-wizards.js";
const templates = fetch("public/xml/templates.scd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
const nsd74 = fetch("public/xml/IEC_61850-7-4_2007B3.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
const nsd7420 = fetch("public/xml/IEC_61850-7-420_2019A4.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
export default class TemplateProt extends LitElement {
  constructor() {
    super(...arguments);
    this.selectedLNodeTypes = [];
    this.selectedDOTypes = [];
    this.selectedDATypes = [];
    this.hideLNodeTypeList = true;
    this.hideDOTypeList = true;
    this.hideDATypeList = true;
  }
  get lNodeTypes() {
    return Array.from(this.doc.querySelectorAll("LNodeType"));
  }
  get dOTypes() {
    return Array.from(this.doc.querySelectorAll("DOType"));
  }
  get dATypes() {
    return Array.from(this.doc.querySelectorAll("DAType"));
  }
  async openCreateDATypeWizard() {
    this.createDataTypeTemplates();
    this.dispatchEvent(newWizardEvent(createDATypeWizard(this.doc.querySelector(":root > DataTypeTemplates"), await templates)));
  }
  async openCreateDOTypeWizard() {
    this.createDataTypeTemplates();
    this.dispatchEvent(newWizardEvent(createDOTypeWizard(this.doc.querySelector(":root > DataTypeTemplates"), await templates)));
  }
  async openCreateLNodeTypeWizard() {
    this.createDataTypeTemplates();
    this.dispatchEvent(newWizardEvent(createLNodeTypeWizard(this.doc.querySelector(":root > DataTypeTemplates"), await templates, await nsd74, await nsd7420)));
  }
  createDataTypeTemplates() {
    if (!this.doc.querySelector(":root > DataTypeTemplates"))
      this.dispatchEvent(newActionEvent({
        new: {
          parent: this.doc.documentElement,
          element: createElement(this.doc, "DataTypeTemplates", {})
        }
      }));
  }
  selectDAType(evt) {
    const selectedDATypes = evt.target.selected.map((item) => this.doc.querySelector(selector("DAType", item.value))).filter((datype) => datype);
    this.selectedDATypes = selectedDATypes;
  }
  selectLNodeType(evt) {
    const selectedLNodeTypes = evt.target.selected.map((item) => this.doc.querySelector(selector("LNodeType", item.value))).filter((lNodeType) => lNodeType);
    this.selectedLNodeTypes = selectedLNodeTypes;
  }
  selectDOType(evt) {
    const selectedDOTypes = evt.target.selected.map((item) => this.doc.querySelector(selector("DOType", item.value))).filter((lNodeType) => lNodeType);
    this.selectedDOTypes = selectedDOTypes;
  }
  toggleDATypeList() {
    this.hideDATypeList = !this.hideDATypeList;
    const sortedItems = this.dATypeList.items.sort(compareNames).sort(compareSelection);
    render(html`${sortedItems}`, this.dATypeList);
  }
  toggleDOTypeList() {
    this.hideDOTypeList = !this.hideDOTypeList;
    const sortedItems = this.dOTypeList.items.sort(compareNames).sort(compareSelection);
    render(html`${sortedItems}`, this.dOTypeList);
  }
  toggleLNodeTypeList() {
    this.hideLNodeTypeList = !this.hideLNodeTypeList;
    const sortedItems = this.lNodeTypeList.items.sort(compareNames).sort(compareSelection);
    render(html`${sortedItems}`, this.lNodeTypeList);
  }
  renderDAMenuEntry(dAType) {
    return html`<mwc-list-item value="${identity(dAType)}"
      >${dAType.getAttribute("id")}</mwc-list-item
    >`;
  }
  renderDOMenuEntry(dOType) {
    return html`<mwc-list-item value="${identity(dOType)}"
      >${dOType.getAttribute("cdc") + ": " + dOType.getAttribute("id")}</mwc-list-item
    >`;
  }
  renderLNodeMenuEntry(lNodeType) {
    return html`<mwc-list-item value="${identity(lNodeType)}"
      >${lNodeType.getAttribute("lnClass") + ": " + lNodeType.getAttribute("id")}</mwc-list-item
    >`;
  }
  renderDAMenu() {
    return html`<mwc-icon-button
        class="datype"
        icon="edit_attributes"
        @click=${this.toggleDATypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
      typelistcontainer: true,
      hidden: this.hideDATypeList
    })}"
      >
        <h1>
          ${translate("scl.DAType")}
          <nav>
            <abbr title="${translate("add")}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateDATypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="datype"
          activatable
          multi
          id="menu"
          @selected=${this.selectDAType}
        >
          ${this.dATypes.map(this.renderDAMenuEntry)}
        </filtered-list>
      </div>`;
  }
  renderDOMenu() {
    return html`<mwc-icon-button
        class="dotype"
        icon="data_object"
        @click=${this.toggleDOTypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
      typelistcontainer: true,
      hidden: this.hideDOTypeList
    })}"
      >
        <h1>
          ${translate("scl.DOType")}
          <nav>
            <abbr title="${translate("add")}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateDOTypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="dotype"
          activatable
          multi
          id="menu"
          @selected=${this.selectDOType}
        >
          ${this.dOTypes.map(this.renderDOMenuEntry)}
        </filtered-list>
      </div>`;
  }
  renderLNodeMenu() {
    return html`<mwc-icon-button
        class="lnodetype"
        icon="smart_button"
        @click=${this.toggleLNodeTypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
      typelistcontainer: true,
      hidden: this.hideLNodeTypeList
    })}"
      >
        <h1>
          ${translate("scl.LNodeType")}
          <nav>
            <abbr title="${translate("add")}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateLNodeTypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="lnodetype"
          activatable
          multi
          id="menu"
          @selected=${this.selectLNodeType}
        >
          ${this.lNodeTypes.map(this.renderLNodeMenuEntry)}
        </filtered-list>
      </div>`;
  }
  render() {
    return html`${this.renderLNodeMenu()}${this.renderDOMenu()}${this.renderDAMenu()}
      <section>
        ${this.selectedLNodeTypes.map((selectedLNodeType) => html`<l-node-type-editor
            .element=${selectedLNodeType}
          ></l-node-type-editor>`)}
        ${this.selectedDOTypes.map((selectedDOType) => html`<d-o-type-editor
            .dOType=${selectedDOType}
          ></d-o-type-editor>`)}
        ${this.selectedDATypes.map((selectedDAType) => html`<d-a-type-editor
            .dAType=${selectedDAType}
          ></d-a-type-editor>`)}
      </section>`;
  }
}
TemplateProt.styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }

    mwc-icon-button {
      padding: 8px;
    }

    div.typelistcontainer {
      position: fixed;
      top: 175px;
      bottom: 60px;
      left: 20px;
      max-width: calc(100% - 40px);
      background-color: var(--mdc-theme-surface);
      overflow-y: auto;
      z-index: 5;
    }

    .hidden {
      display: none;
    }

    section {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      section {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
__decorate([
  property()
], TemplateProt.prototype, "doc", 2);
__decorate([
  state()
], TemplateProt.prototype, "selectedLNodeTypes", 2);
__decorate([
  state()
], TemplateProt.prototype, "selectedDOTypes", 2);
__decorate([
  state()
], TemplateProt.prototype, "selectedDATypes", 2);
__decorate([
  state()
], TemplateProt.prototype, "hideLNodeTypeList", 2);
__decorate([
  state()
], TemplateProt.prototype, "hideDOTypeList", 2);
__decorate([
  state()
], TemplateProt.prototype, "hideDATypeList", 2);
__decorate([
  query("filtered-list.lnodetype")
], TemplateProt.prototype, "lNodeTypeList", 2);
__decorate([
  query("filtered-list.dotype")
], TemplateProt.prototype, "dOTypeList", 2);
__decorate([
  query("filtered-list.datype")
], TemplateProt.prototype, "dATypeList", 2);
