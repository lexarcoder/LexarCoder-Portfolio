import React from "react";
import {
  SquarePen,
  Search,
  Wand2,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import "../style/Slider.scss";
import { useAuth } from "../../../hooks/useAuth";

const Slider = ({
  isOpen,
  toggleSidebar,
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onOpenSettings,
}) => {
  const { profile, user } = useAuth();

  return (
    <div
      className={`slider-wrapper ${
        isOpen ? "sidebar-open" : "sidebar-collapsed"
      } page`}
    >
      <aside className="sidebar-nav">
        {/* --- TOGGLE ZONE --- */}
        <div className="toggle-zone">
          <button
            className="nav-btn collapse-toggle-btn"
            onClick={toggleSidebar}
            title={isOpen ? "Collapse Menu" : "Expand Menu"}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* --- TOP ACTIONS GROUP --- */}
        <div className="top-actions-group">
          <button
            className="nav-btn action-pill new-chat-btn"
            title="New Chat"
            onClick={onNewChat}
          >
            <SquarePen size={20} className="icon-shrink primary-glow-icon" />
            {isOpen && <span className="nav-text">New Chat</span>}
          </button>

          <button className="nav-btn action-pill" title="Search Chats">
            <Search size={20} className="icon-shrink" />
            {isOpen && <span className="nav-text">Search</span>}
          </button>

          <button className="nav-btn action-pill" title="AI Tools">
            <Wand2 size={20} className="icon-shrink" />
            {isOpen && <span className="nav-text">Tools / Images</span>}
          </button>
        </div>

        {/* --- CHATS HISTORY SECTION --- */}
        {isOpen && chats && chats.length > 0 && (
          <div className="chats-history-section">
            <span className="history-label">Recent Chats</span>
            <div className="history-list">
              {chats.map((chat) => (
                <button
                  key={chat._id}
                  className={`history-item ${
                    activeChatId === chat._id ? "active" : ""
                  }`}
                  onClick={() => onSelectChat && onSelectChat(chat._id)}
                >
                  <MessageSquare size={16} />
                  <span className="chat-title">
                    {chat.title || "Untitled Conversation"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- BOTTOM ACTIONS GROUP --- */}
        <div className="bottom-actions-group">
          {/* Settings Button -> Triggers Popup */}
          <button
            className="nav-btn action-pill settings-btn"
            title="Settings"
            onClick={onOpenSettings}
          >
            <Settings size={20} className="icon-shrink" />
            {isOpen && <span className="nav-text">Settings</span>}
          </button>

          <div className="user-profile-zone" title="My Account">
            <div className="avatar-frame">
              <img
                src={profile?.profileImg || user?.profileImg ||  "/default-avatar.png"}
                alt="User Profile"
              />
            </div>
            {isOpen && (
              <div className="user-meta">
                <span className="user-name">
                  {profile?.firstName}&nbsp;
                  {profile?.lastName || user?.username || "User"}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Slider;
