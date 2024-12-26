import React, { useEffect, useRef, useState } from 'react';
import './NoteInput.css';

const NoteInput: React.FC = () => {
  const [note, setNote] = useState<string>(() => {
    return localStorage.getItem('note') || '';
  });

  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [showSaveMessage, setShowSaveMessage] = useState<boolean>(false);

  // Refs to manage timers
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideMessageTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new typing timeout
    typingTimeoutRef.current = setTimeout(() => {
      // User stopped typing
      localStorage.setItem('note', note);

      // Show the "Note saved" message
      setShowSaveMessage(true);
      setFadeOut(false); // Reset fade-out effect

      // Set up fade out timer
      fadeOutTimerRef.current = setTimeout(() => {
        setFadeOut(true);
      }, 1000);

      // Set up hide message timer
      hideMessageTimerRef.current = setTimeout(() => {
        setShowSaveMessage(false);
      }, 1500);
    }, 1000); // Adjust the delay as needed

    // Cleanup function
    return () => {
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      // Clear fade out timer
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
        fadeOutTimerRef.current = null;
      }
      // Clear hide message timer
      if (hideMessageTimerRef.current) {
        clearTimeout(hideMessageTimerRef.current);
        hideMessageTimerRef.current = null;
      }
    };
  }, [note]);

  const handleClear = () => {
    setNote('');
  };

  return (
    <div className="note-input">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
        aria-label="Note editor"
      />
      {/* Place the clear button below the textarea */}
      <div className="button-container">
        <button
          className="btn clear-btn"
          onClick={handleClear}
          aria-label="Clear Note"
          title="Clear Note"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      {/* Display the save message */}
      {showSaveMessage && (
        <div className={`save-message ${fadeOut ? 'fade-out' : ''}`}>
          Note saved
        </div>
      )}
      <div className="word-count">
        Word Count: {note ? note.trim().split(/\s+/).filter(Boolean).length : 0} |
        Character Count: {note.length}
      </div>
    </div>
  );
};

export default NoteInput;
