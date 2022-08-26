export class SurveySchemaModel {
    id: string;
    title: string;
    description: string;
    type: QuestionType;
    attribute: Attribute;
    dataSource: DataSource[];
    children: SurveySchemaModel[];
    row: Row[];
    tags: string[];
}

export enum  QuestionType {
    FillBlank = 'FillBlank',
    Textarea = 'Textarea',
    MultipleBlank = 'MultipleBlank',
    // Signature,
    Score= 'Score',
    Radio = 'Radio',
    Checkbox = 'Checkbox',
    Select = 'Select',
    Cascader = 'Cascader',
    Upload = 'Upload',
    // MatrixAuto,
    // MatrixRadio,
    // MatrixCheckbox,
    // MatrixFillBlank,
    // MatrixScore,
    // MatrixNps,
    Survey= 'Survey',
    QuestionSet = 'QuestionSet',
    // Pagination,
    Remark = 'Remark',
    // SplitLine,
    Option = 'Option',
    // User,
    // Dept,
    // Nps,
    // HorzBlank,
    // Address
}

export class Attribute {
    /**
     * none/visible/hidden
     */
    display: string;

    multiple: boolean;

    hint: string;

    justAdded: boolean;

    actionUpdatesSectionValue: boolean;

    defaultValue: any;

    hidden: boolean;

    width: number;

    dataType: string;

    required: boolean;

    defaultChecked: boolean;

    rows: number;
    /**
     * kiểm tra phạm vi
     */
    scope: string;

    /**
     * 范围强校验提示信息
     */
    scopeDesc: string;

    /**
     * 范围软校验，超出范围会警告，但是依然可以提交
     */
    softScope: string;

    softScopeDesc: string;

    readOnly: boolean;

    suffix: string;

    /**
     * 文字长度限制 [1,2] [,5]
     */
    textLimit: string;

    /**
     * 多选答案数量限制 [1, 2] [,3]
     */
    answerLimit: string;

    finish: boolean;

    currentPage: number;

    totalPage: number;

    submitButton: string;

    numericScale: number;

    /**
     * 背景图
     */
    backgroundImage: string;

    /**
     * 问卷头背景图
     */
    headerImage: string;
    /**
     * 上传文件类型后缀，多个文件格式逗号分割
     */
    fileAccept: string;

    /**
     * 最大上传文件数量
     */
    maxFileCount: number;

    /**
     * 单个上传文件大小限制
     */
    maxFileSize: number;

    /**
     * 打分题显示样式
     */
    scoreStyle: string;

    /**
     * Textarea 高度自适应，[4,6] 最低4行，最高6行
     */
    autoSize: string;

    /**
     * 只允许使用拍照上传
     */
    cameraOnly: boolean;

    /**
     * 选项排成几列
     */
    columns: number;

    /**
     * 填空题的题干
     */
    content: string;

    /**
     * 是否允许移动地图修改位置
     */
    mapMove: boolean;

    /**
     * 显示投票结果
     */
    statEnabled: boolean;

    /**
     * nps 起始文案
     */
    npsStart: string;

    /**
     * nps 结束文案
     */
    npsEnd: string;

    /**
     * nps 起始数值
     */
    npsStartNum: number;

    /**
     * nps 总计数值
     */
    npsTotalNum: number;

    /**
     * 排序方式，默认正序
     */
    npsInvertSort: boolean;

    /**
     * 结束规则
     */
    finishRule: string;

    /**
     * 显示隐藏规则
     */
    visibleRule: string;

    /**
     * 必填校验规则
     */
    requiredRule: string;

    /**
     * 文本替换规则
     */
    replaceTextRule: string;

    /**
     * 校验规则
     */
    validateRule: string;

    /**
     * 计算规则
     */
    calculate: string;

    /**
     * 多选题选项排他
     */
    rejectOtherOption: string;

    /**
     * 分值
     */
    examScore: string;

    /**
     * 计分方式
     */
    examAnswerMode: string;

    /**
     * 答案匹配规则
     */
    examMatchRule: string;

    /**
     * 考试正确答案，当前选项 id 或者文本
     */
    examCorrectAnswer: string;

    /**
     * 答案解析
     */
    examAnalysis: string;

}

export class DataSource {
    label: string;
    value: string;
    children: DataSource[];
}

export class Row {
    id: string;
    title: string;
}
