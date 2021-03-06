"use strict";
/**
 * 不同等级之间的状态码
 *
 * 有两种使用方式,
 * 1. 将几个值相然后判断大小确认是否有能力
 * 2. 利用Index和Raw判断是否存在对应的位确认是否有能力
 */
export const  LevelCode = (function (LevelCode) {
    LevelCode[LevelCode["SuperUser"] = Number(0b0000000)] = "SuperUser";
    LevelCode[LevelCode["Management"] = Number(0b1100000)] = "Management";
    LevelCode[LevelCode["Download"] = Number(0b1010000)] = "Download";
    LevelCode[LevelCode["Edit"] = Number(0b1001000)] = "Edit";
    LevelCode[LevelCode["Upload"] = Number(0b1000100)] = "Upload";
    LevelCode[LevelCode["StaticMessage"] = Number(0b1000010)] = "StaticMessage";
    LevelCode[LevelCode["View"] = Number(0b1000001)] = "View";
    LevelCode[LevelCode["superUserIndex"] = 0] = "superUserIndex";
    LevelCode[LevelCode["managementIndex"] = 1] = "managementIndex";
    LevelCode[LevelCode["downloadIndex"] = 2] = "downloadIndex";
    LevelCode[LevelCode["editIndex"] = 3] = "editIndex";
    LevelCode[LevelCode["uploadIndex"] = 4] = "uploadIndex";
    LevelCode[LevelCode["staticIndex"] = 5] = "staticIndex";
    LevelCode[LevelCode["viewIndex"] = 6] = "viewIndex";
    return LevelCode;
})({});
/**
 * 向字符串前补0,当字符串长度小于阈值的时候开始补足内容
 * @param limit 阈值
 * @param target 目标字符串
 */
const padLeft = (limit, target) => {
    for (let len = limit - target.length; len > 0; len--) {
        target = '0' + target;
    }
    return target;
};
export class Privilege {
    /**
     * 将传入的字符串进行格式化为标准的权限位置
     * 要求传入的字符串的长度等于>=7的部分会被裁剪
     * @param rawCode 权限代码
     */
    static format(rawCode) {
        if (rawCode.length >= 7) {
            return rawCode.split('').reverse().splice(0, 7).reverse().join('');
        }
        throw new Error('length of rawCode must greater than and equal 7.');
    }
    /**
     * 将传入的权限代码,转为一个用于描述权限的对象
     * @param rawCode 权限代码
     */
    static parse(rawCode) {
        if (typeof rawCode === 'number') {
            rawCode = Privilege.rawCodeIfy(rawCode);
        }
        // 123456789
        // ------>
        // 3456789 只保留后7位
        rawCode = Privilege.format(rawCode);
        const result = {
            management: false,
            download: false,
            edit: false,
            upload: false,
            static: false,
            view: false,
        };
        for (const keyName of Privilege.powerList) {
            result[keyName] = !!+rawCode[LevelCode[keyName + 'Index']];
        }
        return result;
    }
    /**
     * 将传入的数据转为权限代码.
     * 可以传入纯数值的权限值也可以传入一个权限对象
     * @param data 需要转换的数据
     */
    static rawCodeIfy(data) {
        if (typeof data === 'number') {
            let rawCode = data.toString(2);
            if (rawCode.length < 7) {
                rawCode = padLeft(7, rawCode);
            }
            return rawCode;
        }
        else {
            const result = [];
            for (const keyName of Privilege.powerList) {
                result.push(+data[keyName]);
            }
            return '1'+result.join('');
        }
    }
    /**
     * 将传入的权限代码转为纯数值的权限值
     * @param rawCode 权限代码
     */
    static numberIfy(rawCode) {
        return parseInt(Privilege.format(rawCode),2);
    }
    /**
     * 判断给定的权限代码rawCode在levelPos指定的位置上,
     * 是否有指定的权限, 所有的权限检测都通过后返回true,
     * 反之返回false
     * **注意**:管理员总是返回true
     * **注意**:当传入6位长度的短权限的时候则会进行前补1
     * @param levelPos 权限判断符号
     * @param rawCode 被判断的权限代码
     */
    static auth(levelPos, rawCode) {
        if (rawCode.length < 7) {
            rawCode = padLeft(7, rawCode);
        }
        // is admin
        if (rawCode[0] === '0') {
            return true;
        }
        for (const index of levelPos) {
            if (rawCode[index] === '0') {
                return false;
            }
        }
        return true;
    }
}
Privilege.powerList = ['management', 'download', 'edit', 'upload', 'static', 'view'];
