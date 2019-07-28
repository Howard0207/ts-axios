import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    test('should validate Formdata', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }
      extend(a, b)
      expect(a.foo).toBe(123)
    })

    test('should extend properties', () => {
      const a = { foo: 123, baz: 345 }
      const b = { baz: 567 }
      const c = extend(a, b)
      expect(c.baz).toBe(567)
      expect(c.foo).toBe(123)
    })
  })

  describe('deepMerge', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 234 }
      deepMerge(a, b, c)
      expect(a.bar).toBe(undefined)
      expect(a.foo).toBe(undefined)
      expect(b.bar).toBe(undefined)
      expect(c.foo).toBe(undefined)
    })

    test('should deepMerge properties', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)
      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: { qux: 789 }
      })
    })

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)
      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })
      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })
})
