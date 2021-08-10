import { IUser } from 'types';

export interface ResponseAuth {
  accessToken: string;
  message: string;
  user: ResponseUser;
}

export interface ResponseUser {
  firstName: null | string;
  lastName: null | string;
  avatarKey: string | null;
  deletedAt: string | null;
  id: string;
  email: string;
  isAuthorized: boolean;
  imported: boolean;
  teamId: string;
  role: string;
  isReceivingNotifications: boolean;
  loggedInAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProspect {
  createdAt: string;
  filters: { q: string; gender: string; industry: Array<string>; location: Array<string>; variantForm: string };
  id: string;
  lastAuthor: ResponseUser;
  name: string;
  prospectsAvailable: number;
  updatedAt: string;
}

export interface ResponseProspectsList {
  items: Array<IProspect>;
}

export interface ICompany {
  affiliation: null;
  age: null;
  annualContributions: null;
  brands: null;
  cashContributions: null;
  charitablePartners: [];
  city: string;
  competitors: null;
  continent: null;
  country: string;
  crsFocus: [];
  descriptionList: string;
  employeeContributions: null;
  employeeCount: number;
  employeeEngagementOpportunities: boolean;
  employeeRange: string;
  errorLoadZoomInfo: null;
  errorLoadZoomInfoDate: null;
  ethnicity: null;
  favoriteCompanies: Array<{
    companyId: string;
    id: string;
    userI: string;
  }>;
  fax: string;
  genders: null;
  id: string;
  inKindContributions: null;
  income: null;
  industries: null;
  interests: null;
  like: boolean;
  loadZoomInfoDate: null;
  logo: null | string;
  name: string;
  nonprofit: null;
  parentCompany: null;
  parentId: null;
  parentName: null;
  partnershipLink: null;
  phone: string;
  primaryIndustry: [null];
  productsBrandDescription: null;
  purchase: null;
  revenue: string;
  revenueRange: string;
  score: number;
  sdgGoals: [];
  similarCompanies: Array<string>;
  socialMediaUrls: null;
  state: string;
  statusZoomInfo: string;
  street: string;
  subUnitIndustries: null;
  ticker: string;
  twitterHandle: null;
  type: null;
  typesOfInvestment: null;
  website: string;
  zipCode: string;
  zoomInfoId: null;
}

export interface ResponseFavoriteCompanies {
  items: Array<ICompany>;
}

export interface ResponseTeam {
  pitchCount: number;
  searchCount: number;
}

export type ResponseLoginsList = Array<{
  id: string;
  loggedInAt: string;
  user: IUser;
  userId: string;
}>;

export interface getProspectsListProps {
  limit?: number;
  page?: number;
  sort?: 'alphabet' | 'available' | 'last-activity';
}

export interface getFavoriteCompaniesProps {
  limit?: number;
  page?: number;
}
