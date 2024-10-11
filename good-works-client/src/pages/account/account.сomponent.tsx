import { LabelInput } from '@/components/label-input.component';
import { CrossIcon } from '@/icons/cross.icon';
import { ExitIcon } from '@/icons/exit.icon';
import { SaveIcon } from '@/icons/save.icon';
import { TrashIcon } from '@/icons/trash.icon';
import { userSlice } from '@/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { makeClientRequest } from '@/utils/request.utils';
import { useEffect, useState } from 'react';

export const AccountComponent = () => {
  const user = useAppSelector(userSlice.selectors.user);
  const [isEdit, setIsEdit] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username);
  const [nameInput, setNameInput] = useState(user.name);
  const [passwordInput, setPasswordInput] = useState('');
  const dispatch = useAppDispatch();

  const refreshInputs = () => {
    setNameInput(user.name);
    setUsernameInput(user.username);
    setPasswordInput('');
    setIsEdit(false);
  };

  const logout = async () => {
    await makeClientRequest({
      method: 'POST',
      path: 'logout',
    });

    location.reload();
  };

  const remove = async () => {
    await makeClientRequest({
      method: 'POST',
      path: 'user/remove',
    });

    location.reload();
  };

  const update = async () => {
    if (usernameInput.length && nameInput.length) {
      const updatedUser = await makeClientRequest({
        method: 'POST',
        path: 'user/update',
        body: {
          name: nameInput,
          username: usernameInput,
          password: !!passwordInput.length ? passwordInput : undefined,
        },
      });
      dispatch(userSlice.actions.setUser(updatedUser));
    }
  };

  useEffect(() => {
    refreshInputs();
  }, [user]);
  useEffect(() => {
    if (usernameInput !== user.username || nameInput !== user.name || passwordInput.length) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [nameInput, usernameInput, passwordInput]);


  return <div className="flex justify-center pt-52 h-[100vh] bg-blue-50/5">
    <div className="flex flex-col h-fit gap-4 bg-blue-300 p-4 rounded-xl w-[400px]">
      <div className="flex flex-col gap-2">
        <LabelInput label="Username:"
                    placeholder="Type your new username"
                    value={usernameInput}
                    setValue={setUsernameInput} />
        <LabelInput label="Name:"
                    placeholder="Type your new username"
                    value={nameInput}
                    setValue={setNameInput} />
        <LabelInput label="New password:"
                    placeholder="**********"
                    value={passwordInput}
                    setValue={setPasswordInput} />
      </div>

      <div className="flex flex-col grow gap-2">
        {isEdit ?
          <>
            <button type="button"
                    className={`flex flex-row gap-1 justify-center items-center w-full bg-green-500 rounded-3xl py-2 text-white hover:bg-green-600 transition-colors duration-100 ease-in-out ${!usernameInput.length || !nameInput.length ? 'bg-green-300 cursor-not-allowed hover:bg-green-300' : ''}`}
                    onClick={update}>
          <SaveIcon className="w-5 fill-white" />
          SAVE
          </button>
          <button type="button"
                  className="flex flex-row gap-1 justify-center items-center w-full bg-red-400 rounded-3xl py-2 text-white hover:bg-red-500 transition-colors duration-100 ease-in-out"
                  onClick={() => refreshInputs()}>
            <CrossIcon className="w-5 stroke-white" />
            CANCEL
          </button>
          </> :
          <>
            <button type="button"
                    className="flex flex-row gap-1 justify-center items-center w-full bg-red-400 rounded-3xl py-2 text-white hover:bg-red-500 transition-colors duration-100 ease-in-out"
                    onClick={logout}>
              <ExitIcon className="w-5 fill-white" />
              LOGOUT
            </button>
            <button type="button"
                    className="flex flex-row gap-1 justify-center items-center w-full bg-red-500 rounded-3xl py-2 text-white hover:bg-red-600 transition-colors duration-100 ease-in-out"
                    onClick={remove}>
              <TrashIcon className="w-5 stroke-white" />
              REMOVE PROFILE
            </button>
          </>
        }
      </div>
    </div>
  </div>;
};
