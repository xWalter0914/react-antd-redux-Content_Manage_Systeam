import React from "react";
import { Card, Button, Table, Form, Select, message, Modal, Badge } from "antd";
import Axios from "./../../axios/Axios";
import utils from "./../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {
  componentDidMount() {
    this.request();
  }
  state = {
    list: [],
    isShowOpenCity: false
  };
  params = { page: 1 };
  //获取城市列表
  request = () => {
    Axios.ajax({
      url: "city/list",
      data: {
        params: { page: this.params.page },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        res.result.list.map((item, index) => {
          item.key = index;
          return item
        });
        this.setState({
          list: res.result.list,
          pagination: utils.pagination(res, current => {
            this.params.page = current; //更换页数
            this.request();
          })
        });
      }
    });
  };
  //点击 开通城市 按钮
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  };
  //模拟GET提交列表
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log(cityInfo);
    Axios.ajax({
      url: "/city/open",
      data: {
        params: cityInfo
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(res.result);
        this.setState({
          isShowOpenCity: false
        });
        this.request();
      }
    });
  };
  render() {
    const columns = [
      {
        title: "城市ID",
        dataIndex: "id"
      },
      {
        title: "城市名称",
        dataIndex: "cityname",
        render(state) {
          let config = {
            "1": <Badge status="success" text="北京市" />,
            "2": <Badge status="processing" text="天津市" />,
            "3": <Badge status="warning" text="深圳市" />
          };
          return config[state];
        }
      },
      {
        title: "用车模式",
        dataIndex: "mode",
        render(mode) {
          return mode === 1 ? "停车点" : "禁停区";
        }
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
        render(op_mode) {
          return op_mode === 1 ? "自营" : "加盟";
        }
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name"
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        render(array) {
          return array
            .map(item => {
              return item.user_name;
            })
            .join(",");
        }
      },
      {
        title: "城市开通时间",
        dataIndex: "open_time"
      },
      {
        title: "操作时间",
        dataIndex: "update_time",
        render: utils.formateDate
      },
      {
        title: "操作人",
        dataIndex: "sys_user_name"
      }
    ];
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div
          className="content-wrap"
          style={{
            background: "#ffffff",
            border: "1px solid #e8e8e8",
            margin: "-1px -1px"
          }}
        >
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        {/*开通城市弹窗*/}
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            });
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm
            wrappedComponentRef={inst => {
              this.cityForm = inst;
            }}
          />
          {/* 相当于是ref,保存inst(可随便定义)到cityForm中 */}
        </Modal>
      </div>
    );
  }
}
class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id")(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator("mode")(
            <Select style={{ width: 120 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator("op_mode")(
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator("auth_status")(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button
            onClick={() => {
              this.props.form.resetFields();
            }}
          >
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    return (
      <Form>
        <FormItem label="选择城市" {...formItemLayout}>
          {getFieldDecorator("city_id", {
            initialValue: "1"
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          {getFieldDecorator("op_mode", {
            initialValue: "1"
          })(
            <Select style={{ width: 100 }}>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {getFieldDecorator("use_mode", {
            initialValue: "1"
          })(
            <Select style={{ width: 100 }}>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm);
