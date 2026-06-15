export type User = {
  id: string;
  email: string;
  fullName: string;
  displayName?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
