import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "..";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface Loginform{
    email:string
    password:string
}
export interface UserInfo {
    email: string;
    password: string;
    username:string;
    loggedin:boolean;
    Anniversary:Anniversary[]
}

export interface Anniversary {
    name:string;
    date:Date;
    letter:boolean;
    gift:boolean;
}

const christmas: Anniversary = {
    name: "크리스마스",
    date: new Date("December 25, 2022 00:00:00"),
    letter:false,
    gift:false
}

const initialState: UserInfo = {
    email:"",
    password:"",
    username:"",
    loggedin:false,
    Anniversary:[]
}

export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async (td:void,{dispatch}) => {
    const response = await axios.get("/user/info");
    if (response.status==200)
    {
     const username=response.data["fullinfo"]["name"];
     const Anniversary=response.data["Anniversary"]

     dispatch(UserActions.fetchUserInfo({name:username,Anniversary:Anniversary}));
    }
    return response.data;

}
);
export const login = createAsyncThunk("login", async ( td: Pick<Loginform, "email" | "password">,{ dispatch }) => {

   
    //const response = await axios.post("/user/register",td);
    //if (response.status==204)
    {
        dispatch(UserActions.login(td))
        return true
    }
     return false;

}
);
export const logout = createAsyncThunk("logout", async ( td: Pick<Loginform, "email" | "password">,{ dispatch }) => {

   
    const response = await axios.get("/user/logout");
    if (response.status==204)
    {
        dispatch(UserActions.logout(td))
        return true;
    }
    else return false;

}
);
export const register = createAsyncThunk("register", async ( td: UserInfo,{ dispatch }) => {

   
    const response = await axios.post("/user/login",td);
    if (response.status==201)
    {
        return true;
    }
    return false;

}
);
export const addAnniv = createAsyncThunk("addAnniv", async ( td: Anniversary,{ dispatch }) => {

   
    const response = await axios.post("/user/info",td);
    if (response.status==200)
    {
       dispatch(UserActions.addAnniv({Anniversary:td}))
       return true;
    }
    return false;

}
);

export const fixAnniv = createAsyncThunk("fixAnniv", async ( td: Anniversary,{ dispatch }) => {
   
    const response = await axios.put("/user/info",td);
    if (response.status==200)
    {
       dispatch(UserActions.fixAnniv({Anniversary:td}))
       return true;
    }
    return false;

}
);

export const deleteAnniv = createAsyncThunk("deleteAnniv", async ( td:Anniversary,{ dispatch }) => {

   
    const response = await axios.delete("/user/login/"+td.name);
    if (response.status==200)
    {
        dispatch(UserActions.delete({Anniversary:td}))
        return true
    }
    else return false;

}
);

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            const user = state;
            user["email"]=action.payload.email;
            user["password"]=action.payload.password;
            user["loggedin"]=true;
        },
        logout: (state, action: PayloadAction<{}>) => {
            const user = state;
      
            user["loggedin"]=false;
        },
        
        fetchUserInfo:  (state, action: PayloadAction<{ Anniversary:Anniversary[],name:string }>) => {
            const user = state;
            user["username"]=action.payload.name;
            let i=0;
            for(i=0;i<action.payload.Anniversary.length;i++){
                const temp:Anniversary={
                 name:action.payload.Anniversary[i]["name"],
                 date:action.payload.Anniversary[i]["date"],
                 letter:action.payload.Anniversary[i]["letter"],
                 gift:action.payload.Anniversary[i]["gift"],
                }
                user["Anniversary"].push(temp);
            }
            
            
          },
          addAnniv: (state, action: PayloadAction<{Anniversary:Anniversary}>) => {
            const user = state;
      
            user["Anniversary"].push(action.payload.Anniversary);
        },
        fixAnniv: (state, action: PayloadAction<{Anniversary:Anniversary}>) => {
            const modified_Articles=state["Anniversary"].map((Anniv)=>{
                if(Anniv.name==action.payload.Anniversary.name)
                {   
                   
                    Anniv.letter=action.payload.Anniversary.letter;
                    Anniv.gift=action.payload.Anniversary.gift;
                    
            
      
                }
               
            })
   
        },
        delete: (state, action: PayloadAction<{Anniversary:Anniversary}>) => {

            const deleted = state["Anniversary"].filter((Anniv) => {
                return Anniv.name !== action.payload.Anniversary.name;
                });
                state["Anniversary"] = deleted;
                }
   
        


   
    }
});
   
    export const UserActions = UserSlice.actions;
    export default UserSlice.reducer;
    export const selectUser = (state: RootState) => state