import { supabase } from "./supabase";

export const authorizeUser = async (email, password) => {
  // Frontend
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if (data.session === null) {
    console.log(error);
    return { userauthval: null, error };
  }
  const authorization = data.session.access_token;
  console.log(authorization);
  // Backend
  const { data: data1, error: error1 } = await supabase.auth.getUser(
    authorization
  );
  if (error1) {
    console.log(error1);
    return { userauthval: null, error1 };
  }
  // console.log(data1.user);

  if (error) {
    return { userauthval: null, error };
  }
  const userauthval = data1.user.role;
  // console.log({ userauthval });
  return { userauthval, error: null };
};
