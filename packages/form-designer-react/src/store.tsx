import {observable} from "@formily/reactive";
import {JSX} from "react";
import {TreeNode} from "./model";
import _ from "lodash";

const DESIGNER_ICONS_STORE: { value: Record<string, JSX.Element> } = observable.ref({})
const DESIGNER_RESOURCES_STORE: { value: Record<string, JSX.Element> } = observable.ref({})

export namespace GlobalStore {
    //region store
    export function registerIcons(icons: Record<string, JSX.Element>) {
        Object.assign(DESIGNER_ICONS_STORE, icons)
    }

    export function getIcon(iconName: string) {
        return DESIGNER_ICONS_STORE[iconName]
    }

    //endregion

    export function registerDesignerResources(components: Record<string, JSX.Element>) {
        Object.assign(DESIGNER_RESOURCES_STORE, components)
    }

    export function getDesignerResource(componentName: string) {
        return DESIGNER_RESOURCES_STORE[componentName]
    }

    export function getDesignerResourceByNode(node: TreeNode) {
        const componentName = _.get(node.schema, 'x-component', node.componentName)
        return DESIGNER_RESOURCES_STORE[componentName]
    }

}