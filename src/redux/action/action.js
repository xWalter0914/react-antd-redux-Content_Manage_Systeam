/**Action类型 */
/** */
export const type={
    SWITCH_MENU:'SWITCH_MENU'
}
export function swichMenu(menuName){
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}