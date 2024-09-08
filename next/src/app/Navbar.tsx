"use client"

import {
  AppShellNavbar,
  Checkbox,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import { state, useSnap } from "./store"

export const Navbar = () => {
  const snap = useSnap()
  const theme = useMantineTheme()

  const { colorScheme } = useMantineColorScheme()

  const backgroundColor =
    colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1]

  const px = "0.6rem"
  return (
    <AppShellNavbar px={px} py={"0.6rem"}>
      {snap.items.map((item, index) => {
        const segments = item.path.split("/")
        const filename = segments.pop() ?? "?"
        const pathWithoutFilename = segments.join("/")
        const filenameWithoutExt = filename.split(".").slice(0, -1).join(".")

        return (
          <Group justify="space-between" gap={px} key={item.path} wrap="nowrap">
            <UnstyledButton
              variant="outline"
              size="xs"
              style={{ backgroundColor, borderRadius: 4 }}
              py={6}
              px={8}
            >
              <Group flex={"grow"}>
                <Stack gap={0}>
                  <Text size="xs">{pathWithoutFilename}</Text>
                  <Text>{filenameWithoutExt}</Text>
                </Stack>
              </Group>
            </UnstyledButton>
            <Checkbox
              color="green"
              checked={item.accepted}
              onChange={() => {
                state.items[index].accepted = !state.items[index].accepted
              }}
            />
          </Group>
        )
      })}
    </AppShellNavbar>
  )
}
