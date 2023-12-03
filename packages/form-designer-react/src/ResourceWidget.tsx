import React, {FC, useEffect, useState} from "react";
import {DesignerComponent} from "./types";
import _ from "lodash";
import {SourceItem} from "./SourceItem";
import {Col, Row} from "antd";
import {useFormDesigner} from "./hooks/useFormDesigner";
import {TreeNode} from "./TreeNode";

type ResourceWidgetProps = {
    sources?: DesignerComponent[]
}

export const ResourceWidget: FC<ResourceWidgetProps> = ({sources}) => {
    const {registerSources} = useFormDesigner()
    const [scopeSources, setScopeSources] = useState<DesignerComponent>([])

    useEffect(() => {
        const sourcesArray = _.reduce(sources, (result, source) => {
            return _.concat(result, source.Resource)
        }, []).map((item: any) => _.assign(item, {node: new TreeNode({isSourceNode: true, componentName: item.name})}))
        setScopeSources(sourcesArray)
        registerSources(sourcesArray)
    }, [sources]);

    return <div>
        <Row gutter={[4, 4]}>
            {
                scopeSources.map((source: any) => <Col span={12}>{React.createElement(SourceItem, {
                    "source": source
                })}</Col>)
            }
        </Row>

    </div>
}