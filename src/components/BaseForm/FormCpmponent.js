import React from "react";
import utils from "../../utils/utils";
import { Input, Select, Form, Button, Checkbox ,DatePicker} from "antd";
const FormItem = Form.Item;


class FilterForm extends React.Component {
    
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const  formList  = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        
        if (item.type === "select") {
         const select = (
            <FormItem label={label} key={field}>
              {
                  getFieldDecorator(field, {
                        initialValue: initialValue
                    })(
                        <Select
                            style={{ width: width }}
                            placeholder={placeholder}
                        >
                            {utils.getOptionList(item.list)}
                        </Select>
                    )
              }
            </FormItem>
          )
          formItemList.push(select);
        }else if (item.type === "城市") {
          const checkbox = (
            <FormItem label='城市' key={'city'}>
              {getFieldDecorator('city', {
                initialValue: "0",
              })(
                   <Select
                            style={{ width: 80 }}
                            
                        >
                            {utils.getOptionList([
                                { id: "0", name: "全部" },
                                { id: "1", name: "北京" },
                                { id: "2", name: "天津" },
                                { id: "3", name: "上海" }
                            ])}
                    </Select>
              )
              }
            </FormItem>
          );
          formItemList.push(checkbox);
        } else if (item.type === "input") {
          const input = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(field, {
                initialValue: initialValue
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          formItemList.push(input);
        } else if (item.type === "checkbox") {
          const checkbox = (
            <FormItem label={label} key={field}>
              {getFieldDecorator(field, {
                valuePropName: "checked",
                initialValue: initialValue //true false
              })(
                  <Checkbox>{label}</Checkbox>
              )
              }
            </FormItem>
          );
          formItemList.push(checkbox);
        }else if (item.type === "时间查询") {
          const begin_time = (
            <FormItem label='订单时间' key={'begin_time'}>
              {getFieldDecorator('begin_time', {
              })(
                  <DatePicker showtime placeholder={placeholder} format='YYYY-MM-DD HH:MM:SS' />
              )
              }
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key={'end_time'}>
              {getFieldDecorator('end_time', {
              })(
                  <DatePicker showtime placeholder={placeholder} format='YYYY-MM-DD'/>//YYYY-MM-DD HH:MM:SS
              )
              }
            </FormItem>
          );
           formItemList.push(end_time);
        }else if (item.type === "datepicker") {
          const datepicker = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
              })(
                  <DatePicker showtime placeholder={placeholder} format='YYYY-MM-DD' />
              )
              }
            </FormItem>
          );
          formItemList.push(datepicker);
        }
      });
    }
    return formItemList;
  };
  onFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
  render() {
    return (
      <Form layout='inline'>
        {this.initFormList()}
        <FormItem>
          <Button
            type="primary"
            onClick={this.onFilterSubmit}
            style={{ margin: "0 20px" }}
          >
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
export default Form.create({})(FilterForm);
