import { lazy } from "react";
import { IFieldConfig, FieldType } from "components/fields/types";
import withPopoverCell from "../_withTableCell/withPopoverCell";

import SingleSelectIcon from "assets/icons/SingleSelect";
import BasicCell from "../_BasicCell/BasicCellNull";
import InlineCell from "./InlineCell";
import NullEditor from "components/Table/editors/NullEditor";

const PopoverCell = lazy(
  () =>
    import("./PopoverCell" /* webpackChunkName: "PopoverCell-SingleSelect" */)
);
const SideDrawerField = lazy(
  () =>
    import(
      "./SideDrawerField" /* webpackChunkName: "SideDrawerField-SingleSelect" */
    )
);
const Settings = lazy(
  () => import("./Settings" /* webpackChunkName: "Settings-SingleSelect" */)
);

export const config: IFieldConfig = {
  type: FieldType.singleSelect,
  name: "Single Select",
  group: "Select",
  dataType: "string | null",
  initialValue: null,
  initializable: true,
  icon: <SingleSelectIcon />,
  description:
    "Single value from predefined options. Options are searchable and users can optionally input custom values.",
  TableCell: withPopoverCell(BasicCell, InlineCell, PopoverCell, {
    anchorOrigin: { horizontal: "left", vertical: "bottom" },
    transparent: true,
  }),
  TableEditor: NullEditor as any,
  SideDrawerField,
  settings: Settings,
  requireConfiguration: true,
};
export default config;
