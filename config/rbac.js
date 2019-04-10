/**
 *   @author:  kenzyyang
 *   @date:  2019-4-10
 *   @desc:  rbac 权限控制模型的基本配置文件
 * */
// 用户权限字段,需要补充在此进行添加
const SUPER_ADMIN_USER = 0;
const ADMIN_USER = 1;
const USER = 2;

// 角色权限对应表，目前进行接口权限的区分
let rbacList = [];
// 超级用户拥有所有权限，不受任何限制
rbacList[SUPER_ADMIN_USER] = null;
// 管理员除了能够指定管理员外，拥有其他所有权限
rbacList[ADMIN_USER] = [];
// 普通用户仅有部分权限, 用户表中仅和自身相关
rbacList[USER] = [];

module.exports = {
    SUPER_ADMIN_USER,
    ADMIN_USER,
    USER,
    rbacList
};
