import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./navigation-menu";

export function Navbar() {
  const itemStyle = `${navigationMenuTriggerStyle()} bg-primary text-white font-bold hover:text-gray-300 hover:bg-primary focus:bg-primary`;
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex flex-row justify-center py-2 bg-primary">
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
