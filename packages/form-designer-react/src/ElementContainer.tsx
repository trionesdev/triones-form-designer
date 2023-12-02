import React, {FC} from "react"
import styled from "@emotion/styled";

type ElementContainerProps = {
    children?: React.ReactNode
}

const ElementContainerStyled = styled('div')({})

export const ElementContainer: FC<ElementContainerProps> = ({
                                                                children
                                                            }) => {
    return <ElementContainerStyled>{children}</ElementContainerStyled>
}