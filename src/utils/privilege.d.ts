/**
 * 不同等级之间的状态码
 *
 * 有两种使用方式,
 * 1. 将几个值相然后判断大小确认是否有能力
 * 2. 利用Index和Raw判断是否存在对应的位确认是否有能力
 */
export declare enum LevelCode {
    'SuperUser',
    'Management',
    'Download',
    'Edit',
    'Upload',
    'StaticMessage',
    'View',
    'superUserIndex' = 0,
    'managementIndex' = 1,
    'downloadIndex' = 2,
    'editIndex' = 3,
    'uploadIndex' = 4,
    'staticIndex' = 5,
    'viewIndex' = 6
}
export declare class Privilege {
    static powerList: string[];
    /**
     * 将传入的字符串进行格式化为标准的权限位置
     * 要求传入的字符串的长度等于>=7的部分会被裁剪
     * @param rawCode 权限代码
     */
    static format(rawCode: string): string;
    /**
     * 将传入的权限代码,转为一个用于描述权限的对象
     * @param rawCode 权限代码
     */
    static parse(rawCode: string | number): {
        management: boolean;
        download: boolean;
        edit: boolean;
        upload: boolean;
        static: boolean;
        view: boolean;
    };
    /**
     * 将传入的数据转为权限代码.
     * 可以传入纯数值的权限值也可以传入一个权限对象
     * @param data 需要转换的数据
     */
    static rawCodeIfy(data: number | object): string;
    /**
     * 将传入的权限代码转为纯数值的权限值
     * @param rawCode 权限代码
     */
    static numberIfy(rawCode: string): number;
    /**
     * 判断给定的权限代码rawCode在levelPos指定的位置上,
     * 是否有指定的权限, 所有的权限检测都通过后返回true,
     * 反之返回false
     * **注意**:管理员总是返回true
     * **注意**:当传入6位长度的短权限的时候则会进行前补1
     * @param levelPos 权限判断符号
     * @param rawCode 被判断的权限代码
     */
    static auth(levelPos: string, rawCode: string): boolean;
}
