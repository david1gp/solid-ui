import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

test("signal objects store function values without calling them", () => {
  const initial = () => "initial"
  const replacement = () => "replacement"
  const signal = createSignalObject(initial)
  expect(signal.get()).toBe(initial)
  signal.set(replacement)
  flush()
  expect(signal.get()).toBe(replacement)
})

test("signal objects settle to the last plain value written in a tick", () => {
  const signal = createSignalObject(0)
  signal.set(1)
  signal.set(2)
  flush()
  expect(signal.get()).toBe(2)
})
