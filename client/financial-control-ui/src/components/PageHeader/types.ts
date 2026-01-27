import { type ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  actionLabel: string;
  onActionClick?: () => void;
  actionIcon?: ReactNode;
};

