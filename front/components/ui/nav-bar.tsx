import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";

export function Navbar() {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex flex-row">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className={`${navigationMenuTriggerStyle()}`}
          >
            Início
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/#"
            className={navigationMenuTriggerStyle()}
          >
            Usuários
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
