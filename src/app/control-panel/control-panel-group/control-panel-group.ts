import { ControlPanelButton } from "./control-panel-button/control-panel-button";

export interface ControlPanelGroup {
  name: string;
  buttons: ControlPanelButton[];
}
