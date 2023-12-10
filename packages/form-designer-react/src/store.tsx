import {observable} from "@formily/reactive";
import {JSX} from "react";
import {TreeNode} from "./model";
import _ from "lodash";
import {IResource, TdFC} from "./types";

const DESIGNER_ICONS_STORE: { value: Record<string, JSX.Element> } = observable.ref({})
const DESIGNER_RESOURCES_STORE: { value: Record<string, IResource> } = observable.ref({})

export namespace GlobalStore {
    //region store
    export function registerIcons(icons: Record<string, JSX.Element>) {
        Object.assign(DESIGNER_ICONS_STORE, icons)
    }

    export function getIcon(iconName: string) {
        return DESIGNER_ICONS_STORE[iconName]
    }

    //endregion

    export function registerDesignerResources(components: Record<string, TdFC<any>>) {
        // const resources  = _.reduce(components, (result, component, ) => {
        //     result[key] = component
        //     return result
        // }, {})
        // Object.assign(DESIGNER_RESOURCES_STORE, components)

        const componentArr = _.values(components)
        console.log("Store componentArr", componentArr)
        const resources = _.reduce(componentArr, (result: any, item: TdFC<any>) => {
            return _.concat(result, item.Resource)
        }, [])
        const resourcesMap = _.reduce(resources, (result: any, item: any) => {
            return _.assign(result, {
                [_.get(item, 'schema.x-component')]: item
            })
        }, {})

        console.log("Store ", resourcesMap)
        _.assign(DESIGNER_RESOURCES_STORE, resourcesMap)
        console.log("Store DESIGNER_RESOURCES_STORE.value", DESIGNER_RESOURCES_STORE)
    }

    export function getDesignerResource(componentName: string) {
        debugger
        return DESIGNER_RESOURCES_STORE[componentName]
    }

    export function getDesignerResourceByNode(node: TreeNode) {
        const componentName = _.get(node.schema, 'x-component', node.componentName)
        return getDesignerResource(componentName)
    }

}