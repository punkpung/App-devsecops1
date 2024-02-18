export type Room = {
  id: number;
  publicId: string;
  name: string;
  createdAt: string | null;
};

export type Message = {
  id: number;
  roomPublicId: string | null;
  parts: string;
  role: string;
  createdAt?: string | null;
};
