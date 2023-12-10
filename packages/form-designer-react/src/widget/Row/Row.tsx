import React, {FC} from "react";
import styled from "@emotion/styled";
import _ from "lodash";

const RowStyled = styled.div`
    display: flex;
    flex-flow: row wrap;
    min-width: 0;
`

type RowProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    gutter?: number | number[]
}

export const Row: FC<RowProps> = ({
                                      children,
                                      className,
                                      style,
                                      gutter
                                  }) => {
    let rowGap: number = 0;
    let columnGap: number = 0;
    if (_.isArray(gutter)) {
        columnGap = gutter[0]
        rowGap = gutter[1]
    } else if (typeof gutter === "number") {
        rowGap = gutter
        rowGap = gutter
    }

    const handleRender = (children: React.ReactNode) => {
        const childArray = React.Children.toArray(children);
        return childArray.map((child: React.ReactElement) => {
            console.log(child)
            console.log("Row", _.merge({}, child.props, {
                style: {
                    background: "white",
                    ...child.props.style,
                    paddingLeft: columnGap, paddingRight: columnGap
                }, ...child.props
            }))
            return React.cloneElement(child, _.merge({}, child.props, {
                style: {
                    background: "white",
                    ...child.props.style,
                    paddingLeft: columnGap, paddingRight: columnGap
                }, ...child.props
            }))
        })
    }

    return <RowStyled className={className} style={{rowGap, ...style}}>{handleRender(children)}</RowStyled>
}