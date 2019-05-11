import originJsonp from "jsonp";
import axios from "axios";
import utils from '../utils/utils'
import { Modal } from "antd";
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      originJsonp(
        options.url,
        {
          param: "callback"
        },
        function(err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  }
  static ajax(options) {
    let loading;
    // 开始show loading
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("socket");
      loading.style.display = "block";
    }
    let baseApi=''
    if(options.isMock){
        baseApi = "真实API";
    }else{
        baseApi = "https://easy-mock.com/mock/5cbfc695efdbfa34e2961457/api";
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseApi,
        timeout: 6000,
        params: (options.data && options.data.params) || ""
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("socket");
          loading.style.display = "none";
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code === 0) {
            resolve(res);
          } else {
            Modal.error({
              title: "Error:",
              content: '发生错误'
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
  static requestList(_this,url, params,isMock) {
    var data = {
      params: params,
      isMock
    };
    this.ajax({
      url,
      data
    }).then(data => {
      if (data) {
        if (data.code === 0) {
          data.result.list.map((item, index) => {
            item.key = index;
            return item;
          });
          _this.setState({
            list: data.result.list,
            pagination: utils.pagination(data, current => {
              _this.params.page = current; //更换页数
              _this.request();
            })
          });
        }
      }
    });
  }
}
