import React from 'react';
import './App.css';
import {
    CompositePanel,
    FormDesigner,
    ResourceWidget,
    StudioPanel,
    WorkspacePanel
} from "@trionesdev/form-designer-react";
import {Input} from "./components";

function App() {
    return (
        <div className="App">
            <FormDesigner>
                <StudioPanel>
                    <CompositePanel style={{width:300}}>
                        <ResourceWidget sources={[Input]}/>
                    </CompositePanel>
                    <WorkspacePanel></WorkspacePanel>
                </StudioPanel>
            </FormDesigner>
        </div>
    );
}

export default App;
