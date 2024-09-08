"use client"

import { proxy, useSnapshot } from "valtio"
import type { Item } from "./types"

type Store = {
  items: Array<Item>
}

export const state = proxy<Store>({
  items: [
    {
      path: "met/basic.test.ts/starting-page-is-signup/aaaaaaaaaaaa/00-signup-page-linux.png",
    },
  ],
})
export const useSnap = () => useSnapshot(state)
