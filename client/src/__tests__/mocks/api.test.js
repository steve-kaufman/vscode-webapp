import API from '../../api'

jest.mock('../../api')

describe('API', () => {
  it('Exists', () => {
    expect(API).toBeTruthy()
  })

  it('Has fakeTodo', () => {
    expect(API.fakeTodo).toBeTruthy()
  })
  it('Has fakeTodoList', () => {
    expect(API.fakeTodoList).toBeTruthy()
  })

  describe('service()', () => {
    it('Exists', () => {
      expect(API.service).toBeTruthy()
    })
    it('Returns object of functions', () => {
      // arrange
      const { find, create, remove, patch } = API
      const expected = { find, create, remove, patch }
      // act
      const actual = API.service()
      // assert
      expect(actual).toEqual(expected)
    })
  })

  describe('find()', () => {
    it('Exists', () => {
      expect(API.find).toBeTruthy()
    })
    it('Returns fakeTodoList', async () => {
      // arrange
      const { find } = API
      const expected = API.fakeTodoList
      // act
      const { data } = await find()
      // assert
      expect(data).toEqual(expected)
    })
  })

  describe('create()', () => {
    it('Exists', () => {
      expect(API.find).toBeTruthy()
    })
    it('Returns fakeTodo', async () => {
      // arrange
      const { create } = API
      const expected = API.fakeTodo
      // act
      const actual = await create()
      // assert
      expect(actual).toEqual(expected)
    })
  })

  describe('remove()', () => {
    it('Exists', () => {
      expect(API.remove).toBeTruthy()
    })
  })

  describe('patch()', () => {
    it('Exists', () => {
      expect(API.remove).toBeTruthy()
    })
  })

  describe('authenticate()', () => {
    it('Exists', () => {
      expect(API.authenticate).toBeTruthy()
    })
  })
})
