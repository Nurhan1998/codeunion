export enum EModalNames {
    SEND_INVITATION,
    DELETE_USER_SUCCESS,
    SEND_INVITATION_SUCCESS,
    CREATE_USER,
    EDIT_USER
}

export type TNullable<T> = T | null

export interface IDefaultState<T> {
    data: TNullable<T>,
    loading: boolean
    error: unknown // AxiosError
}

export interface  IBaseUser {
    name: string
    email: string
    permissions: Array<string>,
    image: string
}

export interface IUsersState {
    users: IDefaultState<IBaseUser[]>
    editingUserData: TNullable<IBaseUser>,
    activeModal: TNullable<EModalNames>
}
