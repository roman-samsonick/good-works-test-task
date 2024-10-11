import { CancelButton } from '@/components/circle-buttons/cancel-button.component';
import { EditButton } from '@/components/circle-buttons/edit-button.component';
import { SaveButton } from '@/components/circle-buttons/save-button.component';
import { TrashButton } from '@/components/circle-buttons/trash-button.component';
import { CrossIcon } from '@/icons/cross.icon';
import { EditIcon } from '@/icons/edit.icon';
import { SaveIcon } from '@/icons/save.icon';
import { TrashIcon } from '@/icons/trash.icon';
import { IAction } from '@/models/IAction.model';
import { actionsSlice } from '@/store/slices/actions.slice';
import { userSlice } from '@/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { makeClientRequest } from '@/utils/request.utils';
import { useBackdropClick } from '@/utils/hooks/use-backdrop-click.hook';
import { useRef, useState } from 'react';


export const ActionListItem = ({ action }: { action: IAction }) => {
  const user = useAppSelector(userSlice.selectors.user);
  const selectedUserId = useAppSelector(actionsSlice.selectors.selectedUserId);
  const isSelfActions = user.id === selectedUserId;
  const dispatch = useAppDispatch();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editName, setEditName] = useState(action.name);

  const updateAction = async (action: IAction) => {
    await makeClientRequest({
      method: 'POST',
      path: 'action/update',
      body: action,
    });
  };

  const removeAction = async (actionId: number) => {
    await makeClientRequest({
      method: 'POST',
      path: 'action/remove',
      body: { actionId },
    });

    dispatch(actionsSlice.actions.removeAction(actionId));
  };

  const toggleChecked = async (isChecked: boolean) => {
    const updatedAction = {
      id: action.id,
      name: action.name,
      description: action.description,
      completed: isChecked,
    };

    await updateAction(updatedAction);
    dispatch(actionsSlice.actions.updateAction(updatedAction));
  };

  const updateName = async () => {
    const updatedAction = {
      id: action.id,
      name: editName,
      description: action.description,
      completed: action.completed,
    };

    await updateAction(updatedAction);
    setIsEditingMode(false);
    dispatch(actionsSlice.actions.updateAction(updatedAction));
  };

  useBackdropClick(containerRef, () => setIsEditingMode(false), isEditingMode);

  return <div ref={containerRef}
              className="flex flex-row items-center h-10 pl-4 rounded-3xl bg-red-600/10">
    {isEditingMode ?
      <div className="flex flex-row gap-1 h-full w-full py-1 pr-1">
        <input type="text"
               value={editName}
               onChange={e => setEditName(e.target.value)}
               className="h-8 pl-6 w-full bg-transparent border-none focus:h-8 focus:ring-0"
        />
        <SaveButton onClick={() => updateName()}
                    title="Save changes" />
        <CancelButton
          title="Cancel editing"
          className="w-6"
          onClick={() => {
            setEditName(action.name);
            setIsEditingMode(false);
          }}
        />
      </div> :
      <>
      {isSelfActions &&
        <input type="checkbox"
               checked={action.completed}
               onChange={(event) => {
                 toggleChecked(event.target.checked);
               }}
               className="mr-2 cursor-pointer appearance-none focus:outline-none focus:ring-0 focus:ring-offset-0" />
      }
        <div className={`flex grow py-2 ${action.completed ? 'line-through' : ''}`}>
          {action.name}
        </div>

        {isSelfActions &&
          <div className="flex flex-row gap-1 justify-center items-center px-1 h-full">
            <EditButton onClick={() => setIsEditingMode(true)} />
            <TrashButton onClick={() => removeAction(action.id)} />
          </div>
        }
        </>}
  </div>;
};
