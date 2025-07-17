import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa"; // Use react-icons or swap for your icon lib
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import logo from "./assets/ultra_rep_logo.png";

const DUMMY_PROFILE = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
};

export default function TopBar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!profileOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        background: "#101a3c",
        zIndex: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px 0 0",
        borderBottom: "1px solid #232E4D",
        transition: "left 0.2s",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 32,
          height: "100%",
        }}
      >
        <img
          src={logo}
          alt="UltraRep Logo"
          style={{
            height: 60,
            filter: "invert(50%) brightness(1000%)",
            width: "auto",
            verticalAlign: "middle",
            marginRight: 12,
            display: "block",
          }}
        />
      </div>

      {/* Notification & profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#fa6d43",
            fontSize: 18,
            cursor: "pointer",
            position: "relative",
            padding: 0,
          }}
          aria-label="Notifications"
        >
          <FaBell />
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 0,
              height: 10,
              width: 10,
              borderRadius: "50%",
              background: "#fa6d43",
              display: "none", // show on notification
            }}
          ></span>
        </button>

        {/* Profile area */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              padding: 0,
            }}
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <img
              src={DUMMY_PROFILE.avatar}
              alt="Profile"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #fa6d43",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>
                {DUMMY_PROFILE.name}
              </span>
              <span style={{ color: "#fff8", fontSize: 13 }}>
                {DUMMY_PROFILE.email}
              </span>
            </div>
            {profileOpen ? (
              <BsChevronUp color="#fa6d43" />
            ) : (
              <BsChevronDown color="#fa6d43" />
            )}
          </button>
          {profileOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 56,
                minWidth: 210,
                background: "#141d36",
                boxShadow: "0 6px 32px #0004",
                borderRadius: 12,
                zIndex: 10,
                padding: "10px 0",
              }}
            >
              <button
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 22px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  textAlign: "left",
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => alert("Settings!")}
              >
                Account Settings
              </button>
              <button
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 22px",
                  background: "none",
                  border: "none",
                  color: "#fa6d43",
                  textAlign: "left",
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => alert("Logged out.")}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
