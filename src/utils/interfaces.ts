export interface signInterface {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
}

export interface transferDto {
  senderEmail: string;
  receiverEmail: string;
  amount: number;
}
