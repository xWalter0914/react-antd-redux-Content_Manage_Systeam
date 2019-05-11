/**Reducer 数据处理 */
import {type} from '../action/action'
const initialState={
    menuName:'首页'
}
export default (state=initialState,action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
            return{
                ...state,//保留原有状态
                menuName:action.menuName
            }
        default:
            return {...state};
    }
}