import React, {FC, useEffect, useState} from "react";
import _ from "lodash";
import {DesignerComponent} from "../types";
import {useFormDesigner} from "../hooks/useFormDesigner";
import {TreeNode} from "../model/TreeNode";
import {SourceItem} from "../SourceItem";
import {Col, Row} from "antd";


type ResourceWidgetProps = {
    sources?: DesignerComponent[]
}

export const ResourceWidget: FC<ResourceWidgetProps> = ({sources}) => {
    const engine = useFormDesigner()
    const [scopeSources, setScopeSources] = useState<DesignerComponent>([])

    useEffect(() => {
        const sourcesArray = _.reduce(sources, (result, source) => {
            return _.concat(result, source.Resource)
        }, []).map((item: any) => _.assign(item, {node: new TreeNode({isSourceNode: true, componentName: item.name})}))
        setScopeSources(sourcesArray)
        engine.registerSources()
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