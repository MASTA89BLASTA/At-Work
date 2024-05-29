interface IAddress {
  city: string;
}

interface ICompany {
  name: string;
}

interface IUser {
  id:number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: IAddress;
  company: ICompany; 
}

export type { IUser, IAddress, ICompany };