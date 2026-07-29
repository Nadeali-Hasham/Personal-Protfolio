export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};
