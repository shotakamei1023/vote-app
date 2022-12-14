import { useEffect } from "react";
import { User, getUsers } from "../utils/firebase/users";
import { atom, useAtom } from "jotai";

const DEFAULT_OUTPUT = atom<UseUsersOutput>({
  isLoading: true,
  users: [],
});

export type UseUsersOutput = {
  isLoading: boolean;
  users: User[];
};

export const useUsers = (): UseUsersOutput => {
  const [output, setOutput] = useAtom(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const users = await getUsers();
      setOutput({ isLoading: false, users });
    })();
  }, []);

  return output;
};
