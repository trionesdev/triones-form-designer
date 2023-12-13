import React from "react";
import {SettingsPanel} from "@trionesdev/form-designer-react";
import {Form, FormItem, Input, Select, Switch} from "@formily/antd-v5";

export const AntdSettingsPanel = () => {
    return <SettingsPanel components={{Form, FormItem, Input, Select,Switch}} formProps={{
        layout: "vertical"
    }}/>
}