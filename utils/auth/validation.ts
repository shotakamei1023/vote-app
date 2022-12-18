import { Error } from "../../types";

// バリデーションロジック
//メールアドレスの正規表現
const regex = new RegExp(
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
);
export const checkEmail = (
  value: string,
  isError: Error,
  setError: ({ email, password }: Error) => void
) => {
  //判定
  setError({
    email: !regex.test(value),
    password: isError.password,
  });
  return !regex.test(value);
};

export const checkPassword = (
  value: string,
  isError: Error,
  setError: ({ email, password }: Error) => void
) => {
  if (value.length < 6) {
    setError({
      email: isError.email,
      password: true,
    });
    return true;
  } else {
    setError({
      email: isError.email,
      password: false,
    });
    return false;
  }
};

export const changeMessage = (value: string) => {
  if (value == "Firebase: Error (auth/email-already-in-use).") {
    return "既にこちらのメールアドレスは登録されています。";
  }
  if (value == "Firebase: Error (auth/invalid-email).") {
    return "メールアドレスの形式が正しくありません";
  }
  if (value == "Firebase: Error (auth/wrong-password).") {
    return "メールアドレスまたはパスワードが違います";
  }
  if (value == "Firebase: Error (auth/user-not-found).") {
    return "メールアドレスまたはパスワードが違います";
  } else {
    return value;
  }
};
