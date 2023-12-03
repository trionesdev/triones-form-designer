import React from 'react';
import './App.css';
import {
    ComponentsWidget,
    CompositePanel,
    FormDesigner,
    ResourceWidget,
    StudioPanel,
    WorkspacePanel
} from "@trionesdev/form-designer-react";
import {Input} from "./components";
import {FormItem} from "@formily/antd-v5";

function App() {
    return (
        <div className="App">
            <FormDesigner>
                <StudioPanel>
                    <CompositePanel style={{width:300}}>
                        <ResourceWidget sources={[Input]}/>
                    </CompositePanel>
                    <WorkspacePanel>
<ComponentsWidget components={{Input}}/>
                    </WorkspacePanel>
                </StudioPanel>
            </FormDesigner>
        </div>
    );
}

export default App;
