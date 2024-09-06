import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";

export function Navbar() {
  const itemStyle = `${navigationMenuTriggerStyle()} bg-green-300 text-white font-bold`;
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex flex-row justify-center bg-green-300 py-2">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={itemStyle}>
            Início
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact" className={itemStyle}>
            Contatos
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
