import { IUser } from 'src/types/user';
import { api } from '../../api';
import { setCredentials } from '../auth/authSlice';
import { ChatMessage } from 'src/types/chat';

interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
     email: string;
        name: string;
  password: string;
}
interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
  status: boolean;
  message: string;
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
interface Chat{
    participants:IParticipant[]
}
// Example usage in a chat object
export interface ChatRespones {
  id: number;
  chat:Chat;
  messages: ChatMessage[]; // optional, if you include chat messages
  unreadCount?: number;
}


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ store in Redux
          dispatch(setCredentials({ user: data, token: data.token }));
          // ✅ persist in localStorage
        
        } catch (err) {
          console.error('Login failed', err);
        }
      },
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ store in Redux
          dispatch(setCredentials({ user: data, token: data.token }));
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
    fetchuserchat:builder.query<ChatRespones,number>({
        query:(userId)=>({
            url:`users/chats/get/${userId}`,
            method:'GET'
        }),
        providesTags:["Chat"]
    }),
    chatReadStatus:builder.query<ChatRespones,number>({
        query:(userId)=>({
            url:`users/chats/readeStatus/${userId}`,
            method:'GET'
        }),
        providesTags:["Chat"]
    })
  }),
  
});

export const { useLoginMutation, useRegisterMutation, useFetchUsersQuery,useFetchuserchatQuery ,useChatReadStatusQuery} = authApi;
