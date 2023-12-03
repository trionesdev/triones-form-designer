import React, {FC, useEffect, useState} from "react";
import {DesignerComponent, IResource} from "./types";
import _ from "lodash";
import {SourceItem} from "./SourceItem";
import {Col, Row} from "antd";
import {useFormDesigner} from "./hooks/useFormDesigner";

type ResourceWidgetProps = {
    sources?: DesignerComponent[]
}

export const ResourceWidget: FC<ResourceWidgetProps> = ({sources}) => {
    const {registerSources} = useFormDesigner()
    const [scopeSources, setScopeSources] = useState<IResource>([])

    useEffect(() => {
        const sourcesArray = _.reduce(sources, (result, source) => {
            debugger
            return _.concat(result, source.Resource)
        }, [])
        setScopeSources(sourcesArray)
        registerSources(sourcesArray)
    }, [sources]);

    return <div>
        <Row gutter={[4,4]}>
            {
                scopeSources.map((source: any) => <Col span={12}>{React.createElement(SourceItem,{"source":source,"dd":"fff"})}</Col>)
            }
        </Row>

    </div>
}