const fakeTodoList = [
  { id: 7, completed: false, title: 'foo1', description: 'bar2' },
  { id: 8, completed: false, title: 'foo2', description: 'bar2' }
]
const fakeTodo = { id: 7, completed: false, title: 'foo', description: 'bar' }

const find = jest.fn(() => Promise.resolve({ data: fakeTodoList }))
const create = jest.fn(() => Promise.resolve(fakeTodo))
const remove = jest.fn()
const patch = jest.fn()

const API = {
  fakeTodoList,
  fakeTodo,
  find,
  create,
  remove,
  patch,
  service: () => ({
    find, create, remove, patch
  })
}

export default API
