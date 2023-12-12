export interface ISendInvitationFields {
  name: string,
  email: string,
  permissions: Array<string>,
  image: string
}

export type FormFields =  Omit<ISendInvitationFields, 'permissions'>

export interface Field<T extends object = object> {
  name: keyof T,
  placeholder: string
}