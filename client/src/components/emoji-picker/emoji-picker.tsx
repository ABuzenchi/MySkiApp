import { useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import styles from './emoji-picker.module.css';

interface EmojiWidgetProps {
  onEmojiSelect: (emoji: string) => void;
  show: boolean;
  toggle: () => void;
}

const EmojiWidget = ({ onEmojiSelect, show, toggle }: EmojiWidgetProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, toggle]);

  return (
    <div className={styles.emojiWrapper}>
      <BsEmojiSmile className={styles.icon} onClick={toggle} />
      {show && (
        <div className={styles.picker} ref={pickerRef}>
          <EmojiPicker
            onEmojiClick={(e) => onEmojiSelect(e.emoji)}
            height={320}
            width={280}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiWidget;
