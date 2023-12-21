import React from 'react';
import './App.css';
import {
    ComponentsWidget,
    CompositePanel,
    FormDesigner,
    GlobalStore,
    ResourceWidget,
    StudioPanel,
    ViewPanel,
    ViewportPanel,
    WorkspacePanel
} from "@trionesdev/form-designer-react";
import {Form, Input, Password, Select} from "./components";
import {AntdSettingsPanel} from "./AntdSettingsPanel";
import * as icons from "./Icons";
import {Watermark} from "antd";

function App() {



    const handleOnChange = (value: any) => {
        console.log("[TreeInfo]value", value)
    }

    const value = {
        "x-id": "td_tXAABwaZAE",
        "type": "object",
        "x-component-name": "Form",
        "properties": {
            "td_rszikvOzVh": {
                "type": "string",
                "title": "文本框",
                "required": true,
                "x-decorator": "FormItem",
                "x-component": "Input.TextArea",
                "x-id": "td_rszikvOzVh",
                "x-index": 0,
                "x-component-name": "Field",
            },
            "td_AaMFjiFfps": {
                "title": "性别",
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-id": "td_AaMFjiFfps",
                "x-index": 1,
                "x-component-name": "Field",
            }
        }
    }

    GlobalStore.registerIcons(icons)
    return (
        <div className="App">
            <Watermark style={{height:'100%'}} content={['北斗开源']}>
                <FormDesigner value={value} onChange={handleOnChange}>
                    <StudioPanel>
                        <CompositePanel style={{width: 300}}>
                            <ResourceWidget title={`基础组件`} sources={[Input, Select, Password]}/>
                        </CompositePanel>
                        <WorkspacePanel>
                            <ViewportPanel>
                                <ViewPanel>
                                    <ComponentsWidget components={{Form, Input, Select, Password}}/>
                                </ViewPanel>
                            </ViewportPanel>
                        </WorkspacePanel>
                        <AntdSettingsPanel/>
                    </StudioPanel>
                </FormDesigner>
            </Watermark>

        </div>
    );
}

export default App;
