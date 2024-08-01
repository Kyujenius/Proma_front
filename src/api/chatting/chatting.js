import { useSetRecoilState } from "recoil";
import {
  chattingRoomListState,
  currentRoomIdState,
  messageState,
} from "../../recoil/chatting/chattingRecoilState";
import { sendRequest } from "../request";
import { chattingInstance } from "../instance";
import { promptListState } from "../../recoil/prompt/promptRecoilState";

// import { getUserIdInLocalStorage } from "../../util/localStorageUtil";

export const useChattingRoomHooks = () => {
  const setChattingRoomList = useSetRecoilState(chattingRoomListState);
  const setMessages = useSetRecoilState(messageState);
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
  const setPromptList = useSetRecoilState(promptListState);

  const mockChattingRoomList = [
    {
      roomId: 1,
      emoji: "🏎",
      promptTitle: "채팅방1",
      promptCategory: "Task/Research",
    },
    {
      roomId: 2,
      emoji: "🚓",
      promptTitle: "채팅방22",
      promptCategory: "Task/Research",
    },
  ];

  // 임의의 채팅 메시지 데이터
  const mockChattingList = [
    {
      chat_id: 1,
      prompt: "",
      message_question: "Hello?",
      message_answer: "Hi there!",
      message_file: [],
      message_create_at: new Date().toISOString(),
    },
    {
      chat_id: 2,
      prompt: "",
      message_question: "How are you?",
      message_answer: "I'm fine, thank you.",
      message_file: [],
      message_create_at: new Date().toISOString(),
    },
  ];

  const mockPromptList = [
    {
      promptId: 1,
      promptMethod: "Task/Research",
      promptTitle: "프롬포트 제목1",
      promptDescription: "프롬포트 설명1",
      promptCategory: "IT",
      emoji: "🏎",
      promptPreview: "ai로 보낼 다듬어진 미리보기",
      listPromptAtom: [
        {
          blockId: "1",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "2",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "3",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
      ],
    },
    {
      promptId: 2,
      promptMethod: "Task/Research",
      promptTitle: "프롬포트 제목2",
      promptDescription: "프롬포트 설명1",
      promptCategory: "IT",
      emoji: "🏎",
      promptPreview: "ai로 보낼 다듬어진 미리보기",
      listPromptAtom: [
        {
          blockId: "1",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "2",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "3",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
      ],
    },
    {
      promptId: 3,
      promptMethod: "Task/Research",
      promptTitle: "프롬포트 제목3",
      promptDescription: "프롬포트 설명3",
      promptCategory: "IT",
      emoji: "🏎",
      promptPreview: "ai로 보낼 다듬어진 미리보기",
      listPromptAtom: [
        {
          blockId: "1",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "2",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
        {
          blockId: "3",
          blockValue: "선생님",
          blockDescription: "착하고 뭐하고 뭐한 선생님",
          blockCategory: "화자",
        },
      ],
    },
  ];

  //채팅방 리스트 가져오기
  //TODO- mock에서 실제 데이터로 수정해야함.
  const getChattingRoomList = async () => {
    // const response = await sendRequest(
    //   chattingInstance,
    //   "post",
    //   `/sidebar/room/list`,
    // );
    // if (response.data.success) {
    //   setMessages(response.data.responseDto.selectChat);
    // }
    await setChattingRoomList(mockChattingRoomList);
  };

  //TODO- mock에서 실제 데이터로 수정해야함.
  const getChattingList = async (roomId, userId) => {
    //   const response = await sendRequest(
    //     chattingInstance,
    //     "post",
    //     `/list/${roomId}`,
    //     {
    //       memberId: userId,
    //     }
    //   );
    //   if (response.data.success) {
    //     setMessages(response.data.responseDto.selectChat);
    //   }
    setMessages(mockChattingList);
  };
  //채팅방 생성
  const createChattingRoom = async (memberId, roomTitle, emoji) => {
    try {
      const response = await sendRequest(chattingInstance, "post", "/save", {
        memberId: memberId,
        roomTitle: roomTitle,
        emoji: emoji,
      });
      if (response.data.success) {
        //TODO- 내가 방금 방으로 방을 이동하는 로직 추가
        setCurrentRoomId(1);
      }
    } catch (error) {
      console.error("Failed to create chatting room:", error);
    }
  };

  //이모지 수정
  const patchChattingRoomEmoji = async (chatroomId, emoji) => {
    await sendRequest(
      chattingInstance,
      "patch",
      `/sidebar/room/emoji/${chatroomId}`,
      {
        emoji,
      }
    );
  };
  // TODO- Authorization 토큰 추가할 필요 있음
  //채팅 방 삭제
  const deleteChattingRoom = async (chatroomId, emoji) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/room/${chatroomId}`
    );
  };

  // TODO- Authorization 토큰 추가할 필요 있음
  const fetchPromptList = async () => {
    // await sendRequest(chattingInstance, "get", `/sidebar/prompt/list`);
    setPromptList(mockPromptList);
  };

  // TODO- Authorization 토큰 추가할 필요 있음
  const deletePrompt = async (promptId) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/prompt/${promptId}`
    );
  };

  // TODO- Authorization 토큰 추가할 필요 있음
  const patchPrompt = async (
    promptId,
    promptTitle,
    promptDescription,
    promptCategory
  ) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/prompt/${promptId}`,
      {
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
      }
    );
  };
  // TODO- Authorization 토큰 추가할 필요 있음
  const fetchChattingMessages = async (chatroomId) => {
    await sendRequest(chattingInstance, "get", `/${chatroomId}`);
  };

  //채팅 메시지 불러오기
  const saveChattingMessage = async (
    chatroomId,
    prompt_id,
    chatroom_id,
    message_question,
    message_file,
    message_create_at,
    message_answer
  ) => {
    await sendRequest(chattingInstance, "post", `/${chatroomId}`, {
      prompt_id,
      chatroom_id,
      message_question,
      message_file,
      message_create_at,
      message_answer,
    });
  };
  return {
    getChattingRoomList,
    getChattingList,
    createChattingRoom,
    patchChattingRoomEmoji,
    deleteChattingRoom,
    fetchPromptList,
    deletePrompt,
    patchPrompt,
    fetchChattingMessages,
    saveChattingMessage,
  };
};
