import React from "react";
import { INavigation } from "./useNavigation";
import { IUtils } from "./utils";

export interface IAppContext {
    navigation?: INavigation;
    utils?: IUtils;
}

const AppContext = React.createContext<IAppContext>({});

export default AppContext;