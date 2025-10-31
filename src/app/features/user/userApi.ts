import { IUser } from 'src/types/user';
import { api } from '../../api';
import { setCredentials } from '../auth/authSlice';
import { ChatMessage } from 'src/types/chat';
import { UserStatusType } from '@utils/socket';

interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}
export interface user {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status:boolean
}

interface LoginResponse {
  message:string,
  token:string,
  user:user
  //   tokenType: string;
}
export interface IUsersResponse {
  users: IUser[]; // ✅ array of users
  status: boolean;
  msg: string;
}
export interface IParticipant {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}
interface Chat {
  participants: IParticipant[];
}
// Example usage in a chat object
export interface ChatRespones {
  id: number;
  chat: Chat;
  messages: ChatMessage[]; // optional, if you include chat messages
}
export interface userStatusResponseType {
  message: string;
  status: true | false;
  data: UserStatusType;
}
export interface chatReadeStatusData {
  updatedCount: number | undefined;
  status: true | false;
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        
          // ✅ store in Redux
          dispatch(setCredentials({ user: data.user, token: data.token }));
          // ✅ persist in localStorage
        
        } catch (err) {
          console.error('Login failed', err);
        }
      },
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: body => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ store in Redux
          dispatch(setCredentials({ user: data.user, token: data.token }));
          // ✅ persist in localStorage
        } catch (err) {
          console.error('Registration failed', err);
        }
      },
    }),
    fetchUsers: builder.query<IUsersResponse, void>({
      query: () => ({
        url: '/users/list',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    fetchuserchat: builder.query<ChatRespones, string>({
      query: userId => ({
        url: `users/chats/get/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    chatReadStatus: builder.query<chatReadeStatusData, string>({
      query: userId => ({
        url: `users/chats/readeStatus/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    getUserStatus: builder.query<userStatusResponseType, string>({
      query: userId => ({
        url: `users/userStatus/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchUsersQuery,
  useFetchuserchatQuery,
  useChatReadStatusQuery,
  useGetUserStatusQuery,
} = authApi;
