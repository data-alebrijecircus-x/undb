import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import zodEn from 'zod-i18n-map/locales/en/zod.json'
import zodZh from 'zod-i18n-map/locales/zh-CN/zod.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        auth: {
          login: 'login',
          register: 'register',
          email: 'email',
          'email placeholder': 'your email address',
          password: 'password',
          'password placeholder': 'password',
          'has no account': "has't account yet?",
          'has account': 'already has an account?',
        },
        common: {
          Apply: 'Apply',
          Cancel: 'Cancel',
          Confirm: 'Confirm',
          Delete: 'Delete',
          Create: 'Create',
          Done: 'Done',
          Update: 'Update',
          Name: 'Name',
          Description: 'Description',
          Type: 'Type',
          Asc: 'A → Z',
          Desc: 'Z → A',
          Max: 'max',
          or: 'or',
          NO_DATE: 'no date',
          BEFORE_YESTERDAY: 'before yesterday',
          YESTERDAY: 'yesterday',
          TODAY: 'today',
          TOMORROW: 'tomorrow',
          AFTER_TOMORROW: 'after tomorrow',
          EQUAL: 'equal',
          'NOT EQUAL': 'not equal',
          CONTAINS: 'contains',
          'STARTS WITH': 'starts with',
          'ENDS WITH': 'ends with',
          REGEX: 'regex',
          'GREATER THAN': 'greater than',
          'GREATER THAN OR EQUAL': 'greater than or equal',
          'LESS THAN': 'less than',
          'LESS THAN OR EQUAL': 'less than or equal',
          'IS TODAY': 'is today',
          'IS TRUE': 'is true',
          'IS FALSE': 'is false',
          'IS EMPTY': 'is empty',
          'IS NOT EMPTY': 'is not empty',
          'HAS FILE TYPE': 'has file type',
          'HAS FILE EXTENSION': 'has file extension',
          IN: 'in',
          'NOT IN': 'not in',
          'IS ROOT': 'is root',
          Reset: 'Reset',
          'Sort By Ascending': 'Sort By Ascending',
          'Sort By Desending': 'Sort By Desending',
          Required: 'Required',
          System: 'System',
          Base: 'Base',
          Lookup: 'Lookup',
          Reference: 'Reference',
          Display: 'Display Field',
          'Drag Or Click': 'Drag images here or click to select files',
          Image: 'Image',
          Video: 'Video',
          PDF: 'PDF',
          Document: 'Document',
          Excel: 'Excel',
          PPT: 'PPT',
          Text: 'Text',
        },
        table: {
          'Create New Record': 'Create New Record',
          Views: 'Views',
          Field: 'Field',
          Filter: 'Filter',
          'Field Name': 'Field Name',
          Sort: 'Sort',
          'Manage Fields': 'Manage Fields',
          'Select Display Type': 'Select Display Type',
          Grid: 'Grid',
          Kanban: 'Kanban',
          Calendar: 'Calendar',
          TreeView: 'Tree',
          'Display Fields': 'Display Fields',
          'Select View': 'Select View',
          'Update View Name': 'Update View Name',
          'Duplicate View': 'Duplicate View',
          'Delete View': 'Delete View',
          'Search Field': 'Search Field',
          'Create New Table': 'Create New Table',
          'Create New Field': 'Create New Field',
          'Create New Filter': 'Create New Filter',
          'Create New Sort': 'Create New Sort',
          'Update Field': 'Update Field',
          'Insert Field Left': 'Insert Left',
          'Insert Field Right': 'Insert Right',
          'Insert Field Before': 'Insert Before',
          'Insert Field After': 'Insert After',
          'Sort Ascending': 'Sort: Ascending',
          'Sort Desending': 'Sort: Desending',
          'Delete Sort Ascending': 'Delete Sort: Ascending',
          'Delete Sort Desending': 'Delete Sort: Desending',
          'Hide Field': 'Hide Field',
          'Delete Field': 'Delete Field',
          'Set Rating Max': 'Set Rating Max',
          'Foreign Table': 'Foreign Table',
          'Select Foreign Table': 'Select Foreign Table',
          'Select Display Fields': 'Select Display Fields',
          'Date Format': 'Date Foramt',
          'Select Date Format': 'Select Date Format',
          string: 'String',
          email: 'Email',
          attachment: 'Attachment',
          color: 'Color',
          number: 'Number',
          rating: 'Rating',
          date: 'Date',
          'date-range': 'DateRange',
          'auto-increment': 'AutoIncrement',
          bool: 'Bool',
          select: 'Select',
          reference: 'Reference',
          count: 'Count',
          sum: 'Sum',
          average: 'Average',
          tree: 'Tree',
          lookup: 'Lookup',
          'Duplicate Record': 'Duplicate Record',
          'Duplicate Selected Record': 'Duplicate Selected',
          'Copy Record Id': 'Copy Record Id',
          'Update Record': 'Update Record',
          'Delete Record': 'Delete Record',
          'Delete Selected Record': 'Delete Selected',
          'System fields': 'System fields',
          'Show System Fields': 'Show System Fields',
          'Update Table': 'Update Table',
          'Update Table Name': 'Update Table Name',
          'Delete Table': 'Delete Table',
          'Confirm Delete Table': 'Are you sure to delete table?',
          'Total Records': 'loaded {{total}} records',
          'Create New Option': 'Create New Option',
          'Option Name': 'Option Name',
          'Parent Field Name': 'Parent Field Name',
          'Set Parent Field Name': 'Set Parent Field Name',
          'Please confirm your action': 'Please confirm your action',
          'Confirm action content': 'You have unsaved changes. Do you really want to close the panel?',
          'Select Existing Field': 'Select Existing Field',
          'Select Kanban Field': 'Select Kanban Field',
          'Create New Date Field': 'Create New Date Field',
          'Create New Date Range Field': 'Create New Date Range Field',
          'Create New Select Field': 'Create New Select Field',
          Uncategorized: 'Uncategorized',
          'Update Option': 'Update Option',
          'Delete Option': 'Delete Option',
          'Confirm Delete Option': 'Are you sure to delete option？',
          'Select Calendar Field': 'Select Calendar Field',
          'Create New View': 'Create New View',
          'Select Tree Field': 'Select Tree Field',
          'Create New Tree Field': 'Create New Tree Field',
          'Unscheduled Records': 'Unscheduled Records',
          'No More Unscheduled Records': 'There are no more unscheduled records.',
          'Using Field': 'using "{{name}}" field',
          'Pin Field': 'Pin',
          'Unset Pin Field': 'Unset Pin',
          'Selected N Records': 'Selected {{n}} Record(s)',
          'N Views': '{{n}} view(s)',
          'Add Description': 'Add Description',
          'Reference Field': 'Reference Field',
          'Select Reference Field': 'Select Reference Field',
          'Aggregate Field': 'Aggregate Field',
          'Select Aggregate Field': 'Select Aggregate Field',
          Bidirectional: 'Bidirectional',
          'Missing Foreign Table': 'Missing Foreign Table',
          'Insert Lookup Fields': 'Insert Lookup Fields',
          'Insert Lookup Field': 'Insert Lookup Field',
          'Insert Count Field': 'Insert Count Field',
          'Insert Sum Field': 'Insert Sum Field',
          'Insert Average Field': 'Insert Average Field',
          'Custom Display Fields': 'Custom Display Field',
          '{{n}} Fields Hidden': '{{n}} fields hidden',
        },
        zod: zodEn,
      },
      'zh-CN': {
        auth: {
          login: '登录',
          register: '注册',
          email: '邮箱',
          'email placeholder': '邮箱地址',
          password: '密码',
          'password placeholder': '密码',
          'has no account': '还没有账号？',
          'has account': '已有账号？',
        },
        common: {
          Apply: '应用',
          Cancel: '取消',
          Confirm: '确认',
          Delete: '删除',
          Create: '创建',
          Done: '完成',
          Update: '更新',
          Name: '名称',
          Description: '描述',
          Type: '类型',
          Asc: '正序',
          Desc: '倒序',
          Max: '最大值',
          or: '或',
          NO_DATE: '无日期',
          BEFORE_YESTERDAY: '昨天之前',
          YESTERDAY: '昨天',
          TODAY: '今天',
          TOMORROW: '明天',
          AFTER_TOMORROW: '明天之后',
          EQUAL: '等于',
          'NOT EQUAL': '不等于',
          CONTAINS: '包含',
          'STARTS WITH': '开头是',
          'ENDS WITH': '结尾是',
          REGEX: '正则匹配',
          'GREATER THAN': '大于',
          'GREATER THAN OR EQUAL': '大于等于',
          'LESS THAN': '小于',
          'LESS THAN OR EQUAL': '小于等于',
          'IS TODAY': '是今天',
          'IS TRUE': '为真',
          'IS FALSE': '为假',
          'IS EMPTY': '为空',
          'IS NOT EMPTY': '不为空',
          'HAS FILE TYPE': '包含文件类型',
          'HAS FILE EXTENSION': '包含文件后缀',
          IN: '包含在',
          'NOT IN': '不包含在',
          'IS ROOT': '是根',
          Reset: '重置',
          'Sort By Ascending': '正序排序',
          'Sort By Desending': '倒序排序',
          Required: '必填',
          System: '系统',
          Base: '基础',
          Lookup: '查看',
          Reference: '关联',
          Display: '显示列',
          'Drag Or Click': '拖拽或点击此处上传文件',
          Image: '图像',
          Video: '视频',
          PDF: 'PDF',
          Document: '文档',
          Excel: '电子表格',
          PPT: 'PPT',
          Text: '文本',
        },
        table: {
          'Create New Record': '创建新记录',
          Views: '视图',
          Field: '列',
          Filter: '筛选',
          Sort: '排序',
          'Field Name': '列名',
          'Manage Fields': '配置列',
          'Select Display Type': '切换视图类型',
          Grid: '表格',
          Kanban: '看板',
          Calendar: '日历',
          TreeView: '树形',
          'Display Fields': '显示列',
          'Select View': '选择视图',
          'Update View Name': '更新视图名称',
          'Duplicate View': '复制视图',
          'Delete View': '删除视图',
          'Search Field': '搜索列',
          'Create New Table': '创建表',
          'Create New Field': '创建列',
          'Create New Filter': '添加筛选',
          'Create New Sort': '添加排序',
          'Update Field': '更新列',
          'Insert Field Left': '向左插入',
          'Insert Field Right': '向右插入',
          'Insert Field Before': '向上插入',
          'Insert Field After': '向下插入',
          'Sort Ascending': '排序：正序',
          'Sort Desending': '排序：倒序',
          'Delete Sort Ascending': '删除排序：正序',
          'Delete Sort Desending': '删除排序：倒序',
          'Hide Field': '隐藏列',
          'Delete Field': '删除列',
          'Set Rating Max': '设置评分最大值',
          'Foreign Table': '关联表',
          'Select Foreign Table': '选择关联表',
          'Select Display Fields': '选择显示列',
          'Date Format': '日期格式',
          'Select Date Format': '选择日期格式',
          string: '文本',
          email: '邮件',
          attachment: '附件',
          color: '颜色',
          number: '数字',
          rating: '评分',
          date: '日期',
          'date-range': '日期区间',
          'auto-increment': '自增',
          bool: '布尔',
          select: '单选',
          reference: '关联',
          count: '计数',
          sum: '求和',
          average: '平均值',
          tree: '树形',
          lookup: '查看',
          'Duplicate Record': '复制记录',
          'Duplicate Selected Record': '复制选中的记录',
          'Copy Record Id': '拷贝行 Id',
          'Update Record': '更新记录',
          'Delete Record': '删除记录',
          'Delete Selected Record': '删除选中记录',
          'System fields': '系统列',
          'Show System Fields': '显示系统列',
          'Update Table': '更新表',
          'Update Table Name': '更新表名',
          'Delete Table': '删除表',
          'Confirm Delete Table': '确认删除表吗？',
          'Total Records': '载入 {{total}} 行记录',
          'Create New Option': '创建新选项',
          'Option Name': '选项名',
          'Parent Field Name': '父列名称',
          'Set Parent Field Name': '设置父列名称',
          'Please confirm your action': '确认操作',
          'Confirm action content': '你有未保存的操作，确认关闭弹窗吗？',
          'Select Existing Field': '选择已有列',
          'Select Kanban Field': '选择看板列',
          'Create New Date Field': '创建新日期列',
          'Create New Date Range Field': '创建新日期区间列',
          'Create New Select Field': '创建新选项列',
          Uncategorized: '无选项',
          'Update Option': '更新选项',
          'Delete Option': '删除选项',
          'Confirm Delete Option': '确认删除选项吗？',
          'Select Calendar Field': '选择日历列',
          'Create New View': '创建新视图',
          'Select Tree Field': '选择树形列',
          'Create New Tree Field': '创建新树形列',
          'Unscheduled Records': '未计划记录',
          'No More Unscheduled Records': '没有更多未计划的记录。',
          'Using Field': '使用 "{{name}}" 列',
          'Pin Field': '固定列',
          'Unset Pin Field': '取消固定列',
          'Selected N Records': '选择了 {{n}} 条记录',
          'N Views': '{{n}} 个视图',
          'Add Description': '添加列描述',
          'Reference Field': '关联列',
          'Select Reference Field': '选择关联列',
          'Aggregate Field': '聚合列',
          'Select Aggregate Field': '选择聚合列',
          Bidirectional: '双向关联',
          'Missing Foreign Table': '没有关联表，可能被删除',
          'Insert Lookup Fields': '插入关联查看列',
          'Insert Lookup Field': '插入查看列',
          'Insert Count Field': '插入计数列',
          'Insert Sum Field': '插入求和列',
          'Insert Average Field': '插入平均值列',
          'Custom Display Fields': '自定义显示列',
          '{{n}} Fields Hidden': '{{n}} 列隐藏',
        },
        zod: zodZh,
      },
    },
    ns: ['common', 'table', 'zod'],
    defaultNS: 'table',
    lng: undefined, // if you're using a language detector, do not define the lng option
    fallbackLng: 'zh-CN',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
