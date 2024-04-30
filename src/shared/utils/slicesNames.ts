// так как в RTK 2.0 нужно чтобы СТРОГО совпадали имена в store и в slice,
// сделаем enum чтобы не ошибиться с именем

//========================================================================================

export const SlicesNames = {
	todolistsSlice: 'todolistsSlice',
	tasksSlice: 'tasksSlice',
	appSlice: 'appSlice',
	authSlice: 'authSlice'
} as const


