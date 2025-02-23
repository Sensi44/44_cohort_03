import {
  ErrorNotification,
  MessagesPanel,
  RoomsPanel,
  TMessage,
} from '@Components';
import { Box } from '@mui/material';
import { useState } from 'react';

import {
  useCreateCommentMutation,
  useCreateTopicMutation,
  useGetCommentsMutation,
  useGetTopicsQuery,
} from '@Store';

export const ForumPage = () => {
  const { data: rooms, refetch } = useGetTopicsQuery();
  const [selectedRoomId, setSelectedRoomId] = useState<null | number>(null);
  const [currentRoomMessages, setCurrentRoomMessages] = useState<TMessage[]>(
    [],
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [createComment] = useCreateCommentMutation();
  const [createTopic] = useCreateTopicMutation();
  const [getComments] = useGetCommentsMutation();

  const loadComments = (roomId: number) => {
    setCurrentRoomMessages([]);
    if (selectedRoomId) {
      getComments({ topic_id: roomId })
        .unwrap()
        .then((comments) => setCurrentRoomMessages(comments))
        .catch((error) => {
          setErrorMessage(`Не удалось добавить комнату ${error}`);
        });
    } else {
      setCurrentRoomMessages([]);
    }
  };

  const handleAddComment = async (message: string) => {
    if (selectedRoomId) {
      createComment({ text: message, topic_id: selectedRoomId })
        .unwrap()
        .then(() => loadComments(selectedRoomId))
        .catch((error) => {
          setErrorMessage(`Не удалось добавить сообщение ${error}`);
        });
    }
  };

  const handeAddTopic = async (message: string) => {
    createTopic({ title: message })
      .unwrap()
      .then(() => refetch().unwrap())
      .catch((error) => {
        setErrorMessage(`Не удалось добавить комнату ${error}`);
      });
  };

  const handleSelectRoom = async (roomId: number) => {
    setSelectedRoomId(roomId);
    loadComments(roomId);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <RoomsPanel
        rooms={rooms ?? []}
        setSelectedRoomId={handleSelectRoom}
        whenAddTopic={handeAddTopic}
      />
      <MessagesPanel
        selectedRoomTitle={
          rooms?.find((room) => room.id === selectedRoomId)?.title ?? ''
        }
        currentRoomMessages={currentRoomMessages}
        whenCreateComment={handleAddComment}
      />
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Box>
  );
};
