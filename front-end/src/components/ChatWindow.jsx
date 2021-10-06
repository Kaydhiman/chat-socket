import React from "react";

function ChatWindow() {
  return (
    <div className="container">
      <div className="chat">
        <div className="chat-header">
          <h3 className="chat-header__title">John doe</h3>
        </div>
        <div className="chat-body">
          <ul className="list-unstyled chat-messages">
            <li className="chat-messages__item is-reciver">
              <img
                src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                className="chat-messages__item-img"
                alt="person"
              />
              <div className="chat-messages__item-body">I am the John.</div>
              <span className="chat-messages__item-time">13.10</span>
            </li>

            <li className="chat-messages__item is-sender">
              <img
                src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                className="chat-messages__item-img"
                alt="person"
              />
              <div className="chat-messages__item-body">I am the Hash</div>
              <span className="chat-messages__item-time">13.10</span>
            </li>

            <li className="chat-messages__item is-reciver">
              <img
                src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                className="chat-messages__item-img"
                alt="person"
              />
              <div className="chat-messages__item-body">
                have heard this before
              </div>
              <div className="chat-messages__item-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
                sapien, pulvinar urna, ullamcorper facilisis sed ultrices
                fermentum risus. A orci elementum leo nibh elementum.
              </div>
              <div className="chat-messages__item-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <span className="chat-messages__item-time">13.10</span>
            </li>

            <li className="chat-messages__item is-sender">
              <img
                src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                className="chat-messages__item-img"
                alt="person"
              />
              <div className="chat-messages__item-body">ok great.</div>
              <div className="chat-messages__item-body">Lorem ipsum dolor</div>
              <div className="chat-messages__item-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec
                nulla sed integer nec facilisi convallis ultrices. Tellus
                commodo gravida massa dolor, duis sem.
              </div>
              <span className="chat-messages__item-time">13.10</span>
            </li>
          </ul>
        </div>
        <div className="chat-footer">
          <button type="button" className="btn chat-footer__action-add">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C9.30966 0 8.75001 0.559646 8.75001 1.25001V8.75006H1.25001C0.559646 8.75006 0 9.3097 0 10.0001C0 10.6904 0.559646 11.2501 1.25001 11.2501H8.75001V18.7501C8.75001 19.4404 9.30966 20.0001 10 20.0001C10.6904 20.0001 11.25 19.4404 11.25 18.7501V11.2501H18.7501C19.4404 11.2501 20.0001 10.6904 20.0001 10.0001C20.0001 9.3097 19.4404 8.75006 18.7501 8.75006H11.25V1.25001C11.25 0.559646 10.6904 0 10 0Z"
                fill="#000000"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            className="form-control custom-form-control chat-footer__input"
            placeholder="Type your message here..."
            name=""
          />
          <button type="button" className="btn chat-footer__action-sent">
            <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
              <path
                d="M10.8547 19.9612L10.9436 20.0838L11.0214 19.9539L22.755 0.360486L22.8749 0.160399L22.6473 0.211543L0.36508 5.21982L0.217319 5.25303L0.305897 5.37587L4.40004 11.0537L4.45132 11.1248L4.52853 11.0833L17.1944 4.26873L6.75649 14.1638L6.69286 14.2241L6.74434 14.2951L10.8547 19.9612Z"
                fill="#0D95FF"
                stroke="#55ABFC"
                strokeWidth="0.2"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
