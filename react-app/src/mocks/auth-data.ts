import { IUser } from '../store/auth/types';

const mockAuthData: IUser = {
  auth: {
    userId: '5ff8a657f6693c4a3dfcaf0c',
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                .eyJ1c2VySWQiOiI1ZmY4YTY1N2Y2NjkzYzRhM2
                RmY2FmMGMiLCJ1c2VyTmFtZSI6ImZ1bHZpby5jdXNp
                bWFub0Bob3RtYWlsLmNvbSIsInJvbGVzIjpbMV0sImZ
                pcnN0TmFtZSI6IkZ1bHZpbyIsImxhc3ROYW1lIjoiQ3
                VzaW1hbm8iLCJpYXQiOjE2MTAzNTg2MDMsImV4cCI6MTYx
                MDM1OTgwM30.3AJX1BA__9FXwcA6rU66ocpEt5eVdFdz0d0c_633jIc`,
    tokenExpiration: 1610359803,
    isAuthenticated: true,
  },
  userInfo: {
    firstName: 'Fulvio',
    lastName: 'Cusimano',
  },

};

export default mockAuthData;
