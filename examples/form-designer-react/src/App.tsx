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
                        <div td-designer-node-id={`sss`} style={{height:'100%',boxSizing:'border-box'}}>
                            <div td-designer-node-id={`ssds223232`}>
                                <FormItem label={`sss`}>
                                    <Input/>
                                </FormItem>
                            </div>
                            <div td-designer-node-id={`ssds22333232222`}>
                                <FormItem label={`s是是是ss`}>
                                    <Input/>
                                </FormItem>
                            </div>
                        </div>
                    </WorkspacePanel>
                </StudioPanel>
            </FormDesigner>
        </div>
    );
}

export default App;
