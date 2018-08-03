import { RadioSet, ResultList } from "view";
import { apiLoader } from "./apiLoader";
import "../scss/nmb.scss";
declare const NMB: {
    new (): {
        ResultList: ResultList;
        RadioSet: RadioSet;
        content: HTMLElement;
        search(): void;
        show(): void;
        hide(): void;
    };
};
export { NMB, apiLoader };
