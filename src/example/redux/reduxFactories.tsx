import { useSelector } from "react-redux";

import { StateFactory } from "../../factories/ComponentFactory";
import { stringShell, stringInputShell, booleanInputShell } from "../shells";

export const reduxFactory = new StateFactory(useSelector);

export const stringViewFactory = reduxFactory.createViewFactory(stringShell);
export const editStringViewFactory = reduxFactory.createViewFactory(stringInputShell);
export const editBooleanViewFactory = reduxFactory.createViewFactory(booleanInputShell);
