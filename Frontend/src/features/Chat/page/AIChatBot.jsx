import React, { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  ArrowUp,
  Bot,
  Cpu,
  File,
  FileText,
  Image as ImageIcon,
  Loader2,
  Moon,
  Paperclip,
  SearchCode,
  Settings as SettingsIcon,
  ShieldCheck,
  Sparkles,
  User,
  Video,
  X,
} from "lucide-react";
import "../style/AIChatBot.scss";
import Header from "../components/Header";
import Slider from "../components/Slider";
import GlobalBg from "../../../layout/ui/GlobalBg";
import { useAuth } from "../../../hooks/useAuth";

function AIChatBot() {
  const { profile ,user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedModel, setSelectedModel] = useState("lexar-v2");

  const [chats] = useState([
    {
      _id: "1",
      title: "React Component Logic",
    },
    {
      _id: "2",
      title: "UI Glassmorphism Fixes",
    },
  ]);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const mediaMenuRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mediaMenuRef.current &&
        !mediaMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -----------------------------
  // Chat Functions
  // -----------------------------

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setSelectedFile(null);
    setActiveMode(null);
    setInputValue("");
  };

  // -----------------------------
  // Media Menu
  // -----------------------------

  const handleMenuClick = (type) => {
    setIsMenuOpen(false);

    if (type === "file") {
      fileInputRef.current?.click();
      return;
    }

    setActiveMode(type);
  };

  // -----------------------------
  // File Functions
  // -----------------------------

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };


  // -----------------------------
  // Send Message
  // -----------------------------

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedFile) {
      return;
    }

    const userMessage = {
      role: "user",
      content: inputValue,
      mode: activeMode,
      attachments: selectedFile
        ? [
            {
              name: selectedFile.name,
              type: selectedFile.type,
              url: URL.createObjectURL(selectedFile),
            },
          ]
        : [],
    };

    const currentMode = activeMode;
    const currentText = inputValue;

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputValue("");
    setSelectedFile(null);
    setActiveMode(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage = {
        role: "assistant",

        content:
          currentMode === "image"
            ? `Here is your generated image output for "${currentText}":`
            : "Frontend UI ready! Your API payload is ready to be sent.",

        imageUrl:
          currentMode === "image"
            ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop"
            : null,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      setIsLoading(false);
    }, 1200);
  };

  // -----------------------------
  // Input Placeholder
  // -----------------------------

  const getPlaceholder = () => {
    if (activeMode === "image") {
      return "Describe the image you want to create...";
    }

    if (activeMode === "video") {
      return "Describe the scene for video generation...";
    }

    if (activeMode === "research") {
      return "Type topic for deep research...";
    }

    if (activeMode === "tools") {
      return "Ask coding or tool questions...";
    }

    return "Ask LexarAi anything...";
  };

  const isActionActive =
    isFocused || inputValue.trim().length > 0 || selectedFile || activeMode;

  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <>
      {/* Hidden File Input */}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Main Container */}

      <section className="main-container">
        <GlobalBg />

        {/* Sidebar */}

        <div
          className={`left-slider ${
            isSidebarOpen ? "mobile-show" : "mobile-hide"
          }`}
        >
          <Slider
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>

        {/* Right Content */}

        <div className="right-content">
          {/* Header */}

          <div className="top-header">
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>

          {/* Chat Section */}

          <div className="chat-section ">
            <div className="chat-messages-viewport">
              {messages.length === 0 ? (
                <div className="system-welcome-note">
                  Hello,
                  <span className="brand-name">
                    {profile?.firstName || user?.username || "User"}

                    <p>What would you like to build today?</p>
                  </span>
                </div>
              ) : (
                <div className="conversation-thread">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat-bubble-wrapper ${message.role}`}
                    >
                      <div className="bubble-content page">
                        {/* Attachments */}

                        {message.attachments?.length > 0 && (
                          <div className="attached-files-list">
                            {message.attachments.map((file, fileIndex) => (
                              <div
                                key={fileIndex}
                                className="attached-file-badge"
                              >
                                {file.type?.startsWith("image/") ? (
                                  <img
                                    src={file.url}
                                    alt="upload"
                                    className="msg-attached-img"
                                  />
                                ) : (
                                  <span>{file.name}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Message */}

                        <p>{message.content}</p>

                        {/* Generated Image */}

                        {message.imageUrl && (
                          <div className="generated-image-box">
                            <img src={message.imageUrl} alt="AI Output" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading */}

                  {isLoading && (
                    <div className="chat-bubble-wrapper assistant loading">
                      <div className="bubble-content loading-indicator">
                        <Loader2 size={16} className="spin-icon" />

                        <span>LexarAi is processing...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Input Area */}

          <div className="bottom-interactive-area">
            <div
              className={`input-field-wrapper page  ${
                isFocused ? "focused" : ""
              }`}
            >
              <div className="media-upload-zone" ref={mediaMenuRef}>
                <button
                  className={`media-upload-btn  ${
                    isMenuOpen ? "active-btn" : ""
                  }`}
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Paperclip size={18} />
                </button>

                {isMenuOpen && (
                  <div className="media-floating-menu page">
                    <button onClick={() => handleMenuClick("file")}>
                      <FileText size={16} />
                      <span>File Upload</span>
                    </button>

                    <button onClick={() => handleMenuClick("image")}>
                      <ImageIcon size={16} />
                      <span>Create Image</span>
                    </button>

                    <button onClick={() => handleMenuClick("video")}>
                      <Video size={16} />
                      <span>Create Video</span>
                    </button>

                    <button onClick={() => handleMenuClick("research")}>
                      <SearchCode size={16} />
                      <span>Deep Research</span>
                    </button>

                    <button onClick={() => handleMenuClick("tools")}>
                      <Cpu size={16} />
                      <span>Tools</span>
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder={getPlaceholder()}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />

              <button
                className={`action-arrow-btn ${
                  isActionActive ? "active" : "idle"
                }`}
                type="button"
                onClick={handleSendMessage}
              >
                {isActionActive ? (
                  <ArrowUp size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Modal */}

      {isSettingsOpen && (
        <div
          className="settings-modal-overlay page"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="settings-modal-card page"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="modal-header ">
              <div className="modal-title">
                <SettingsIcon size={18} />
                <h3>Settings</h3>
              </div>

              <button
                className="close-btn"
                onClick={() => setIsSettingsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="modal-body  ">
              {/* Theme */}

              <div className="setting-item">
                <label>
                  <Moon size={14} />
                  Theme Preference
                </label>

                <select
                  value={selectedTheme}
                  onChange={(event) => setSelectedTheme(event.target.value)}
                  className="page"
                >
                  <option value="dark">Dark Glassmorphism</option>

                  <option value="light">Light Glassmorphism</option>
                </select>
              </div>

              {/* AI Model */}

              <div className="setting-item">
                <label>
                  <Bot size={14} />
                  AI Model Engine
                </label>

                <select
                  value={selectedModel}
                  onChange={(event) => setSelectedModel(event.target.value)}
                >
                  <option value="lexar-v2">LexarAi Pro 2.0</option>

                  <option value="gpt-4o">GPT-4o Turbo</option>

                  <option value="claude-3-5">Claude 3.5 Sonnet</option>
                </select>
              </div>

              {/* Profile */}

              <div className="setting-item">
                <label>
                  <User size={14} />
                  Profile Name
                </label>

                <input
                  type="text"
                  readOnly
                  value={`${profile?.firstName || "Lexar"} ${
                    profile?.lastName || "User"
                  }`}
                  className="read-only-input"
                />
              </div>

              {/* Footer */}

              <div className="settings-footer-info">
                <ShieldCheck size={14} />

                <span>LexarAi System Connected v2.4.0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatBot;
