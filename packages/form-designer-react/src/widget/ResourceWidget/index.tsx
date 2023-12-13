import React, {FC} from "react";
import _ from "lodash";
import styled from "@emotion/styled";
import {DesignerComponent} from "../../types";
import {SourceWidget} from "./SourceWidget";
import {Row, Col} from "../Row";


const ResourceWidgetStyled = styled('div')({
    '.td-resource-content': {
        padding: '4px',
        '&-inner': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 50%)',
            gap: '4px',

        }
    }
})

type ResourceWidgetProps = {
    sources?: DesignerComponent[]
}

export const ResourceWidget: FC<ResourceWidgetProps> = ({sources}) => {

    const scopeSources = _.reduce(sources, (result: any, source: any) => {
        return _.concat(result, source.Resource)
    }, [])

    return <ResourceWidgetStyled>
        <div className={`td-resource-content`}>
            <Row gutter={[8, 8]}>
                {
                    scopeSources.map((source: any) => <Col span={12}><SourceWidget source={source}/></Col>)
                }
            </Row>
        </div>
    </ResourceWidgetStyled>
}