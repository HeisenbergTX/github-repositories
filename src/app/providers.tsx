"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface IProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: IProvidersProps) => (
  <HeroUIProvider>{children}</HeroUIProvider>
);
