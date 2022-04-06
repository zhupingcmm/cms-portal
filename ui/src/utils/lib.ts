// 类型守卫
const isError = (value: any): value is Error => value?.message;
