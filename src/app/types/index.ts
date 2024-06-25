export interface ILoginFormData {
	email: string
	password: string
}
export interface IRegisterFormData {
	name: string
	email: string
	password: string
}
export interface IProfileFormData {
	name: string | null | undefined
	email: string | null | undefined
}
