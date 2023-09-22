// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 用户姓名 */
  realname: string;
  /** 用户学号 */
  username: string;
  /** 用户年级 */
  grade: string;
  /** 备注 */
  remark: string;
  /** 预计打卡时间 */
  targetTime: number;
  password: string;
  email: string;
  isAdmin: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
