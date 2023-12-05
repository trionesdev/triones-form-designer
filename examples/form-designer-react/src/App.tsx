import React from 'react';
import './App.css';
import {
    ComponentsWidget,
    CompositePanel,
    FormDesigner,
    ResourceWidget,
    StudioPanel, ViewportPanel,
    WorkspacePanel
} from "@trionesdev/form-designer-react";
import {Form, Input} from "./components";

function App() {
    return (
        <div className="App">
            <FormDesigner>
                <StudioPanel>
                    <CompositePanel style={{width: 300}}>
                        <ResourceWidget sources={[Input]}/>
                    </CompositePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            <ComponentsWidget components={{Form, Input}}/>
                        </ViewportPanel>
                    </WorkspacePanel>
                </StudioPanel>
            </FormDesigner>
        </div>
    );
}

export default App;
