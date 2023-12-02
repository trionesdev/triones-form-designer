import React, {FC, useEffect, useState} from "react";
import {DesignerComponent, IDesignerProps} from "./types";
import _ from "lodash";
import {SourceItem} from "./SourceItem";
import {Col, Row} from "antd";

type ResourceWidgetProps = {
    sources?: DesignerComponent[]
}

export const ResourceWidget: FC<ResourceWidgetProps> = ({sources}) => {
    const [scopeSources, setScopeSources] = useState<IDesignerProps>([])

    useEffect(() => {
        const sourcesArray = _.reduce(sources, (result, source) => {
            debugger
            return _.concat(result, source.DesignerProps)
        }, [])
        setScopeSources(sourcesArray)
    }, [sources]);

    const ss = _.reduce(sources, (result, source) => {
        debugger
        return _.concat(result, source.DesignerProps)
    }, [])

    console.log(ss)

    return <div>
        <Row gutter={[4,4]}>
            {
                scopeSources.map((source: any) => <Col span={12}>{React.createElement(SourceItem,{"source":source,"dd":"fff"})}</Col>)
            }
        </Row>

    </div>
}