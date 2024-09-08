import { Text } from "@mantine/core"
import Image from "next/image.js"

export const Footer = () => (
  <footer>
    <Text>This Project is possible thanks to</Text>
    <a href="https://github.com/pingdotgg/uploadthing">
      <Image
        src="https://raw.githubusercontent.com/pingdotgg/uploadthing/main/assets/uploadthing-logo-dark-background.svg"
        alt="Uploadthing logo"
        width={180}
        height={36}
        priority
      />
    </a>
  </footer>
)
