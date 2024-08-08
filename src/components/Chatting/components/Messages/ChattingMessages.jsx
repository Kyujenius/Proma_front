import React, { useEffect, useRef } from "react";
import {
  messageState,
  isLoadingState,
} from "../../../../recoil/chatting/chattingRecoilState";
import { useRecoilValue } from "recoil";
import promaChattingProfile from "../../../../assets/images/promaChattingProfile.svg";
import SkeletonMessage from "./SkeletonMessage";
import filePreview from "../../../../assets/images/filePreview.svg";
import MarkdownRenderer from "./MarkdownRenderer";
import styles from "./ChattingMessages.module.css";

function ChattingMessages() {
  const messages = useRecoilValue(messageState);
  const isLoading = useRecoilValue(isLoadingState);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    //TODO- fetchChattingMessage 엄태우가 하면 됨.
    // fetchChattingMessages();
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message, index) => (
        <div key={message.chatroomId} className="b5">
          <div className={styles.sendMessage}>
            {message.messageFile?.map((file, index) => (
              <div key={index} className={styles.imageContainer}>
                <a href={file.url} download={file.name}>
                  <img
                    src={file.isImage ? file.url : filePreview}
                    alt="preview"
                    className={styles.image}
                  />
                </a>
                {file.isImage === false ? (
                  <p className={[styles.fileName, "b6"].join(" ")}>
                    {file.name}
                  </p>
                ) : null}
              </div>
            ))}
            {message.messageQuestion && (
              <div className={styles.message}>{message.messageQuestion}</div>
            )}
          </div>
          {message.messageAnswer && (
            <div className={styles.receiveMessage}>
              <div className={styles.promaChattingProfile}>
                <img src={promaChattingProfile} alt="proma profile" />
              </div>
              <div className={styles.receiveMessageText}>
                <MarkdownRenderer text={message.messageAnswer} />
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className={styles.receiveMessage}>
          <div className={styles.promaChattingProfile}>
            <img src={promaChattingProfile} alt="proma profile" />
          </div>
          <div className={styles.receiveMessageText}>
            <SkeletonMessage />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChattingMessages;