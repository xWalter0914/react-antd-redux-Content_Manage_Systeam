import React from 'react'
import {Card,Tabs,message,Icon} from 'antd'
import  './ui.css'
const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {
    newTabIndex=0
    state={
        panes:[{
            title:'Tab 1',
            content:'Content of Tab Pane 1',
            key:'1'
        },
        {
            title:'Tab 2',
            content:'Content of Tab Pane 2',
            key:'2'
        },
        {
            title:'Tab 3',
            content:'Content of Tab Pane 3',
            key:'3'
        },
        ],
        activeKey:'1'
    }
    handleCallBack=(key)=>{
       message.info('你选择了页签'+key)
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of '+activeKey, key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }
    
    render() {
       
        return (
            <div>
                <Card title='Tab页签'> 
                    <Tabs defaultActiveKey='1' onChange={this.handleCallBack}>
                        <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab页签可编辑'> 
                    <Tabs activeKey={this.state.activeKey}
                        type='editable-card'
                        onEdit={this.onEdit}
                        onChange={(activeKey)=>{this.setState({activeKey})}}
                    >
                       {
                           this.state.panes.map((panel)=>{
                               return <TabPane tab={panel.title} key={panel.key}>{panel.content}</TabPane>
                           }) 
                       }
                    </Tabs>
                </Card>
                <Card title='Tab图标页签'> 
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab={<span><Icon type='apple'/>Apple</span>} key="1">Content of Tab Apple</TabPane>
                        <TabPane tab={<span><Icon type='android'/>Android</span>} key="2">Content of Tab Android</TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}