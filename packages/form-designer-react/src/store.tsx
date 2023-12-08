import {observable} from "@formily/reactive";
import {JSX} from "react";

const ICONS_STORE: { value: Record<string, JSX.Element> } = observable.ref({})

export namespace GlobalStore {
    export function registerIcons(icons: Record<string, JSX.Element>) {
        Object.assign(ICONS_STORE, icons)
    }

    export function getIcon(iconName: string) {
        return ICONS_STORE[iconName]
    }
}