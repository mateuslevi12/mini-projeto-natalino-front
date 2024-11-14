import { api } from '@/api';
import { IUsers } from '@/interfaces/IUsers';
import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IResponse {
    msg: string;
    token: string;
    user: IUsers;
}

interface ApiState {
    auth_data: IResponse;
}

interface SignInCredentials {
    cpf: string;
    senha: string;
}

interface AuthContextData {
    auth_data: IResponse;
    login({ cpf, senha }: SignInCredentials): Promise<void>;
    logout(): Promise<void>;

}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode;
}


// Crie um componente de provedor para envolver sua aplicação
export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [data, setItemData] = useState<ApiState>({} as ApiState)

    async function login({ cpf, senha }: SignInCredentials) {
        try {
            
            const response = await api.post(`/auth/login`, {
                cpf, 
                senha
            });
    
            const auth_data = response.data as IResponse;
    
            // console.log(auth_data);
    
            if (auth_data?.user == null) {
                return;
            }
    
            api.defaults.headers.common['Authorization'] = "Bearer " + auth_data.token;
            
            AsyncStorage.setItem(`@COMANDA:auth_data`, JSON.stringify(auth_data))    
    
            setItemData({ 
                auth_data,
            });
        }
        catch(err) {
            console.log('error')
        }
        
    }

    async function logout() {
        await AsyncStorage.removeItem(`@COMANDA:token`);
        await AsyncStorage.removeItem(`@COMANDA:user`);
        await AsyncStorage.removeItem(`@COMANDA:auth_data`);

        setItemData({} as ApiState);
    }

    return (
        <AuthContext.Provider value={{ auth_data: data.auth_data, login, logout  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
